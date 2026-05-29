/**
 * NCBI BLAST Integration
 * Submits BLASTP searches, polls for completion, parses results
 */

import axios from "axios";
import { withRetry } from "./retry";

const BLAST_BASE = "https://blast.ncbi.nlm.nih.gov/blast/Blast.cgi";

export interface BlastHit {
  id: string;
  accession: string;
  title: string;
  organism: string;
  score: number;
  eValue: number;
  identity: number;
  coverage: number;
  alignmentLength: number;
  mismatches: number;
  gaps: number;
  queryStart: number;
  queryEnd: number;
  subjectStart: number;
  subjectEnd: number;
}

export interface BlastResult {
  rid: string;
  status: "waiting" | "ready" | "failed";
  hits: BlastHit[];
  database: string;
  program: string;
  queryLength: number;
}

/**
 * Submit a BLAST job to NCBI
 */
export async function submitBlastJob(
  sequence: string,
  options: {
    program?: string;
    database?: string;
    eValueThreshold?: number;
    maxHits?: number;
  } = {}
): Promise<{ rid: string; estimatedTime: number }> {
  const program = options.program ?? "blastp";
  const database = options.database ?? "pdb";
  const eValueThreshold = options.eValueThreshold ?? 0.01;
  const maxHits = options.maxHits ?? 20;

  const params = new URLSearchParams({
    CMD: "Put",
    PROGRAM: program,
    DATABASE: database,
    QUERY: sequence,
    EXPECT: String(eValueThreshold),
    HITLIST_SIZE: String(maxHits),
    FORMAT_TYPE: "JSON2_S",
  });

  const response = await withRetry(() =>
    axios.post(BLAST_BASE, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 30_000,
    })
  );

  const text = response.data as string;
  const ridMatch = text.match(/RID\s*=\s*(\S+)/);
  const rtoeMatch = text.match(/RTOE\s*=\s*(\d+)/);

  if (!ridMatch) {
    throw new Error("BLAST submission failed: no RID returned");
  }

  return {
    rid: ridMatch[1],
    estimatedTime: rtoeMatch ? parseInt(rtoeMatch[1], 10) : 30,
  };
}

/**
 * Check BLAST job status
 */
export async function checkBlastStatus(rid: string): Promise<"waiting" | "ready" | "failed"> {
  const response = await axios.get(BLAST_BASE, {
    params: { CMD: "Get", RID: rid, FORMAT_OBJECT: "SearchInfo" },
    timeout: 15_000,
  });

  const text = response.data as string;
  if (text.includes("Status=WAITING")) return "waiting";
  if (text.includes("Status=READY")) return "ready";
  if (text.includes("Status=FAILED") || text.includes("Status=UNKNOWN")) return "failed";
  return "waiting";
}

/**
 * Fetch BLAST results once job is ready
 */
export async function fetchBlastResults(rid: string): Promise<BlastHit[]> {
  const response = await axios.get(BLAST_BASE, {
    params: {
      CMD: "Get",
      RID: rid,
      FORMAT_TYPE: "JSON2_S",
      FORMAT_OBJECT: "Alignment",
    },
    timeout: 30_000,
  });

  try {
    const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
    const searchResults = data?.BlastOutput2?.[0]?.report?.results?.search;
    if (!searchResults?.hits) return [];

    return searchResults.hits.slice(0, 20).map((hit: any, index: number) => {
      const hsps = hit.hsps?.[0] ?? {};
      const desc = hit.description?.[0] ?? {};
      return {
        id: `blast-hit-${index}`,
        accession: desc.accession ?? "",
        title: desc.title ?? "Unknown",
        organism: desc.sciname ?? "",
        score: hsps.bit_score ?? 0,
        eValue: hsps.evalue ?? 1,
        identity: hsps.identity ? Math.round((hsps.identity / (hsps.align_len ?? 1)) * 100) : 0,
        coverage: hsps.query_to && hsps.query_from
          ? Math.round(((hsps.query_to - hsps.query_from + 1) / (searchResults.query_len ?? 1)) * 100)
          : 0,
        alignmentLength: hsps.align_len ?? 0,
        mismatches: hsps.gaps ?? 0,
        gaps: hsps.gaps ?? 0,
        queryStart: hsps.query_from ?? 0,
        queryEnd: hsps.query_to ?? 0,
        subjectStart: hsps.hit_from ?? 0,
        subjectEnd: hsps.hit_to ?? 0,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Full BLAST workflow: submit → poll → fetch
 * Returns partial results via callback during polling
 */
export async function runBlastSearch(
  sequence: string,
  onStatus?: (status: string, progress: number) => void,
  options: { program?: string; database?: string } = {}
): Promise<BlastResult> {
  onStatus?.("Submitting BLAST job...", 10);
  const { rid, estimatedTime } = await submitBlastJob(sequence, options);
  onStatus?.(`Job submitted (RID: ${rid}), estimated ${estimatedTime}s`, 20);

  // Poll with exponential backoff
  let attempts = 0;
  const maxAttempts = 60;
  let delay = Math.min(estimatedTime * 500, 10_000);

  while (attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    attempts++;

    const status = await checkBlastStatus(rid);
    const progress = Math.min(20 + (attempts / maxAttempts) * 60, 80);
    onStatus?.(`Polling... (attempt ${attempts})`, progress);

    if (status === "ready") {
      onStatus?.("Fetching results...", 85);
      const hits = await fetchBlastResults(rid);
      onStatus?.("Complete", 100);
      return {
        rid,
        status: "ready",
        hits,
        database: options.database ?? "pdb",
        program: options.program ?? "blastp",
        queryLength: sequence.length,
      };
    }

    if (status === "failed") {
      return { rid, status: "failed", hits: [], database: options.database ?? "pdb", program: options.program ?? "blastp", queryLength: sequence.length };
    }

    delay = Math.min(delay * 1.3, 15_000);
  }

  return { rid, status: "waiting", hits: [], database: options.database ?? "pdb", program: options.program ?? "blastp", queryLength: sequence.length };
}
