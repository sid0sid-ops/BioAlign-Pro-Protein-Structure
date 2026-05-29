import { Router } from "express";
import { z } from "zod";
import { homologyRunSchema, proteinSequenceRequestSchema } from "../../src/api/contracts";
import { fetchAlphaFoldPrediction, fetchAlphaFoldPAE } from "../../src/services/integrations/alphafold";
import { fetchEsmAtlasPrediction } from "../../src/services/integrations/esm-atlas";
import { fetchPdbeSummary } from "../../src/services/integrations/pdbe";
import { fetchRcsbEntry, searchRcsbBySequence } from "../../src/services/integrations/rcsb";
import { fetchUniProtEntry, searchUniProt } from "../../src/services/integrations/uniprot";
import { fetchInterProByAccession } from "../../src/services/integrations/interpro";
import { fetchStringInteractions } from "../../src/services/integrations/string-db";
import { fetchKeggPathways } from "../../src/services/integrations/kegg";
import { searchEnsemblGene } from "../../src/services/integrations/ensembl";
import { fetchClinVarVariants } from "../../src/services/integrations/clinvar";
import { searchPubChemByProtein } from "../../src/services/integrations/pubchem";
import { getRequestManagerDiagnostics } from "../../src/services/api/request-manager";
import { getTieredCacheStats } from "../../src/services/cache/tiered-cache";
import { compileProteinIntelligence } from "../../src/services/orchestrators/protein-intelligence-orchestrator";
import { analyzeProteinSequence, runHomologyWorkflow } from "../services/prediction-engine";

export const proteinRouter = Router();

// ─── Sequence Analysis ─────────────────────────────────────────────
proteinRouter.post("/analyze-sequence", (request, response) => {
  const parsed = proteinSequenceRequestSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ error: "Invalid request", issues: parsed.error.flatten() });
  }
  const result = analyzeProteinSequence(parsed.data.name, parsed.data.sequence);
  if (!result.ok) {
    return response.status(422).json(result);
  }
  return response.json(result);
});

// ─── Homology Workflow ─────────────────────────────────────────────
proteinRouter.post("/homology/run", (request, response) => {
  const parsed = homologyRunSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ error: "Invalid homology request", issues: parsed.error.flatten() });
  }
  return response.status(202).json(runHomologyWorkflow(parsed.data.name, parsed.data.sequence));
});

// ─── Template Search ───────────────────────────────────────────────
proteinRouter.get("/templates", (request, response) => {
  const querySchema = z.object({ query: z.string().min(1) });
  const parsed = querySchema.safeParse(request.query);
  if (!parsed.success) {
    return response.status(400).json({ error: "Missing query" });
  }
  return response.json({
    query: parsed.data.query,
    providers: ["RCSB PDB", "AlphaFold DB", "PDBe", "Foldseek"],
    message: "Template search contract is ready for provider-backed orchestration."
  });
});

// ─── Direct Provider Proxies ───────────────────────────────────────
proteinRouter.get("/integrations/:provider/:id", async (request, response, next) => {
  try {
    const { provider, id } = request.params;

    if (provider === "uniprot") return response.json(await fetchUniProtEntry(id));
    if (provider === "rcsb") return response.json(await fetchRcsbEntry(id));
    if (provider === "alphafold") return response.json(await fetchAlphaFoldPrediction(id));
    if (provider === "alphafold-pae") return response.json(await fetchAlphaFoldPAE(id));
    if (provider === "pdbe") return response.json(await fetchPdbeSummary(id));
    if (provider === "esm-atlas") return response.json(await fetchEsmAtlasPrediction(id));
    if (provider === "interpro") return response.json(await fetchInterProByAccession(id));
    if (provider === "string") return response.json(await fetchStringInteractions(id));
    if (provider === "kegg") return response.json(await fetchKeggPathways(id));
    if (provider === "ensembl") return response.json(await searchEnsemblGene(id));
    if (provider === "clinvar") return response.json(await fetchClinVarVariants(id));
    if (provider === "pubchem") return response.json(await searchPubChemByProtein(id));

    return response.status(404).json({ error: `Unsupported provider: ${provider}` });
  } catch (error) {
    next(error);
  }
});

// ─── Orchestrated Multi-DB Analysis ────────────────────────────────
// Normalized Protein Intelligence
proteinRouter.get("/intelligence/:accession", async (request, response, next) => {
  try {
    const querySchema = z.object({
      geneName: z.string().min(1).max(80).optional(),
      pdbId: z.string().min(4).max(4).optional(),
      refresh: z.enum(["true", "false"]).optional()
    });
    const parsed = querySchema.safeParse(request.query);
    if (!parsed.success) {
      return response.status(400).json({ error: "Invalid intelligence query", issues: parsed.error.flatten() });
    }

    return response.json(
      await compileProteinIntelligence({
        accession: request.params.accession,
        geneName: parsed.data.geneName,
        pdbId: parsed.data.pdbId,
        forceRefresh: parsed.data.refresh === "true"
      })
    );
  } catch (error) {
    next(error);
  }
});

proteinRouter.get("/analysis/orchestrate/:accession", async (request, response, next) => {
  try {
    const querySchema = z.object({
      geneName: z.string().min(1).max(80).optional(),
      pdbId: z.string().min(4).max(4).optional(),
      refresh: z.enum(["true", "false"]).optional()
    });
    const parsed = querySchema.safeParse(request.query);
    if (!parsed.success) {
      return response.status(400).json({ error: "Invalid orchestration query", issues: parsed.error.flatten() });
    }

    return response.json(
      await compileProteinIntelligence({
        accession: request.params.accession,
        geneName: parsed.data.geneName,
        pdbId: parsed.data.pdbId,
        forceRefresh: parsed.data.refresh === "true"
      })
    );
  } catch (error) {
    next(error);
  }
});

// ─── RCSB Sequence Search ──────────────────────────────────────────
// Production diagnostics
proteinRouter.get("/diagnostics/cache", (_request, response) => {
  response.json(getTieredCacheStats());
});

proteinRouter.get("/diagnostics/requests", (_request, response) => {
  response.json(getRequestManagerDiagnostics());
});

proteinRouter.post("/search/rcsb-sequence", async (request, response, next) => {
  try {
    const schema = z.object({ sequence: z.string().min(10) });
    const parsed = schema.safeParse(request.body);
    if (!parsed.success) return response.status(400).json({ error: "Invalid sequence" });
    const result = await searchRcsbBySequence(parsed.data.sequence);
    return response.json(result);
  } catch (error) {
    next(error);
  }
});

// ─── UniProt Search ────────────────────────────────────────────────
proteinRouter.get("/search/uniprot", async (request, response, next) => {
  try {
    const schema = z.object({ q: z.string().min(1) });
    const parsed = schema.safeParse(request.query);
    if (!parsed.success) return response.status(400).json({ error: "Missing query" });
    const result = await searchUniProt(parsed.data.q);
    return response.json(result);
  } catch (error) {
    next(error);
  }
});
