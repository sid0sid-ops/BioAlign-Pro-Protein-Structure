"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Download, ExternalLink, ShieldCheck } from "lucide-react";
import type { ProteinPack } from "@/lib/static-data/protein-pack-types";
import type { DomainAnnotation, MsaSummary, StructureIntelligencePack } from "@/lib/structure-intelligence/types";
import { Badge } from "@/components/ui/badge";
import { StructureViewerGate } from "@/modules/visualization/structure-viewer-gate";
import { useIncrementalList } from "@/hooks/use-incremental-list";
import { computeMC, computeOF, computeQC, computeRC, computeSC } from "@/lib/structure-intelligence/score-utils";
import { EvolutionPanel } from "./evolution-panel";
import { SourcesProvenance } from "./sources-provenance";

export interface FoldExplorerDashboardProps {
  pack: ProteinPack;
  intelligence: StructureIntelligencePack;
}

function SummaryCard({ label, value, source }: { label: string; value: string; source: string }) {
  return (
    <div className="min-h-[72px] rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-950">{value}</p>
      <p className="mt-1 truncate text-[10px] text-slate-500">{source}</p>
    </div>
  );
}

function MetricRow({ label, value, source }: { label: string; value: string; source: string }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-2.5 text-xs last:border-b-0 sm:grid-cols-[minmax(0,1fr)_max-content] sm:gap-4">
      <div className="min-w-0">
        <p className="font-medium text-slate-700">{label}</p>
        <p className="mt-0.5 break-words text-[11px] leading-4 text-slate-500">{source}</p>
      </div>
      <span className="break-words font-semibold text-slate-950 sm:whitespace-nowrap sm:text-right">{value}</span>
    </div>
  );
}

function PlddtProfileGraph({ values }: { values: number[] }) {
  const sampled = values.length > 180
    ? values.filter((_, index) => index % Math.ceil(values.length / 180) === 0)
    : values;
  const width = 620;
  const height = 150;
  const points = sampled.map((value, index) => {
    const x = sampled.length <= 1 ? 0 : (index / (sampled.length - 1)) * width;
    const y = height - (Math.max(0, Math.min(100, value)) / 100) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">pLDDT residue profile</p>
        <p className="text-[10px] text-slate-500">0-100 confidence by residue position</p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full overflow-visible" role="img" aria-label="Per-residue pLDDT confidence profile">
        {[50, 70, 90].map((tick) => {
          const y = height - (tick / 100) * height;
          return (
            <g key={tick}>
              <line x1="0" x2={width} y1={y} y2={y} stroke="#cbd5e1" strokeDasharray="4 5" />
              <text x="4" y={y - 4} className="fill-slate-500 text-[10px]">{tick}</text>
            </g>
          );
        })}
        <polyline fill="none" stroke="#0f766e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" points={points} />
      </svg>
    </div>
  );
}

function PlddtBinBars({ bins }: { bins: { veryHigh_90_100: number; confident_70_90: number; low_50_70: number; veryLow_0_50: number } }) {
  const rows = [
    { label: "Very high 90-100", value: bins.veryHigh_90_100, color: "bg-teal-600" },
    { label: "Confident 70-90", value: bins.confident_70_90, color: "bg-sky-500" },
    { label: "Low 50-70", value: bins.low_50_70, color: "bg-amber-500" },
    { label: "Very low 0-50", value: bins.veryLow_0_50, color: "bg-rose-500" }
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-600">pLDDT confidence bins</p>
      <div className="grid gap-2">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[130px_minmax(0,1fr)_44px] items-center gap-2 text-[11px]">
            <span className="text-slate-600">{row.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-slate-100">
              <span className={`block h-full rounded-full ${row.color}`} style={{ width: `${Math.max(1, row.value * 100)}%` }} />
            </span>
            <span className="text-right font-mono text-slate-700">{(row.value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function sampleMatrix(matrix: number[][], maxSize = 38) {
  if (!matrix.length) return [];
  const step = Math.max(1, Math.ceil(matrix.length / maxSize));
  return matrix.filter((_, rowIndex) => rowIndex % step === 0).map((row) => row.filter((_, colIndex) => colIndex % step === 0));
}

function paeColor(value: number) {
  if (value <= 5) return "#1d4ed8";
  if (value <= 10) return "#22c55e";
  if (value <= 20) return "#facc15";
  return "#f97316";
}

function PaeHeatmap({ matrix, meanPae, matrixSize }: { matrix: number[][]; meanPae: number; matrixSize: number }) {
  const sampled = sampleMatrix(matrix);
  if (!sampled.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">PAE heatmap</p>
          <p className="mt-1 text-[10px] text-slate-500">Lower error is better; matrix sampled from {matrixSize} x {matrixSize}</p>
        </div>
        <Badge variant="outline">Mean {meanPae.toFixed(1)} A</Badge>
      </div>
      <div
        className="grid aspect-square w-full max-w-[360px] overflow-hidden rounded border border-slate-200 bg-white"
        style={{ gridTemplateColumns: `repeat(${sampled[0]?.length || 1}, minmax(0, 1fr))` }}
        aria-label="Predicted aligned error heatmap"
      >
        {sampled.flatMap((row, rowIndex) =>
          row.map((value, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              title={`PAE ${Number(value).toFixed(1)} A`}
              style={{ background: paeColor(Number(value)) }}
            />
          ))
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-600">
        <span className="inline-flex items-center gap-1"><i className="h-2 w-4 rounded-sm bg-blue-700" />0-5 A</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-4 rounded-sm bg-green-500" />5-10 A</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-4 rounded-sm bg-yellow-400" />10-20 A</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-4 rounded-sm bg-orange-500" />20+ A</span>
      </div>
    </div>
  );
}

function StructureAlignmentMetrics({ intelligence }: { intelligence: StructureIntelligencePack }) {
  const tm = intelligence.metrics.tmScoreComparisons
    .filter((metric) => metric.available)
    .sort((left, right) => right.tmScore - left.tmScore)[0];
  const rmsd = intelligence.metrics.rmsdComparisons
    .filter((metric) => metric.available)
    .sort((left, right) => left.rmsd - right.rmsd)[0];

  if (!tm && !rmsd) {
    return (
      <div className="mt-3 rounded-md border border-slate-200 bg-white p-3 text-[11px] leading-4 text-slate-600">
        No coordinate superposition metric is packaged yet. Run the WSL data build with US-align/TM-align to compute aligned length, RMSD, TM-score, and Seq_ID.
      </div>
    );
  }

  const values = [
    { label: "Aligned length", value: String(tm?.alignedLength ?? rmsd?.alignedResidues ?? "Not parsed") },
    { label: "RMSD", value: rmsd ? `${rmsd.rmsd.toFixed(2)} A` : tm?.rmsd ? `${tm.rmsd.toFixed(2)} A` : "Not parsed" },
    { label: "TM-score", value: tm ? tm.tmScore.toFixed(3) : "Not parsed" },
    {
      label: "Seq_ID",
      value: typeof tm?.sequenceIdentityAligned === "number" ? `${(tm.sequenceIdentityAligned * 100).toFixed(1)}%` : "Not parsed"
    }
  ];

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {values.map((item) => (
        <div key={item.label} className="rounded-md border border-slate-200 bg-white px-3 py-2">
          <p className="text-[10px] font-semibold uppercase text-slate-500">{item.label}</p>
          <p className="mt-1 text-xs font-semibold text-slate-950">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ExternalRecordLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline"
    >
      {label} <ExternalLink className="h-3 w-3" />
    </a>
  );
}

function DataRow({ label, value, source }: { label: string; value: string; source: string }) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="p-2 align-top text-xs font-semibold text-slate-900">{label}</td>
      <td className="p-2 align-top text-xs text-slate-700">{value}</td>
      <td className="p-2 align-top text-[11px] text-slate-500">{source}</td>
    </tr>
  );
}

function QualityRail({ intelligence }: { intelligence: StructureIntelligencePack }) {
  const qc = useMemo(() => computeQC(intelligence), [intelligence]);
  const rc = useMemo(() => computeRC(intelligence), [intelligence]);
  const mc = useMemo(() => computeMC(intelligence), [intelligence]);
  const sc = useMemo(() => computeSC(intelligence), [intelligence]);
  const of = useMemo(() => computeOF(qc, rc, mc, sc, intelligence), [intelligence, mc, qc, rc, sc]);

  return (
    <aside className="grid gap-4 xl:min-w-[340px]">
      <div id="scores" className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm shadow-teal-900/5 scroll-mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Evidence Scores</h2>
          <Badge variant={qc.value && qc.value >= 70 ? "success" : "outline"}>{qc.label}</Badge>
        </div>
        <div className="mt-4">
          <MetricRow label="Quality check" value={qc.value !== null ? `${qc.value}/100` : qc.label} source={qc.sources.join(", ") || qc.reason} />
          <MetricRow label="Residue conservation" value={rc.value !== null ? `${rc.value}/100` : rc.label} source={rc.sources.join(", ") || rc.reason} />
          <MetricRow label="Model confidence" value={mc.value !== null ? `${mc.value}/100` : mc.label} source={mc.sources.join(", ") || mc.reason} />
          <MetricRow label="Structural conservation" value={sc.value !== null ? `${sc.value}/100` : sc.label} source={sc.sources.join(", ") || sc.reason} />
          <MetricRow label="Overall fold" value={of.value !== null ? `${of.value}/100` : of.label} source={of.sources.join(", ") || of.reason} />
        </div>
      </div>

      <div className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm shadow-teal-900/5">
        <h2 className="text-sm font-semibold text-slate-900">Interpretation</h2>
        <div className="mt-3 rounded-md border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-950">{of.label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-600">{of.reason}</p>
          <StructureAlignmentMetrics intelligence={intelligence} />
        </div>
      </div>
    </aside>
  );
}

function databaseLinks(pack: ProteinPack, intelligence: StructureIntelligencePack) {
  const primaryPdb = pack.pdbStructures[0]?.pdbId || intelligence.structures.experimental[0]?.pdbId;
  return {
    uniprot: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry`,
    rcsb: primaryPdb ? `https://www.rcsb.org/structure/${primaryPdb}` : `https://www.rcsb.org/search?request=%7B%22query%22:%7B%22type%22:%22terminal%22,%22service%22:%22text%22,%22parameters%22:%7B%22attribute%22:%22rcsb_polymer_entity_container_identifiers.reference_sequence_identifiers.database_accession%22,%22operator%22:%22exact_match%22,%22value%22:%22${pack.accession}%22%7D%7D,%22return_type%22:%22entry%22%7D`,
    alphafold: pack.alphaFold.modelId ? `https://alphafold.ebi.ac.uk/entry/${pack.accession}` : `https://alphafold.ebi.ac.uk/search/text/${pack.accession}`,
    interpro: `https://www.ebi.ac.uk/interpro/protein/UniProt/${pack.accession}`,
    featureViewer: `https://www.uniprot.org/uniprotkb/${pack.accession}/feature-viewer?loadFeatures=true`,
    uniprotVariants: `https://www.uniprot.org/uniprotkb/${pack.accession}/entry#variants`,
    clinvar: `https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(`${pack.geneName}[gene]`)}`,
    pdbRedo: primaryPdb ? `https://pdb-redo.eu/db/${primaryPdb}` : "https://pdb-redo.eu/"
  };
}

function shortReason(value?: string, limit = 150) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function msaRecordSummary(msa: MsaSummary, browserMsa: MsaSummary | null) {
  const activeMsa = msa.available ? msa : browserMsa;
  if (activeMsa) {
    return {
      key: `${activeMsa.sourceSequenceCount || activeMsa.alignedSequences.length} aligned sequence(s)`,
      data: `consensus ${activeMsa.consensus.length} residues; ${activeMsa.conservationScores.length} residue conservation score(s)`,
      status: "Computed",
      source: activeMsa.method || activeMsa.source || "MSA conservation"
    };
  }

  return null;
}

function DatabaseRecordPanel({
  pack,
  intelligence,
  browserMsa
}: {
  pack: ProteinPack;
  intelligence: StructureIntelligencePack;
  browserMsa: MsaSummary | null;
}) {
  const links = databaseLinks(pack, intelligence);
  const msaSummary = msaRecordSummary(intelligence.msa, browserMsa);
  const sourceRows = [
    {
      name: "UniProtKB",
      key: pack.accession,
      data: "protein name, gene, organism, sequence, feature annotations, cross-references",
      status: pack.sequence.value ? "Loaded sequence" : "Metadata only",
      href: links.uniprot
    },
    {
      name: "RCSB PDB",
      key: pack.pdbStructures.map((structure) => structure.pdbId).join(", ") || "No packaged PDB",
      data: "experimental structures, method, resolution, chains, ligands when available",
      status: pack.pdbStructures.length ? `${pack.pdbStructures.length} record(s)` : "No local record",
      href: links.rcsb
    },
    {
      name: "AlphaFold DB",
      key: pack.alphaFold.modelId || intelligence.structures.predicted[0]?.modelId || "No mapped model",
      data: "predicted model, pLDDT, PAE, confidence file links when available",
      status: pack.alphaFold.available || intelligence.structures.predicted.length ? "Mapped" : "Not mapped",
      href: links.alphafold
    },
    {
      name: "InterPro / Pfam",
      key: `${intelligence.domains.length || pack.domains.length} domain/profile record(s)`,
      data: "domain, repeat, family, motif, and profile evidence",
      status: intelligence.domains.length || pack.domains.length ? "Available" : "No mapped domains",
      href: links.interpro
    },
    ...(msaSummary
      ? [
          {
            name: "MSA / conservation",
            key: msaSummary.key,
            data: msaSummary.data,
            status: msaSummary.status,
            href: links.uniprot
          }
        ]
      : [])
  ];

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-3 shadow-sm shadow-teal-900/5 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Database Records</h2>
          <p className="mt-1 text-xs text-slate-500">Primary source records used before interpretation.</p>
        </div>
        <ExternalRecordLink href={links.uniprot} label="Open UniProt" />
      </div>
      <div className="mt-4 grid gap-2 md:hidden">
        {sourceRows.map((row) => (
          <div key={row.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-900">{row.name}</p>
              <Badge variant={row.status.includes("No") || row.status.includes("Not") ? "outline" : "success"}>{row.status}</Badge>
            </div>
            <p className="mt-2 break-words font-mono text-[11px] text-slate-700">{row.key}</p>
            <p className="mt-2 leading-5 text-slate-600">{row.data}</p>
            <div className="mt-2"><ExternalRecordLink href={row.href} label="Open record" /></div>
          </div>
        ))}
      </div>
      <div className="mt-4 hidden max-w-full overflow-x-auto md:block">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="p-2">Database</th>
              <th className="p-2">Record key</th>
              <th className="p-2">Data contributed</th>
              <th className="p-2">Status</th>
              <th className="p-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {sourceRows.map((row) => (
              <tr key={row.name} className="border-b border-slate-100 text-xs last:border-b-0">
                <td className="p-2 font-semibold text-slate-900">{row.name}</td>
                <td className="p-2 font-mono text-[11px] text-slate-700">{row.key}</td>
                <td className="p-2 text-slate-600">{row.data}</td>
                <td className="p-2"><Badge variant={row.status.includes("No") || row.status.includes("Not") ? "outline" : "success"}>{row.status}</Badge></td>
                <td className="p-2"><ExternalRecordLink href={row.href} label="Open" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ExperimentalStructureDetails({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const structures = pack.pdbStructures.length
    ? pack.pdbStructures
    : intelligence.structures.experimental.map((structure) => ({
        pdbId: structure.pdbId,
        method: structure.experimentalMethod,
        resolution: structure.resolution ? `${structure.resolution} A` : undefined,
        chains: structure.chains.join(", "),
        source: structure.source.name
      }));
  const pagedStructures = useIncrementalList(structures, 10);

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <h2 className="text-sm font-semibold text-slate-900">Experimental Structure Details</h2>
      <div className="mt-4 max-w-full overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="p-2">PDB</th>
              <th className="p-2">Method</th>
              <th className="p-2">Resolution</th>
              <th className="p-2">Chains / assembly</th>
              <th className="p-2">Ligands</th>
              <th className="p-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {structures.length ? pagedStructures.visibleItems.map((structure) => {
              const detailed = intelligence.structures.experimental.find((entry) => entry.pdbId === structure.pdbId);
              return (
                <tr key={structure.pdbId} className="border-b border-slate-100 text-xs last:border-b-0">
                  <td className="p-2 font-mono font-semibold text-teal-700">
                    <ExternalRecordLink href={`https://www.rcsb.org/structure/${structure.pdbId}`} label={structure.pdbId} />
                  </td>
                  <td className="p-2 text-slate-700">{structure.method || detailed?.experimentalMethod || "Not listed"}</td>
                  <td className="p-2 text-slate-700">{structure.resolution || (detailed?.resolution ? `${detailed.resolution} A` : "Not listed")}</td>
                  <td className="p-2 text-slate-700">{structure.chains || detailed?.chains.join(", ") || "Not listed"}</td>
                  <td className="p-2 text-slate-700">{detailed?.ligands.length ? detailed.ligands.map((ligand) => ligand.id).join(", ") : "Not listed"}</td>
                  <td className="p-2 text-[11px] text-slate-500">{structure.source || detailed?.source.name || "RCSB PDB"}</td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={6} className="p-3 text-xs text-slate-500">No experimental structure record is packaged for this query.</td>
              </tr>
            )}
          </tbody>
        </table>
        {pagedStructures.hasMore && <div ref={pagedStructures.sentinelRef} className="h-8" aria-hidden="true" />}
      </div>
    </section>
  );
}

function AlphaFoldConfidencePanel({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const plddt = intelligence.metrics.plddt;
  const pae = intelligence.metrics.pae;
  const predicted = intelligence.structures.predicted[0];
  const modelId = pack.alphaFold.modelId || predicted?.modelId;
  const available = pack.alphaFold.available || Boolean(predicted);

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">AlphaFold Confidence</h2>
          <p className="mt-1 text-xs text-slate-500">Predicted model confidence, only when AlphaFold DB data is mapped.</p>
        </div>
        <Badge variant={available ? "success" : "outline"}>{available ? "AlphaFold mapped" : "No AlphaFold record"}</Badge>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Model ID" value={modelId || "Not mapped"} source="AlphaFold DB" />
        <SummaryCard
          label="Mean pLDDT"
          value={plddt.available ? plddt.mean.toFixed(1) : pack.alphaFold.confidenceAvg ? pack.alphaFold.confidenceAvg.toFixed(1) : "Not available"}
          source="AlphaFold confidence JSON"
        />
        <SummaryCard label="Mean PAE" value={pae.available ? `${pae.meanPae.toFixed(1)} A` : "Not available"} source="AlphaFold PAE JSON" />
        <SummaryCard
          label="Low-confidence regions"
          value={plddt.available ? String(plddt.lowConfidenceRegions.length) : "Not available"}
          source="pLDDT < 70"
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {pack.alphaFold.cifUrl && <ExternalRecordLink href={pack.alphaFold.cifUrl} label="CIF" />}
        {pack.alphaFold.pdbUrl && <ExternalRecordLink href={pack.alphaFold.pdbUrl} label="PDB" />}
        {pack.alphaFold.paeUrl && <ExternalRecordLink href={pack.alphaFold.paeUrl} label="PAE" />}
        {pack.alphaFold.plddtUrl && <ExternalRecordLink href={pack.alphaFold.plddtUrl} label="pLDDT" />}
        {!available && <ExternalRecordLink href={`https://alphafold.ebi.ac.uk/search/text/${pack.accession}`} label="Search AlphaFold DB" />}
      </div>
      {(plddt.available || pae.available) && (
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
          <div className="grid gap-4">
            {plddt.available && plddt.perResidue.length > 0 && <PlddtProfileGraph values={plddt.perResidue} />}
            {plddt.available && <PlddtBinBars bins={plddt.bins} />}
          </div>
          {pae.available && <PaeHeatmap matrix={pae.downsampledMatrix} meanPae={pae.meanPae} matrixSize={pae.matrixSize} />}
        </div>
      )}
    </section>
  );
}

function FeatureClassesPanel({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const links = databaseLinks(pack, intelligence);
  const features = [
    ...intelligence.domains.map((domain) => ({ type: domain.type, label: domain.name, start: domain.start, end: domain.end, source: domain.sourceDatabase })),
    ...intelligence.protein.features.map((feature) => ({ type: feature.type, label: feature.description, start: feature.start, end: feature.end, source: feature.source })),
    ...pack.motifs.map((motif) => ({ type: motif.type, label: motif.name, start: motif.start, end: motif.end, source: motif.source || "Protein pack" })),
    ...pack.domains.map((domain) => ({ type: domain.type, label: domain.name, start: domain.start, end: domain.end, source: domain.source || "Protein pack" }))
  ].filter((feature, index, all) => {
    const key = `${feature.type}-${feature.label}-${feature.start}-${feature.end}`;
    return all.findIndex((item) => `${item.type}-${item.label}-${item.start}-${item.end}` === key) === index;
  });
  const counts = features.reduce<Record<string, number>>((acc, feature) => {
    const key = feature.type || "Feature";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const pagedFeatures = useIncrementalList(features, 10);

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Domain, Motif, Site, and Feature Classes</h2>
          <p className="mt-1 text-xs text-slate-500">
            {features.length ? `${features.length} mapped feature record(s) from packaged database evidence.` : "No feature classes are mapped."}
          </p>
        </div>
        <div className="flex max-w-5xl flex-wrap items-center gap-2">
          <ExternalRecordLink href={links.featureViewer} label="Feature viewer" />
          {Object.keys(counts).length > 0 && (
            <>
            {Object.entries(counts).map(([type, count]) => (
              <span key={type} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                <span className="font-medium">{type}</span>
                <Badge variant="outline">{count}</Badge>
              </span>
            ))}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 max-h-[460px] overflow-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[680px] border-collapse text-left">
          <tbody>
            {pagedFeatures.visibleItems.map((feature, index) => (
              <DataRow
                key={`${feature.type}-${feature.label}-${index}`}
                label={`${feature.type || "Feature"} ${feature.start && feature.end ? `(${feature.start}-${feature.end})` : ""}`}
                value={feature.label || "Unnamed feature"}
                source={feature.source || "Database feature record"}
              />
            ))}
            {!features.length && <DataRow label="Feature records" value="No feature classes are packaged for this record." source="Local pack" />}
          </tbody>
        </table>
        {pagedFeatures.hasMore && <div ref={pagedFeatures.sentinelRef} className="h-8" aria-hidden="true" />}
      </div>
    </section>
  );
}

interface ClinVarGraphVariant {
  id: string;
  position: number;
  significance: string;
  title: string;
  condition?: string;
  sourceUrl: string;
}

const CLINVAR_LANES = [
  "Pathogenic",
  "Likely pathogenic",
  "Uncertain significance",
  "Likely benign",
  "Benign",
  "Conflicting",
  "Not provided",
  "Other"
] as const;

function normalizeClinVarSignificance(value?: string) {
  const text = String(value || "").toLowerCase();
  if (/conflict/.test(text)) return "Conflicting";
  if (/likely pathogenic/.test(text)) return "Likely pathogenic";
  if (/pathogenic/.test(text)) return "Pathogenic";
  if (/uncertain|vus/.test(text)) return "Uncertain significance";
  if (/likely benign/.test(text)) return "Likely benign";
  if (/benign/.test(text)) return "Benign";
  if (/not provided|not_provided|no assertion/.test(text)) return "Not provided";
  return "Other";
}

function clinVarLaneColor(lane: string) {
  if (lane === "Pathogenic") return "#dc2626";
  if (lane === "Likely pathogenic") return "#fb923c";
  if (lane === "Uncertain significance") return "#facc15";
  if (lane === "Likely benign") return "#22c55e";
  if (lane === "Benign") return "#15803d";
  if (lane === "Conflicting") return "#525252";
  if (lane === "Not provided") return "#a3a3a3";
  return "#94a3b8";
}

function extractProteinPosition(...values: Array<unknown>) {
  const text = values.map((value) => String(value || "")).join(" ");
  const threeLetter = text.match(/p\.\(?([A-Z][a-z]{2})(\d+)([A-Z][a-z]{2}|Ter|Stop|\*)/);
  if (threeLetter) return Number.parseInt(threeLetter[2] ?? "", 10) || null;
  const oneLetter = text.match(/p\.\(?[A-Z](\d+)([A-Z*]|Ter|Stop)/i);
  if (oneLetter) return Number.parseInt(oneLetter[1] ?? "", 10) || null;
  return null;
}

function readClinVarSummaryField(record: Record<string, unknown>, names: string[]) {
  for (const name of names) {
    const value = record[name];
    if (!value) continue;
    if (typeof value === "string") return value;
    if (typeof value === "object" && "description" in value) return String((value as { description?: unknown }).description ?? "");
  }
  return "";
}

function parseClinVarEutilsRecord(record: Record<string, unknown>, geneName: string, sequenceLength: number): ClinVarGraphVariant | null {
  const title = readClinVarSummaryField(record, ["title", "variation_name", "accession", "uid"]);
  const proteinChange = readClinVarSummaryField(record, ["protein_change", "protein_expression", "variation_name", "title"]);
  const position = extractProteinPosition(proteinChange, title);
  if (!position || position < 1 || position > sequenceLength) return null;
  const significance = normalizeClinVarSignificance(
    readClinVarSummaryField(record, ["clinical_significance", "clinicalsignificance", "germline_classification", "classification"])
  );
  const id = readClinVarSummaryField(record, ["uid", "variation_id", "accession"]) || `${geneName}-${position}-${title}`;
  const condition = readClinVarSummaryField(record, ["trait", "trait_set", "phenotype", "condition"]);

  return {
    id,
    position,
    significance,
    title: title || `${geneName} variant at ${position}`,
    condition,
    sourceUrl: `https://www.ncbi.nlm.nih.gov/clinvar/variation/${id}/`
  };
}

function parseClinicalTablesResponse(data: unknown, geneName: string, sequenceLength: number): ClinVarGraphVariant[] {
  if (!Array.isArray(data)) return [];
  const extras = data[2] as Record<string, unknown[]> | null | undefined;
  const rows = Array.isArray(data[3]) ? data[3] as string[][] : [];
  const codes = Array.isArray(data[1]) ? data[1] as string[] : [];
  const count = Math.max(rows.length, codes.length);
  const output: ClinVarGraphVariant[] = [];
  for (let index = 0; index < count; index += 1) {
    const code = String(codes[index] ?? "");
    const aminoAcidChange = String(extras?.AminoAcidChange?.[index] ?? rows[index]?.[2] ?? "");
    const name = String(extras?.Name?.[index] ?? rows[index]?.[3] ?? "");
    const type = String(extras?.Type?.[index] ?? rows[index]?.[4] ?? "");
    const phenotype = String(extras?.["phenotype.text"]?.[index] ?? rows[index]?.[5] ?? "");
    const position = extractProteinPosition(aminoAcidChange, name);
    if (!position || position < 1 || position > sequenceLength) continue;
    output.push({
      id: code || `${geneName}-${position}-${index}`,
      position,
      significance: "Other",
      title: name || aminoAcidChange || `${geneName} variant at ${position}`,
      condition: phenotype || type,
      sourceUrl: code ? `https://www.ncbi.nlm.nih.gov/clinvar/variation/${code}/` : `https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(`${geneName}[gene]`)}`
    });
  }
  return output;
}

async function fetchClinVarGraphVariants(geneName: string, sequenceLength: number): Promise<ClinVarGraphVariant[]> {
  if (!geneName || !sequenceLength) return [];
  const esearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=clinvar&term=${encodeURIComponent(`${geneName}[gene]`)}&retmode=json&retmax=120`;
  const esearchResponse = await fetch(esearchUrl, { headers: { Accept: "application/json" } });
  if (esearchResponse.ok) {
    const esearch = await esearchResponse.json() as { esearchresult?: { idlist?: string[] } };
    const ids = esearch.esearchresult?.idlist?.slice(0, 80) ?? [];
    if (ids.length) {
      const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=clinvar&id=${ids.join(",")}&retmode=json`;
      const summaryResponse = await fetch(summaryUrl, { headers: { Accept: "application/json" } });
      if (summaryResponse.ok) {
        const summary = await summaryResponse.json() as { result?: Record<string, unknown> & { uids?: string[] } };
        const records = (summary.result?.uids ?? [])
          .map((id) => summary.result?.[id] as Record<string, unknown> | undefined)
          .filter((record): record is Record<string, unknown> => Boolean(record));
        const parsed = records
          .map((record) => parseClinVarEutilsRecord(record, geneName, sequenceLength))
          .filter((variant): variant is ClinVarGraphVariant => Boolean(variant));
        if (parsed.length) return parsed;
      }
    }
  }

  const fields = "VariationID,GeneSymbol,AminoAcidChange,Name,Type,phenotype.text";
  const extras = "VariationID,GeneSymbol,AminoAcidChange,Name,Type,phenotype.text";
  const clinicalTablesUrl = `https://clinicaltables.nlm.nih.gov/api/variants/v4/search?terms=${encodeURIComponent(geneName)}&q=${encodeURIComponent(`GeneSymbol:${geneName}`)}&count=120&df=${encodeURIComponent(fields)}&ef=${encodeURIComponent(extras)}`;
  const fallbackResponse = await fetch(clinicalTablesUrl, { headers: { Accept: "application/json" } });
  if (!fallbackResponse.ok) return [];
  return parseClinicalTablesResponse(await fallbackResponse.json(), geneName, sequenceLength);
}

function ClinVarVariantGraph({ geneName, sequenceLength, clinVarUrl }: { geneName: string; sequenceLength: number; clinVarUrl: string }) {
  const [variants, setVariants] = useState<ClinVarGraphVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!geneName || !sequenceLength) return;
    let cancelled = false;
    const cacheKey = `bioalign-clinvar-graph:${geneName}:${sequenceLength}`;
    async function run() {
      setLoading(true);
      setAttempted(true);
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { storedAt: number; variants: ClinVarGraphVariant[] };
          if (Date.now() - parsed.storedAt < 7 * 24 * 60 * 60 * 1000) {
            if (!cancelled) setVariants(parsed.variants);
            return;
          }
        }
        const result = await fetchClinVarGraphVariants(geneName, sequenceLength);
        localStorage.setItem(cacheKey, JSON.stringify({ storedAt: Date.now(), variants: result }));
        if (!cancelled) setVariants(result);
      } catch {
        if (!cancelled) setVariants([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [geneName, sequenceLength]);

  const laneCounts = CLINVAR_LANES.map((lane) => ({
    lane,
    count: variants.filter((variant) => variant.significance === lane).length
  }));
  const width = 920;
  const rowHeight = 32;
  const plotX = 150;
  const plotWidth = 760;
  const height = 58 + CLINVAR_LANES.length * rowHeight;
  const ticks = [1, Math.round(sequenceLength * 0.25), Math.round(sequenceLength * 0.5), Math.round(sequenceLength * 0.75), sequenceLength]
    .filter((value, index, all) => value > 0 && all.indexOf(value) === index);

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-900">ClinVar variant distribution</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Protein-position view from ClinVar records when amino-acid positions are available.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {loading && <Badge variant="outline">Loading ClinVar</Badge>}
          {variants.length > 0 && <Badge variant="success">{variants.length} plotted variant(s)</Badge>}
          <ExternalRecordLink href={clinVarUrl} label="Open ClinVar" />
        </div>
      </div>

      {variants.length ? (
        <>
          <div className="mt-3 overflow-x-auto rounded-md border border-slate-200 bg-white p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[780px]" role="img" aria-label={`${geneName} ClinVar variant distribution`}>
              <line x1={plotX} x2={plotX + plotWidth} y1="30" y2="30" stroke="#15803d" strokeWidth="3" />
              {ticks.map((tick) => {
                const x = plotX + ((tick - 1) / Math.max(sequenceLength - 1, 1)) * plotWidth;
                return (
                  <g key={tick}>
                    <line x1={x} x2={x} y1="24" y2={height - 8} stroke="#e2e8f0" />
                    <text x={x} y={height - 2} textAnchor="middle" className="fill-slate-500 text-[10px]">{tick}</text>
                  </g>
                );
              })}
              <text x="0" y="34" className="fill-slate-900 text-[11px] font-semibold">Gene</text>
              <text x={plotX + plotWidth + 8} y="34" className="fill-slate-600 text-[10px]">{geneName}</text>
              {CLINVAR_LANES.map((lane, laneIndex) => {
                const y = 56 + laneIndex * rowHeight;
                return (
                  <g key={lane}>
                    <text x="0" y={y + 5} className="fill-slate-700 text-[11px]">{lane}</text>
                    <line x1={plotX} x2={plotX + plotWidth} y1={y} y2={y} stroke={lane === "Uncertain significance" ? "#94a3b8" : "#e5e7eb"} />
                  </g>
                );
              })}
              {variants.slice(0, 240).map((variant, index) => {
                const laneIndex = Math.max(0, CLINVAR_LANES.indexOf(variant.significance as typeof CLINVAR_LANES[number]));
                const x = plotX + ((variant.position - 1) / Math.max(sequenceLength - 1, 1)) * plotWidth;
                const y = 56 + laneIndex * rowHeight;
                const color = clinVarLaneColor(variant.significance);
                const offset = ((index % 5) - 2) * 2.2;
                return (
                  <a key={`${variant.id}-${index}`} href={variant.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <line x1={x} x2={x} y1={30} y2={y} stroke={color} strokeOpacity="0.24" />
                    <circle cx={x + offset} cy={y} r="5" fill={color} stroke="#0f172a" strokeWidth="0.5">
                      <title>{`${variant.title} | ${variant.significance} | residue ${variant.position}${variant.condition ? ` | ${variant.condition}` : ""}`}</title>
                    </circle>
                  </a>
                );
              })}
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {laneCounts.filter((item) => item.count > 0).map((item) => (
              <span key={item.lane} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-700">
                <i className="h-2 w-2 rounded-full" style={{ backgroundColor: clinVarLaneColor(item.lane) }} />
                {item.lane}: {item.count}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-3 rounded-md border border-dashed border-slate-300 bg-white p-3 text-xs leading-5 text-slate-600">
          {loading
            ? "Fetching ClinVar variant summaries..."
            : attempted
              ? "No ClinVar records with parseable protein residue positions were returned in this browser request. Use the ClinVar link for the full graphical result."
              : "ClinVar graph loads when browser access to NCBI variant records is available."}
        </div>
      )}
    </div>
  );
}

function DiseaseInteractionPanel({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const links = databaseLinks(pack, intelligence);
  const sequenceLength = pack.sequence.length || intelligence.protein.length || pack.sequence.value.length;
  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Disease, Pathways, Ligands, and Interactions</h2>
          <p className="mt-1 text-xs text-slate-500">Biological context from packaged records, with links to original variant databases.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ExternalRecordLink href={links.featureViewer} label="Feature viewer" />
          <ExternalRecordLink href={links.uniprotVariants} label="UniProt variants" />
          <ExternalRecordLink href={links.clinvar} label="ClinVar" />
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">Disease summary</p>
          <p className="mt-2 text-xs leading-5 text-slate-600">{pack.diseaseSummary || "No disease summary is packaged for this protein."}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">Pathways</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {pack.pathways.length ? pack.pathways.map((pathway) => <Badge key={pathway.id} variant="outline">{pathway.name}</Badge>) : <span className="text-xs text-slate-500">No pathway records packaged.</span>}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">Interactions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {pack.interactions.length ? pack.interactions.map((interaction) => <Badge key={interaction.target} variant="outline">{interaction.target}</Badge>) : <span className="text-xs text-slate-500">No interaction records packaged.</span>}
          </div>
        </div>
      </div>
      <ClinVarVariantGraph geneName={pack.geneName} sequenceLength={sequenceLength} clinVarUrl={links.clinvar} />
    </section>
  );
}

function SourceConfidencePanel({ pack, intelligence, browserMsa }: { pack: ProteinPack; intelligence: StructureIntelligencePack; browserMsa: MsaSummary | null }) {
  const featureCount = pack.motifs.length || intelligence.protein.features.length || intelligence.domains.length || pack.domains.length;
  const rmsd = intelligence.metrics.rmsdComparisons.find((item) => item.available);
  const tmScore = intelligence.metrics.tmScoreComparisons.find((item) => item.available);
  const msaSummary = msaRecordSummary(intelligence.msa, browserMsa);
  const superpositionValue = tmScore
    ? [
        `Aligned length ${tmScore.alignedLength}`,
        typeof tmScore.rmsd === "number" ? `RMSD ${tmScore.rmsd.toFixed(2)} A` : null,
        `TM-score ${tmScore.tmScore.toFixed(3)}`,
        typeof tmScore.sequenceIdentityAligned === "number" ? `Seq_ID ${tmScore.sequenceIdentityAligned.toFixed(3)}` : null
      ].filter(Boolean).join(" / ")
    : rmsd
      ? `Aligned length ${rmsd.alignedResidues} / RMSD ${rmsd.rmsd.toFixed(2)} A`
      : "No superposition metric packaged";
  const rows = [
    { label: "Sequence", value: pack.sequence.value ? "Direct sequence stored" : "Length-only metadata", source: "UniProt browser API" },
    { label: "Experimental structures", value: pack.pdbStructures.length ? `${pack.pdbStructures.length} PDB cross-reference(s)` : "No PDB structure stored", source: "RCSB PDB / UniProt cross-reference" },
    { label: "AlphaFold", value: pack.alphaFold.available || intelligence.structures.predicted.length ? "Mapped predicted model" : "No AlphaFold mapping", source: "AlphaFold DB" },
    { label: "Domains and features", value: `${featureCount} mapped record(s)`, source: "UniProt / InterPro / Pfam" },
    ...(msaSummary ? [{ label: "Conservation", value: msaSummary.data, source: msaSummary.source }] : []),
    { label: "RMSD / TM-score", value: superpositionValue, source: "TM-align / US-align / Foldseek" }
  ];

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <h2 className="text-sm font-semibold text-slate-900">Source Confidence</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full border-collapse text-left">
          <tbody>{rows.map((row) => <DataRow key={row.label} {...row} />)}</tbody>
        </table>
      </div>
    </section>
  );
}

function evidenceStatus(available: boolean, availableText = "Available", missingText = "Not mapped") {
  return {
    label: available ? availableText : missingText,
    variant: available ? "success" as const : "outline" as const
  };
}

function compactList(values: string[], limit = 4) {
  const unique = Array.from(new Set(values.filter(Boolean)));
  if (!unique.length) return "";
  return `${unique.slice(0, limit).join(", ")}${unique.length > limit ? ` +${unique.length - limit}` : ""}`;
}

function metricPercent(value: number, max: number) {
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function ValidationMetricCard({
  label,
  value,
  sublabel,
  percent,
  tone = "teal"
}: {
  label: string;
  value: string;
  sublabel: string;
  percent: number;
  tone?: "teal" | "slate" | "amber";
}) {
  const color = tone === "amber" ? "bg-amber-500" : tone === "slate" ? "bg-slate-700" : "bg-teal-600";
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase text-slate-500">{label}</p>
          <p className="mt-1 font-mono text-lg font-semibold text-slate-950">{value}</p>
        </div>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">{sublabel}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function SuperpositionMetricGraph({
  alignedLength,
  sequenceLength,
  rmsd,
  tmScore,
  seqId,
  interpretation
}: {
  alignedLength: number | null;
  sequenceLength: number;
  rmsd: number | null;
  tmScore: number | null;
  seqId: number | null;
  interpretation?: string;
}) {
  if (alignedLength === null && rmsd === null && tmScore === null && seqId === null) return null;

  const coverage = sequenceLength ? (alignedLength ?? 0) / sequenceLength : 0;
  const rmsdQuality = rmsd === null ? null : Math.max(0, Math.min(1, 1 - rmsd / 8));
  const tracks = [
    {
      label: "Aligned coverage",
      valueLabel: alignedLength !== null ? `${alignedLength}/${sequenceLength || "?"}` : "Not parsed",
      value: coverage,
      note: "aligned residues / canonical length"
    },
    {
      label: "RMSD quality",
      valueLabel: rmsd !== null ? `${rmsd.toFixed(2)} A` : "Not parsed",
      value: rmsdQuality,
      note: "lower RMSD gives a stronger bar"
    },
    {
      label: "TM-score",
      valueLabel: tmScore !== null ? tmScore.toFixed(3) : "Not parsed",
      value: tmScore,
      note: interpretation || "fold similarity"
    },
    {
      label: "Seq_ID",
      valueLabel: seqId !== null ? seqId.toFixed(3) : "Not parsed",
      value: seqId,
      note: "identical aligned residues / aligned residues"
    }
  ];
  const width = 520;
  const rowHeight = 44;
  const height = 48 + tracks.length * rowHeight;
  const plotX = 150;
  const plotWidth = 330;
  const scaleTicks = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-slate-900">Superposition metric graph</p>
          <p className="mt-1 text-[11px] text-slate-500">Normalized view of the packaged coordinate-superposition result.</p>
        </div>
        <Badge variant={tmScore !== null ? "success" : "outline"}>{interpretation || "Computed"}</Badge>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="RMSD TM-score Seq ID superposition metric graph">
        {scaleTicks.map((tick) => {
          const x = plotX + tick * plotWidth;
          return (
            <g key={tick}>
              <line x1={x} x2={x} y1="30" y2={height - 12} stroke="#e2e8f0" strokeWidth="1" />
              <text x={x} y="18" textAnchor="middle" className="fill-slate-500 text-[10px]">
                {tick.toFixed(tick === 0 || tick === 1 ? 0 : 2)}
              </text>
            </g>
          );
        })}
        {tracks.map((track, index) => {
          const y = 42 + index * rowHeight;
          const normalized = track.value === null ? 0 : Math.max(0, Math.min(1, track.value));
          const barWidth = normalized * plotWidth;
          const color = track.label === "RMSD quality" ? "#f59e0b" : track.label === "TM-score" ? "#0f766e" : "#334155";
          return (
            <g key={track.label}>
              <text x="0" y={y + 8} className="fill-slate-900 text-[11px] font-semibold">
                {track.label}
              </text>
              <text x="0" y={y + 24} className="fill-slate-500 text-[10px]">
                {track.note}
              </text>
              <rect x={plotX} y={y} width={plotWidth} height="16" rx="8" fill="#f1f5f9" />
              <rect x={plotX} y={y} width={Math.max(barWidth, track.value === null ? 0 : 2)} height="16" rx="8" fill={color} />
              <line x1={plotX + barWidth} x2={plotX + barWidth} y1={y - 5} y2={y + 21} stroke={color} strokeWidth="2" />
              <circle cx={plotX + barWidth} cy={y + 8} r="5" fill="#ffffff" stroke={color} strokeWidth="2" />
              <text x={plotX + plotWidth + 12} y={y + 11} className="fill-slate-900 text-[11px] font-semibold">
                {track.valueLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function StructureInterpretationLayer({
  pack,
  intelligence
}: {
  pack: ProteinPack;
  intelligence: StructureIntelligencePack;
}) {
  const [activeMethod, setActiveMethod] = useState("Structure validation");
  const sequenceLength = pack.sequence.length || intelligence.protein.length || pack.sequence.value.length;
  const featureCount = intelligence.protein.features.length || intelligence.domains.length || pack.domains.length;
  const experimentalIds = intelligence.structures.experimental.map((structure) => structure.pdbId);
  const pdbIds = experimentalIds.length ? experimentalIds : pack.pdbStructures.map((structure) => structure.pdbId);
  const hasExperimental = pdbIds.length > 0;
  const hasAlphaFold = intelligence.structures.predicted.length > 0 || pack.alphaFold.available;
  const hasPredictedCoordinate = intelligence.structures.predicted.length > 0 || Boolean(pack.alphaFold.pdbUrl || pack.alphaFold.cifUrl);
  const templateCount = pack.templates.length || pack.pdbStructures.length;
  const hasProfileEvidence = intelligence.profileEvidence.length > 0 || intelligence.domains.length > 0 || pack.domains.length > 0;
  const tmScore = intelligence.metrics.tmScoreComparisons.find((metric) => metric.available);
  const rmsd = intelligence.metrics.rmsdComparisons.find((metric) => metric.available);
  const plddt = intelligence.metrics.plddt.available ? intelligence.metrics.plddt.mean : pack.alphaFold.confidenceAvg;
  const pae = intelligence.metrics.pae.available ? intelligence.metrics.pae.meanPae : null;
  const representativeStructures = intelligence.structures.experimental.length ? intelligence.structures.experimental : [];
  const representativePdbDetails = representativeStructures
    .slice(0, 4)
    .map((structure) => {
      const method = structure.experimentalMethod || "method not listed";
      const resolution = typeof structure.resolution === "number" ? `${structure.resolution.toFixed(2)} A` : "resolution not listed";
      return `${structure.pdbId} (${method}; ${resolution})`;
    });
  const fallbackPdbIds = pack.pdbStructures.map((structure) => structure.pdbId);
  const tertiaryEvidence = representativePdbDetails.length
    ? `${representativePdbDetails.join("; ")}${representativeStructures.length > 4 ? `; +${representativeStructures.length - 4} more` : ""}`
    : hasExperimental
      ? compactList(fallbackPdbIds, 4)
      : hasAlphaFold
        ? pack.alphaFold.modelId || intelligence.structures.predicted[0]?.modelId || "AlphaFold model"
        : "No 3D structure mapped";
  const chainEvidence =
    compactList(representativeStructures.flatMap((structure) => structure.chains ?? []), 6) ||
    compactList(pack.pdbStructures.map((structure) => structure.chains ?? ""), 3) ||
    representativeStructures
      .flatMap((structure) => structure.polymerEntities ?? [])
      .map((entity) => entity.chains?.length ? `${entity.entityId}: ${entity.chains.join("/")}` : entity.entityId)
      .filter(Boolean)[0] ||
    "Assembly metadata listed";
  const secondaryDetails = [
    intelligence.domains.length ? `${intelligence.domains.length} domain/profile record(s)` : null,
    intelligence.protein.features.length ? `${intelligence.protein.features.length} UniProt feature(s)` : null,
    pack.motifs.length ? `${pack.motifs.length} region/motif record(s)` : null
  ].filter(Boolean).join("; ");
  const validationMissingReason = !hasPredictedCoordinate && hasExperimental
    ? "Experimental PDB coordinates are present, but no predicted coordinate model is packaged for this accession."
    : hasPredictedCoordinate && !hasExperimental
      ? "A predicted coordinate model is present, but no experimental PDB coordinate file is packaged for comparison."
      : !hasPredictedCoordinate && !hasExperimental
        ? "Neither predicted nor experimental coordinate files are packaged for this accession."
        : "US-align/TM-align did not produce a packaged superposition result for this accession.";

  const levelRows = [
    {
      level: "Primary",
      evidence: sequenceLength ? `${sequenceLength} residue canonical sequence` : "Sequence not loaded",
      source: pack.sequence.source || "UniProtKB",
      status: evidenceStatus(Boolean(sequenceLength))
    },
    {
      level: "Secondary",
      evidence: featureCount ? `${featureCount} mapped sequence feature/region records${secondaryDetails ? ` (${secondaryDetails})` : ""}` : "No secondary-structure annotation mapped",
      source: featureCount ? "UniProtKB / InterPro" : "DSSP or source secondary structure not present",
      status: evidenceStatus(Boolean(featureCount), "Feature evidence", "Not mapped")
    },
    {
      level: "Tertiary",
      evidence: tertiaryEvidence,
      source: hasExperimental ? "RCSB PDB" : hasAlphaFold ? "AlphaFold DB" : "No structure source",
      status: evidenceStatus(hasExperimental || hasAlphaFold, hasExperimental ? "Experimental" : "Predicted", "Not mapped")
    },
    {
      level: "Quaternary",
      evidence: hasExperimental ? chainEvidence : "Assembly not available without mapped structure",
      source: hasExperimental ? "RCSB assembly metadata" : "RCSB PDB",
      status: evidenceStatus(hasExperimental, "Assembly record", "Not mapped")
    }
  ];

  const methodRows = [
    {
      method: "Experimental structure",
      useCase: "Use when X-ray, NMR, or Cryo-EM structure exists for the protein or mapped accession.",
      evidence: hasExperimental ? `${pdbIds.length} PDB record(s)` : "No experimental PDB record in current data",
      source: "RCSB PDB",
      status: evidenceStatus(hasExperimental, "Primary route", "No record"),
      details: hasExperimental
        ? `Representative records: ${tertiaryEvidence}. These are experimental coordinate entries mapped to the selected accession or local structure pack.`
        : "No experimental coordinate entry is packaged for this selected accession."
    },
    {
      method: "Homology modeling",
      useCase: "Use when close templates are available; identity scoring requires BLAST/Foldseek/template alignment output.",
      evidence: templateCount ? `${templateCount} template candidate(s) listed` : "No ranked template candidate",
      source: templateCount ? "RCSB / build template index" : "Template search not computed",
      status: evidenceStatus(Boolean(templateCount), "Template evidence", "Not computed"),
      details: templateCount
        ? `${templateCount} local template candidate(s) are listed. BLAST/Foldseek identity, coverage, and e-value should be added when the WSL build computes template alignment output.`
        : "No template candidate is currently packaged for homology modeling."
    },
    {
      method: "Threading / fold recognition",
      useCase: "Use when sequence identity is low but domain/profile/fold evidence exists.",
      evidence: hasProfileEvidence ? `${intelligence.domains.length || pack.domains.length} domain/profile record(s)` : "No profile evidence mapped",
      source: hasProfileEvidence ? "InterPro / Pfam / profile evidence" : "Fold recognition not computed",
      status: evidenceStatus(hasProfileEvidence, "Profile evidence", "Not computed"),
      details: hasProfileEvidence
        ? `Profile/domain evidence includes ${intelligence.domains.length || pack.domains.length} mapped record(s). This supports fold-family interpretation, but it is not a coordinate superposition result.`
        : "No InterPro/Pfam/profile record is packaged for fold-recognition interpretation."
    },
    {
      method: "Deep-learning model",
      useCase: "Use when a predicted structure and confidence record are available.",
      evidence: plddt ? `Mean pLDDT ${plddt.toFixed(1)}${pae ? `, mean PAE ${pae.toFixed(1)} A` : ""}` : hasAlphaFold ? "AlphaFold model mapped" : "No AlphaFold confidence record",
      source: "AlphaFold DB",
      status: evidenceStatus(hasAlphaFold, "Model evidence", "No record"),
      details: hasAlphaFold
        ? `AlphaFold model evidence: ${pack.alphaFold.modelId || intelligence.structures.predicted[0]?.modelId || "mapped model"}${plddt ? `, mean pLDDT ${plddt.toFixed(1)}` : ""}${pae ? `, mean PAE ${pae.toFixed(1)} A` : ""}.`
        : "No AlphaFold DB model/confidence record is mapped in this pack."
    },
    {
      method: "Structure validation",
      useCase: "Use RMSD/TM-score only after valid coordinate superposition is produced.",
      evidence: tmScore && rmsd
        ? `TM-score ${tmScore.tmScore.toFixed(3)}, RMSD ${rmsd.rmsd.toFixed(2)} A`
        : tmScore
          ? `TM-score ${tmScore.tmScore.toFixed(3)}`
          : rmsd
            ? `RMSD ${rmsd.rmsd.toFixed(2)} A`
            : "No RMSD/TM-score result in current build",
      source: tmScore || rmsd ? "TM-align / build-time computation" : "Coordinate superposition not available",
      status: evidenceStatus(Boolean(tmScore || rmsd), "Computed", "Missing"),
      details: tmScore || rmsd
        ? `Computed superposition result is packaged for this record. ${tmScore ? `TM-score ${tmScore.tmScore.toFixed(3)}; aligned length ${tmScore.alignedLength}.` : ""} ${rmsd ? `RMSD ${rmsd.rmsd.toFixed(2)} A across ${rmsd.alignedResidues} aligned residues.` : ""}`
        : validationMissingReason
    }
  ];
  const activeMethodRow = methodRows.find((row) => row.method === activeMethod) ?? methodRows[0];
  const hasValidationMetrics = Boolean(tmScore || rmsd);
  const workflowSteps = [
    {
      label: "1",
      title: "Sequence record",
      value: `${sequenceLength || 0} residues`,
      source: pack.sequence.source || "UniProtKB"
    },
    {
      label: "2",
      title: "Feature mapping",
      value: `${featureCount || 0} annotations`,
      source: featureCount ? "UniProtKB / InterPro" : "No mapped features"
    },
    {
      label: "3",
      title: "Structure evidence",
      value: hasExperimental ? `${pdbIds.length} PDB entries` : hasAlphaFold ? "AlphaFold model" : "No structure",
      source: hasExperimental ? "RCSB PDB" : hasAlphaFold ? "AlphaFold DB" : "Not mapped"
    },
    {
      label: "4",
      title: "Coordinate check",
      value: hasValidationMetrics ? `${tmScore?.method || rmsd?.method || "US-align"}` : "Not computed",
      source: hasValidationMetrics ? `${tmScore?.queryStructure || rmsd?.queryStructure} vs ${tmScore?.templateStructure || rmsd?.templateStructure}` : validationMissingReason
    }
  ];
  const formulaRows = [
    {
      label: "RMSD",
      formula: "sqrt((1 / N) * sum_i ||x_i - y_i||^2)",
      value: rmsd ? `${rmsd.rmsd.toFixed(2)} A across ${rmsd.alignedResidues} residues` : "No coordinate superposition result",
      source: rmsd?.method || "US-align/TM-align"
    },
    {
      label: "TM-score",
      formula: "(1 / Ltarget) * sum_i 1 / (1 + (d_i / d0)^2)",
      value: tmScore ? `${tmScore.tmScore.toFixed(3)} (${tmScore.interpretation})` : "No fold-similarity score",
      source: tmScore?.method || "US-align/TM-align"
    },
    {
      label: "Seq_ID",
      formula: "identical aligned residues / aligned residues",
      value: typeof tmScore?.sequenceIdentityAligned === "number" ? tmScore.sequenceIdentityAligned.toFixed(3) : "Not parsed",
      source: "US-align alignment output"
    },
    {
      label: "pLDDT / PAE",
      formula: "mean confidence from AlphaFold JSON; mean pairwise aligned error",
      value: `${plddt ? `pLDDT ${plddt.toFixed(1)}` : "pLDDT unavailable"}${pae ? `, PAE ${pae.toFixed(1)} A` : ""}`,
      source: "AlphaFold DB"
    }
  ];

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Structure Interpretation Route</h2>
          <p className="mt-1 text-xs text-slate-500">Database evidence translated into the protein structure workflow for this record.</p>
        </div>
        <a
          href={`https://www.uniprot.org/uniprotkb/${pack.accession}/entry`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
        >
          UniProt record <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="grid items-center gap-5 xl:grid-cols-[minmax(220px,0.9fr)_220px_minmax(220px,0.9fr)]">
          <div className="grid gap-2">
            {workflowSteps.map((step) => (
              <button
                type="button"
                key={step.title}
                onClick={() => {
                  if (step.title === "Structure evidence") setActiveMethod("Experimental structure");
                  if (step.title === "Coordinate check") setActiveMethod("Structure validation");
                  if (step.title === "Feature mapping") setActiveMethod("Threading / fold recognition");
                  if (step.title === "Sequence record") setActiveMethod("Homology modeling");
                }}
                className="group rounded-full border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-teal-300 hover:bg-teal-50"
              >
                <span className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{step.title}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-slate-900">{step.value}</span>
                  </span>
                  <span className="h-px w-8 bg-slate-300 transition group-hover:bg-teal-500" />
                </span>
              </button>
            ))}
          </div>

          <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full border border-teal-200 bg-white shadow-[0_0_60px_rgba(20,184,166,0.22)] sm:h-48 sm:w-48">
            <div className="absolute inset-5 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.22),rgba(255,255,255,0.75)_62%)]" />
            <div className="relative text-center">
              <div className="mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full bg-slate-950 px-1 text-center text-[9px] font-semibold uppercase leading-3 text-white">
                {hasValidationMetrics ? "Validated" : "Evidence"}
              </div>
              <p className="text-xs font-semibold text-slate-950">Interpret</p>
              <p className="mt-1 text-[10px] leading-4 text-slate-500">source-backed route selection</p>
            </div>
          </div>

          <div className="grid gap-2">
            {levelRows.map((row) => (
              <button
                type="button"
                key={row.level}
                onClick={() => {
                  if (row.level === "Primary") setActiveMethod("Homology modeling");
                  if (row.level === "Secondary") setActiveMethod("Threading / fold recognition");
                  if (row.level === "Tertiary") setActiveMethod("Experimental structure");
                  if (row.level === "Quaternary") setActiveMethod("Experimental structure");
                }}
                className="group rounded-full border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-teal-300 hover:bg-teal-50"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="h-px w-8 bg-slate-300 transition group-hover:bg-teal-500" />
                  <span className="min-w-0 flex-1 text-right">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{row.level}</span>
                    <span className="mt-0.5 block truncate text-xs font-semibold text-slate-900">{row.status.label}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {methodRows.map((row) => (
            <button
              type="button"
              key={row.method}
              onClick={() => setActiveMethod(row.method)}
              className={`rounded-md border px-3 py-2 text-left text-xs transition ${
                activeMethodRow.method === row.method
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50"
              }`}
            >
              <span className="block font-semibold">{row.method}</span>
              <span className={`mt-1 block text-[10px] ${activeMethodRow.method === row.method ? "text-slate-300" : "text-slate-500"}`}>{row.status.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{activeMethodRow.method}</p>
              <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-600">{activeMethodRow.details}</p>
            </div>
            <Badge variant={activeMethodRow.status.variant}>{activeMethodRow.status.label}</Badge>
          </div>

          {activeMethodRow.method === "Structure validation" ? (
            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.1fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                <ValidationMetricCard
                  label="Aligned length"
                  value={String(tmScore?.alignedLength ?? rmsd?.alignedResidues ?? "Not parsed")}
                  sublabel="residues"
                  percent={metricPercent(tmScore?.alignedLength ?? rmsd?.alignedResidues ?? 0, sequenceLength || 1)}
                  tone="slate"
                />
                <ValidationMetricCard
                  label="RMSD"
                  value={typeof (tmScore?.rmsd ?? rmsd?.rmsd) === "number" ? `${(tmScore?.rmsd ?? rmsd?.rmsd ?? 0).toFixed(2)} A` : "Not parsed"}
                  sublabel="lower is better"
                  percent={100 - metricPercent(tmScore?.rmsd ?? rmsd?.rmsd ?? 0, 8)}
                  tone="amber"
                />
                <ValidationMetricCard
                  label="TM-score"
                  value={typeof tmScore?.tmScore === "number" ? tmScore.tmScore.toFixed(3) : "Not parsed"}
                  sublabel={tmScore?.interpretation || "fold similarity"}
                  percent={metricPercent(tmScore?.tmScore ?? 0, 1)}
                />
                <ValidationMetricCard
                  label="Seq_ID"
                  value={typeof tmScore?.sequenceIdentityAligned === "number" ? tmScore.sequenceIdentityAligned.toFixed(3) : "Not parsed"}
                  sublabel="aligned region"
                  percent={metricPercent(tmScore?.sequenceIdentityAligned ?? 0, 1)}
                  tone="slate"
                />
              </div>
              <div className="grid gap-2">
                <SuperpositionMetricGraph
                  alignedLength={typeof (tmScore?.alignedLength ?? rmsd?.alignedResidues) === "number" ? (tmScore?.alignedLength ?? rmsd?.alignedResidues ?? null) : null}
                  sequenceLength={sequenceLength || 0}
                  rmsd={typeof (tmScore?.rmsd ?? rmsd?.rmsd) === "number" ? (tmScore?.rmsd ?? rmsd?.rmsd ?? null) : null}
                  tmScore={typeof tmScore?.tmScore === "number" ? tmScore.tmScore : null}
                  seqId={typeof tmScore?.sequenceIdentityAligned === "number" ? tmScore.sequenceIdentityAligned : null}
                  interpretation={tmScore?.interpretation}
                />
                {formulaRows.slice(0, 3).map((row) => (
                  <div key={row.label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900">{row.label}</p>
                      <p className="text-[11px] font-semibold text-teal-700">{row.value}</p>
                    </div>
                    <code className="mt-2 block overflow-x-auto rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700">{row.formula}</code>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <dl className="mt-4 grid gap-3 text-xs md:grid-cols-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Evidence</dt>
                <dd className="mt-1 text-slate-900">{activeMethodRow.evidence}</dd>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Source</dt>
                <dd className="mt-1 text-slate-900">{activeMethodRow.source}</dd>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <dt className="font-semibold text-slate-500">Use case</dt>
                <dd className="mt-1 text-slate-900">{activeMethodRow.useCase}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function DomainTopology({
  accession,
  domains,
  features = [],
  sequenceLength
}: {
  accession: string;
  domains: DomainAnnotation[];
  features?: ProteinFeatureAnnotation[];
  sequenceLength: number;
}) {
  const topologyItems = domains.length
    ? domains.map((domain, index) => ({
        id: `${domain.id || domain.name}-${domain.start}-${domain.end}-${index}`,
        label: `T${index + 1}`,
        name: domain.name,
        start: domain.start,
        end: domain.end,
        source: domain.sourceDatabase,
        sourceUrl: domain.sourceUrl || `https://www.ebi.ac.uk/interpro/entry/InterPro/${domain.id}/`
      }))
    : (features.length ? features : accession === "P04637" ? tp53CuratedAnnotations : []).map((feature, index) => ({
        id: `${feature.description}-${feature.start}-${feature.end}-${index}`,
        label: `T${index + 1}`,
        name: feature.description || feature.type,
        start: feature.start ?? 1,
        end: feature.end ?? sequenceLength,
        source: feature.source || feature.type,
        sourceUrl: `https://www.uniprot.org/uniprotkb/${accession}/entry#features`
      }));
  const pagedTopology = useIncrementalList(topologyItems, 10);

  return (
    <aside id="domains" className="rounded-lg border border-teal-100 bg-white p-3 shadow-sm shadow-teal-900/5 scroll-mt-20 sm:p-4">
      <h2 className="text-sm font-semibold text-slate-900">Domain / Region Records</h2>
      <div className="mt-4">
        {topologyItems.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
                  <th className="p-2">Record</th>
                  <th className="p-2">Range</th>
                  <th className="p-2">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pagedTopology.visibleItems.map((domain) => (
                  <tr key={domain.id}>
                    <td className="p-2 font-medium text-slate-900">{domain.name}</td>
                    <td className="p-2 font-mono text-[11px] text-slate-600">{domain.start}-{domain.end}</td>
                    <td className="p-2 text-slate-500">
                      <a
                        href={domain.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:underline"
                        title={`Open source record for ${domain.name}`}
                      >
                        {domain.source}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagedTopology.hasMore && <div ref={pagedTopology.sentinelRef} className="h-8" aria-hidden="true" />}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
            No domain or region records are mapped in the current protein pack.
          </p>
        )}
      </div>
    </aside>
  );
}

interface ProteinFeatureAnnotation {
  type: string;
  description: string;
  start?: number;
  end?: number;
  source?: string;
}

const tp53CuratedAnnotations: ProteinFeatureAnnotation[] = [
  { type: "Region", description: "Transcription activation (acidic)", start: 1, end: 44, source: "UniProt feature annotation" },
  { type: "Region", description: "Disordered", start: 50, end: 96, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with WWOX", start: 66, end: 110, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with HIPK1", start: 100, end: 370, source: "UniProt feature annotation" },
  { type: "Region", description: "Required for interaction with ZNF385A", start: 100, end: 300, source: "UniProt feature annotation" },
  { type: "Region", description: "Required for interaction with FBXO42", start: 113, end: 236, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with AXIN1", start: 116, end: 292, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with the 53BP2 SH3 domain", start: 241, end: 248, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with E4F1", start: 256, end: 294, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with DNA", start: 273, end: 280, source: "UniProt feature annotation" },
  { type: "Region", description: "Disordered", start: 282, end: 325, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with CARM1", start: 300, end: 393, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with HIPK2", start: 319, end: 360, source: "UniProt feature annotation" },
  { type: "Region", description: "Oligomerization", start: 325, end: 356, source: "UniProt feature annotation" },
  { type: "Region", description: "Disordered", start: 351, end: 393, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with USP7", start: 359, end: 363, source: "UniProt feature annotation" },
  { type: "Region", description: "Basic (repression of DNA-binding)", start: 368, end: 387, source: "UniProt feature annotation" },
  { type: "Region", description: "Interaction with MORN3", start: 374, end: 393, source: "UniProt feature annotation" }
];

function SequenceTrack({
  accession,
  domains,
  features,
  sequence
}: {
  accession: string;
  domains: DomainAnnotation[];
  features: ProteinFeatureAnnotation[];
  sequence: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeAnnotationIndex, setActiveAnnotationIndex] = useState<number | null>(null);
  const annotationBlockRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const sequenceLength = Math.max(sequence.length, domains.at(-1)?.end ?? 0, 1);
  const annotationFeatures = features.length > 0 ? features : accession === "P04637" ? tp53CuratedAnnotations : [];
  const fullAnnotations = [
    ...domains.map((domain) => ({
      description: domain.name,
      start: domain.start,
      end: domain.end,
      source: domain.sourceDatabase
    })),
    ...annotationFeatures.map((feature) => ({
      description: feature.description || feature.type,
      start: feature.start,
      end: feature.end,
      source: feature.source || feature.type
    }))
  ].filter((item, index, all) => {
    const key = `${item.description}-${item.start}-${item.end}`;
    return all.findIndex((entry) => `${entry.description}-${entry.start}-${entry.end}` === key) === index;
  });
  const markers = [1, 50, 100, 150, 200, 250, 300, 350, sequenceLength].filter(
    (value, index, list) => value <= sequenceLength && list.indexOf(value) === index
  );
  const sequencePreview = sequence
    ? sequence.slice(0, 80).match(/.{1,10}/g)?.join("   ")
    : "Sequence will appear when UniProt data is loaded.";
  const sequenceBlocks = sequence
    ? sequence.match(/.{1,60}/g)?.map((line, index) => ({
        line,
        start: index * 60 + 1,
        end: index * 60 + line.length
      })) ?? []
    : [];
  const colors = ["bg-teal-500", "bg-blue-500", "bg-violet-500", "bg-emerald-500", "bg-cyan-600"];
  const activeAnnotation = activeAnnotationIndex === null ? null : fullAnnotations[activeAnnotationIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const selectAnnotation = (index: number) => {
    setActiveAnnotationIndex(index);
    window.setTimeout(() => {
      annotationBlockRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 40);
  };

  const annotationRowsForBlock = (blockStart: number, blockEnd: number) => {
    const laneEnds: number[] = [];
    return fullAnnotations
      .map((annotation, index) => ({
        annotation,
        index,
        start: Math.max(annotation.start ?? blockStart, blockStart),
        end: Math.min(annotation.end ?? annotation.start ?? blockStart, blockEnd)
      }))
      .filter((item) => item.end >= blockStart && item.start <= blockEnd)
      .sort((left, right) => left.start - right.start || left.end - right.end)
      .map((item) => {
        let lane = laneEnds.findIndex((end) => end < item.start);
        if (lane === -1) {
          lane = laneEnds.length;
          laneEnds.push(item.end);
        } else {
          laneEnds[lane] = item.end;
        }
        return { ...item, lane };
      });
  };

  return (
    <section className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Sequence & Domain Annotation</h2>
        <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-200 text-[10px] text-slate-500">i</span>
      </div>

      <div className="mt-4 grid gap-4 text-xs">
        <div className="grid gap-2 sm:grid-cols-[92px_minmax(0,1fr)] sm:items-center sm:gap-4">
          <span className="font-medium text-slate-500">Residue Position</span>
          <div className="max-w-full overflow-x-auto">
            <div className="relative h-6 min-w-[520px] border-b border-slate-200 sm:min-w-0">
              {markers.map((marker) => (
                <span
                  key={marker}
                  className="absolute top-0 -translate-x-1/2 text-[10px] text-slate-500"
                  style={{ left: `${((marker - 1) / Math.max(sequenceLength - 1, 1)) * 100}%` }}
                >
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <div className="grid min-w-[520px] gap-2 sm:min-w-0 sm:grid-cols-[92px_minmax(0,1fr)] sm:items-center sm:gap-4">
          <span className="font-medium text-slate-500">Domains</span>
          <div className="relative h-10">
            {domains.map((domain, index) => {
              const left = ((domain.start - 1) / sequenceLength) * 100;
              const width = ((domain.end - domain.start + 1) / sequenceLength) * 100;
              return (
                <div
                  key={`${domain.id || domain.name}-${domain.start}-${domain.end}-${index}`}
                  className="absolute top-1 flex h-6 items-center justify-center overflow-hidden rounded bg-teal-500 px-2 text-[10px] font-semibold text-white"
                  style={{ left: `${left}%`, width: `${Math.max(width, 7)}%` }}
                  title={`${domain.name} (${domain.start}-${domain.end})`}
                >
                  T{index + 1}
                </div>
              );
            })}
          </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
          <span className="font-medium text-slate-500">Sequence</span>
          <p className="max-w-full overflow-x-auto whitespace-nowrap rounded-md bg-slate-50 p-2 font-mono text-[11px] tracking-[0.14em] text-slate-700 sm:bg-transparent sm:p-0 sm:tracking-[0.18em]">
            {sequencePreview}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="justify-self-start text-xs font-semibold text-teal-700 hover:underline"
          >
            View full sequence
          </button>
        </div>
      </div>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-hidden bg-slate-950/35 p-2 pt-3 backdrop-blur-md sm:p-4 sm:pt-5"
          onMouseDown={() => {
            setActiveAnnotationIndex(null);
            setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-h-[calc(100vh-24px)] w-full max-w-[min(1500px,calc(100vw-12px))] overflow-hidden rounded-lg border border-teal-200 bg-white shadow-2xl shadow-slate-950/25 sm:max-h-[calc(100vh-40px)] sm:max-w-[min(1500px,calc(100vw-32px))]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-teal-100 bg-teal-50/70 px-3 py-3 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-950">Full Sequence & Annotation Record</h3>
                <p className="mt-1 text-xs text-slate-600">{accession} - {sequenceLength} residues</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
              >
                Close
              </button>
            </div>
            <div
              className="grid max-h-[calc(100vh-96px)] items-start gap-4 overflow-hidden p-3 sm:max-h-[calc(100vh-120px)] sm:p-5 xl:grid-cols-[minmax(0,1fr)_390px]"
              onMouseDown={(event) => {
                const target = event.target as HTMLElement;
                if (!target.closest("[data-region-item]") && !target.closest("[data-annotation-map]")) {
                  setActiveAnnotationIndex(null);
                }
              }}
            >
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 sm:p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Complete sequence with colored annotation map</p>
                {sequenceBlocks.length ? (
                  <div className="max-h-[calc(100vh-190px)] overflow-auto rounded-lg border border-slate-200 bg-white p-3 sm:max-h-[calc(100vh-230px)] sm:p-4">
                    <div className="grid gap-5">
                      {sequenceBlocks.map((block) => {
                        const blockAnnotations = annotationRowsForBlock(block.start, block.end);
                        const laneCount = Math.max(1, ...blockAnnotations.map((item) => item.lane + 1));
                        return (
                          <div key={block.start} className="min-w-[620px] rounded-md border border-slate-100 bg-slate-50/60 p-3 sm:min-w-[760px]">
                            <div className="grid grid-cols-[46px_minmax(0,1fr)_46px] items-end gap-2 sm:grid-cols-[64px_minmax(0,1fr)_64px] sm:gap-3">
                              <span className="font-mono text-[11px] font-semibold text-slate-500">{block.start}</span>
                              <div
                                className="grid border-b border-slate-200 pb-1"
                                style={{ gridTemplateColumns: `repeat(${block.line.length}, minmax(10px, 1fr))` }}
                              >
                                {block.line.split("").map((_, index) => {
                                  const residuePosition = block.start + index;
                                  return residuePosition === block.start || residuePosition % 10 === 0 || residuePosition === block.end ? (
                                    <span key={residuePosition} className="text-center text-[10px] font-medium text-slate-500">
                                      {residuePosition}
                                    </span>
                                  ) : (
                                    <span key={residuePosition} />
                                  );
                                })}
                              </div>
                              <span className="text-right font-mono text-[11px] font-semibold text-slate-500">{block.end}</span>
                            </div>

                            <div className="mt-2 grid grid-cols-[46px_minmax(0,1fr)_46px] items-center gap-2 sm:grid-cols-[64px_minmax(0,1fr)_64px] sm:gap-3">
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Seq</span>
                              <div
                                className="grid font-mono text-[12px] font-semibold text-slate-800"
                                style={{ gridTemplateColumns: `repeat(${block.line.length}, minmax(10px, 1fr))` }}
                              >
                                {block.line.split("").map((residue, index) => {
                                  const residuePosition = block.start + index;
                                  const residueIsActive = Boolean(
                                    activeAnnotation &&
                                    residuePosition >= (activeAnnotation.start ?? 0) &&
                                    residuePosition <= (activeAnnotation.end ?? 0)
                                  );
                                  return (
                                    <span
                                      key={`${block.start}-${index}`}
                                      className={`${index % 10 === 9 ? "border-r border-slate-200" : ""} rounded-sm text-center transition ${
                                        residueIsActive ? "bg-amber-200 text-slate-950 shadow-sm ring-1 ring-amber-500" : ""
                                      }`}
                                    >
                                      {residue}
                                    </span>
                                  );
                                })}
                              </div>
                              <span />
                            </div>

                            <div className="mt-2 grid grid-cols-[46px_minmax(0,1fr)_46px] gap-2 sm:grid-cols-[64px_minmax(0,1fr)_64px] sm:gap-3">
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">Map</span>
                              <div
                                className="relative rounded bg-white"
                                style={{ height: `${laneCount * 24 + 8}px` }}
                              >
                                {blockAnnotations.length ? (
                                  blockAnnotations.map((item) => {
                                    const left = ((item.start - block.start) / block.line.length) * 100;
                                    const width = ((item.end - item.start + 1) / block.line.length) * 100;
                                    const isActive = activeAnnotationIndex === item.index;
                                    return (
                                      <div
                                        ref={(node) => {
                                          if (node) annotationBlockRefs.current[item.index] = node;
                                        }}
                                        data-annotation-map
                                        key={`${item.annotation.description}-${item.index}-${block.start}`}
                                        className={`absolute flex h-5 cursor-pointer items-center justify-center overflow-hidden rounded px-1 text-[10px] font-semibold text-white transition-all ${colors[item.index % colors.length]} ${
                                          isActive ? "z-20 scale-y-125 shadow-[0_0_0_3px_rgba(251,191,36,0.55),0_0_22px_rgba(20,184,166,0.45)] ring-2 ring-amber-300" : "hover:brightness-110"
                                        }`}
                                        style={{
                                          left: `${Math.max(left, 0)}%`,
                                          top: `${item.lane * 24 + 4}px`,
                                          width: `${Math.max(width, 3)}%`
                                        }}
                                        title={`T${item.index + 1}: ${item.annotation.description} (${item.annotation.start}-${item.annotation.end})`}
                                        onMouseDown={(event) => {
                                          event.stopPropagation();
                                          selectAnnotation(item.index);
                                        }}
                                      >
                                        T{item.index + 1}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <div className="flex h-full items-center text-[11px] text-slate-400">No annotation in this residue block</div>
                                )}
                              </div>
                              <span />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-500">
                    Sequence is not stored in the current local pack. Search by UniProt accession while online to load the public sequence record.
                  </p>
                )}
              </div>
              <div className="self-start overflow-hidden rounded-lg border border-teal-100 bg-slate-50">
                <div className="border-b border-teal-100 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Regions & interactions</p>
                </div>
                <div className="max-h-[calc(100vh-170px)] divide-y divide-slate-100 overflow-y-auto bg-white sm:max-h-[calc(100vh-210px)]">
                  {fullAnnotations.length ? (
                    fullAnnotations.map((annotation, index) => (
                      <button
                        type="button"
                        data-region-item
                        key={`${annotation.description}-${index}`}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                          selectAnnotation(index);
                        }}
                        className={`grid w-full grid-cols-[38px_1fr] gap-3 px-4 py-3 text-left transition ${
                          activeAnnotationIndex === index ? "bg-amber-50 shadow-[inset_4px_0_0_rgb(20,184,166)]" : "hover:bg-teal-50/60"
                        }`}
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-md bg-teal-600 text-[11px] font-bold text-white">
                          T{index + 1}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">
                            {annotation.description} {annotation.start && annotation.end ? `(${annotation.start}-${annotation.end})` : ""}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-500">{annotation.source}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="p-4 text-xs text-slate-500">No region annotations are stored for this record.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export function FoldExplorerDashboard({ pack, intelligence }: FoldExplorerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"structures" | "domains" | "evolution" | "sources">("structures");
  const [browserMsa, setBrowserMsa] = useState<MsaSummary | null>(null);
  const sequence = pack.sequence.value || intelligence.protein.sequence;
  const status = pack.sourceBadges.some((badge) => /fallback/i.test(badge)) ? "Starter record" : "Reviewed";
  const effectiveIntelligence = useMemo<StructureIntelligencePack>(() => {
    if (!browserMsa || intelligence.msa.available) return intelligence;
    const meanConservation = browserMsa.conservationScores.length
      ? browserMsa.conservationScores.reduce((sum, score) => sum + score, 0) / browserMsa.conservationScores.length
      : 0;

    return {
      ...intelligence,
      msa: browserMsa,
      metrics: {
        ...intelligence.metrics,
        conservationSummary: {
          available: true,
          meanConservation,
          highlyConservedPositions: browserMsa.conservationScores
            .map((score, index) => (score >= 0.9 ? index + 1 : null))
            .filter((position): position is number => position !== null),
          method: browserMsa.method
        }
      }
    };
  }, [browserMsa, intelligence]);
  const tabItems = [
    { id: "structures", label: "Structures" },
    { id: "domains", label: "Domains" },
    { id: "evolution", label: "Evolution" },
    { id: "sources", label: "Sources" }
  ] as const;
  const downloadBlob = (filename: string, content: string, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };
  const exportPayload = () => ({
    exportedAt: new Date().toISOString(),
    app: "BioAlign-Pro-Protein-Structure",
    queryRecord: {
      accession: pack.accession,
      geneName: pack.geneName,
      proteinName: pack.proteinName,
      aliases: pack.aliases,
      organism: pack.organism
    },
    proteinPack: pack,
    structureIntelligence: effectiveIntelligence,
    browserMsa
  });
  const downloadRecord = () => {
    const payload = {
      ...exportPayload()
    };
    downloadBlob(`${pack.accession || "protein"}-bioalign-record.json`, JSON.stringify(payload, null, 2), "application/json");
  };
  const downloadFasta = () => {
    const wrapped = (sequence || "").match(/.{1,80}/g)?.join("\n") || "";
    downloadBlob(`${pack.accession || "protein"}.fasta`, `>${pack.accession}|${pack.geneName}|${pack.proteinName}\n${wrapped}\n`, "text/x-fasta");
  };
  const downloadFeatureCsv = () => {
    const rows = [
      ["type", "description", "start", "end", "source"],
      ...effectiveIntelligence.domains.map((domain) => [domain.type, domain.name, String(domain.start), String(domain.end), domain.sourceDatabase]),
      ...effectiveIntelligence.protein.features.map((feature) => [feature.type, feature.description, String(feature.start ?? ""), String(feature.end ?? ""), feature.source]),
      ...pack.domains.map((domain) => [domain.type, domain.name, String(domain.start ?? ""), String(domain.end ?? ""), domain.source ?? "Protein pack"]),
      ...pack.motifs.map((motif) => [motif.type, motif.name, String(motif.start ?? ""), String(motif.end ?? ""), motif.source ?? "Protein pack"])
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadBlob(`${pack.accession || "protein"}-features.csv`, `${csv}\n`, "text/csv");
  };
  const downloadSources = () => {
    const links = databaseLinks(pack, effectiveIntelligence);
    const lines = [
      `BioAlign-Pro-Protein-Structure source list for ${pack.accession}`,
      `UniProtKB: ${links.uniprot}`,
      `RCSB PDB: ${links.rcsb}`,
      `AlphaFold DB: ${links.alphafold}`,
      `InterPro/Pfam: ${links.interpro}`,
      `UniProt feature viewer: ${links.featureViewer}`,
      `UniProt variants: ${links.uniprotVariants}`,
      `ClinVar: ${links.clinvar}`,
      `PDB-REDO: ${links.pdbRedo}`
    ];
    downloadBlob(`${pack.accession || "protein"}-sources.txt`, `${lines.join("\n")}\n`);
  };

  return (
    <div className="research-dashboard space-y-4 sm:space-y-5">
      <div id="overview" className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between scroll-mt-20">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="min-w-0 break-words text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{pack.proteinName || pack.geneName}</h1>
          <Badge variant="outline" className="h-9 rounded-lg border-teal-200 bg-white px-4 text-sm font-semibold">
            {pack.geneName || pack.accession}
          </Badge>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <button
            type="button"
            onClick={downloadRecord}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-teal-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm hover:bg-teal-50"
          >
            <Download className="h-3.5 w-3.5" />
            JSON
          </button>
          <button type="button" onClick={downloadFasta} className="inline-flex h-9 min-w-0 items-center justify-center rounded-lg border border-teal-200 bg-white px-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-teal-50 sm:px-3">
            FASTA
          </button>
          <button type="button" onClick={downloadFeatureCsv} className="inline-flex h-9 min-w-0 items-center justify-center rounded-lg border border-teal-200 bg-white px-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-teal-50 sm:px-3" title="Download features CSV">
            <span className="sm:hidden">Features</span>
            <span className="hidden sm:inline">Features CSV</span>
          </button>
          <button type="button" onClick={downloadSources} className="inline-flex h-9 min-w-0 items-center justify-center rounded-lg border border-teal-200 bg-white px-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-teal-50 sm:px-3">
            Sources
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Organism" value={pack.organism.scientificName || "Unknown"} source="UniProtKB organism record" />
        <SummaryCard label="UniProt ID" value={pack.accession} source="UniProtKB accession" />
        <SummaryCard label="Length" value={`${pack.sequence.length || intelligence.protein.length} aa`} source="Canonical sequence length" />
        <SummaryCard label="Feature records" value={`${intelligence.protein.features.length || intelligence.domains.length || pack.domains.length}`} source="UniProt / InterPro feature records" />
      </div>

      <StructureInterpretationLayer pack={pack} intelligence={effectiveIntelligence} />
      <DatabaseRecordPanel pack={pack} intelligence={effectiveIntelligence} browserMsa={browserMsa} />

      <div className="grid gap-5 xl:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
        <QualityRail intelligence={effectiveIntelligence} />
        <div>
          <span id="structure-route" className="block h-0 scroll-mt-20" aria-hidden="true" />
          <div className="evidence-tab-shell">
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div
                className="evidence-tab-list"
                role="navigation"
                aria-label="Protein evidence sections"
              >
                {tabItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                    }}
                    aria-selected={activeTab === item.id}
                    className={
                      activeTab === item.id
                        ? "evidence-tab-button evidence-tab-button-active"
                        : "evidence-tab-button"
                    }
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <Badge variant={status === "Reviewed" ? "success" : "outline"} className="h-9 shrink-0 justify-center rounded-lg px-3">
                <ShieldCheck className="mr-1 h-3 w-3" />
                {status}
              </Badge>
            </div>
          </div>
          <div className="mt-3 min-w-0">
            {activeTab === "structures" && (
              <div id="structure-viewer" className="scroll-mt-20">
                <StructureViewerGate pack={pack} title="Structure Records" />
              </div>
            )}
            {activeTab === "domains" && (
              <DomainTopology
                accession={pack.accession}
                domains={intelligence.domains}
                features={intelligence.protein.features}
                sequenceLength={pack.sequence.length || intelligence.protein.length}
              />
            )}
            {activeTab === "evolution" && (
              <EvolutionPanel
                msa={intelligence.msa}
                accession={pack.accession}
                geneName={pack.geneName}
                sequence={sequence}
                onMsaLoaded={setBrowserMsa}
              />
            )}
            {activeTab === "sources" && (
              <SourcesProvenance intelligence={intelligence} browserMsa={browserMsa} />
            )}
          </div>
        </div>
      </div>

      <SequenceTrack
        accession={pack.accession}
        domains={intelligence.domains}
        features={intelligence.protein.features}
        sequence={sequence}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <ExperimentalStructureDetails pack={pack} intelligence={effectiveIntelligence} />
        <AlphaFoldConfidencePanel pack={pack} intelligence={effectiveIntelligence} />
      </div>

      <FeatureClassesPanel pack={pack} intelligence={effectiveIntelligence} />
      <DiseaseInteractionPanel pack={pack} intelligence={effectiveIntelligence} />
      <SourceConfidencePanel pack={pack} intelligence={effectiveIntelligence} browserMsa={browserMsa} />

      <section id="function" className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm shadow-teal-900/5 scroll-mt-20">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">Function & Evidence</h2>
        <div className="mt-4 grid gap-3">
          {intelligence.protein.functionComments.length ? (
            intelligence.protein.functionComments.map((comment, index) => (
              <div key={index} className="flex gap-2 rounded-lg border border-teal-100 bg-teal-50/40 p-3 text-xs leading-5 text-slate-700">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                <p>{comment}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://www.uniprot.org/uniprotkb/${pack.accession}/entry`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50"
              >
                Open UniProt function record
              </a>
              {pack.pdbStructures[0]?.pdbId && (
                <a
                  href={`https://www.rcsb.org/structure/${pack.pdbStructures[0].pdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50"
                >
                  Open RCSB structure record
                </a>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
