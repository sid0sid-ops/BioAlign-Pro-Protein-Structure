"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIncrementalList } from "@/hooks/use-incremental-list";
import { withBasePath } from "@/lib/utils";
import type { MsaSummary, StructureIntelligencePack } from "@/lib/structure-intelligence/types";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

interface SourceRow {
  name: string;
  desc: string;
  status: string;
  variant: BadgeVariant;
  id: string;
  url?: string;
  artifacts?: string[];
}

export function SourcesProvenance({ intelligence, browserMsa }: { intelligence: StructureIntelligencePack; browserMsa?: MsaSummary | null }) {
  const tmScore = intelligence.metrics.tmScoreComparisons.find((metric) => metric.available);
  const rmsd = intelligence.metrics.rmsdComparisons.find((metric) => metric.available);
  const msa = intelligence.msa.available ? intelligence.msa : browserMsa;
  const sources: SourceRow[] = [
    {
      name: "UniProtKB",
      desc: "Sequence, gene identity, functional comments",
      status: "Verified",
      variant: "success",
      id: intelligence.protein.accession,
      url: `https://www.uniprot.org/uniprotkb/${intelligence.protein.accession}`
    },
    {
      name: "RCSB PDB",
      desc: "Experimental high-resolution structure templates",
      status: intelligence.structures.experimental.length > 0 ? "Available" : "No Records",
      variant: intelligence.structures.experimental.length > 0 ? "success" : "outline",
      id: intelligence.structures.experimental.map((s) => s.pdbId).join(", ") || "None",
      url: intelligence.structures.experimental.length > 0 
        ? `https://www.rcsb.org/structure/${intelligence.structures.experimental[0].pdbId}`
        : undefined
    },
    {
      name: "AlphaFold DB",
      desc: "Deep learning 3D coordinate predictions & scores",
      status: intelligence.structures.predicted.length > 0 ? "Available" : "No Records",
      variant: intelligence.structures.predicted.length > 0 ? "success" : "outline",
      id: intelligence.structures.predicted[0]?.modelId || "None",
      url: intelligence.structures.predicted[0]?.modelUrl
    },
    {
      name: "InterPro / Pfam",
      desc: "Sequence signature & domain annotations",
      status: intelligence.domains.length > 0 ? "Available" : "No Records",
      variant: intelligence.domains.length > 0 ? "success" : "outline",
      id: `${intelligence.domains.length} domains`,
      url: `https://www.ebi.ac.uk/interpro/protein/UniProt/${intelligence.protein.accession}`
    },
    ...(browserMsa
      ? [
          {
            name: "UniProtKB homolog search",
            desc: "Reviewed homolog sequences used for browser-side MSA and residue conservation",
            status: "Available",
            variant: "success" as const,
            id: `${browserMsa.sourceSequenceCount} sequences`,
            url: `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(`(gene_exact:${intelligence.protein.gene}) AND reviewed:true`)}`
          }
        ]
      : []),
    {
      name: "Build-time Pipeline",
      desc: [
        msa ? `${msa.sourceSequenceCount} aligned sequence(s)` : null,
        intelligence.metrics.plddt.available ? `pLDDT mean ${intelligence.metrics.plddt.mean.toFixed(1)}` : null,
        tmScore ? `TM-score ${tmScore.tmScore.toFixed(3)}` : null,
        rmsd ? `RMSD ${rmsd.rmsd.toFixed(2)} A` : null
      ].filter(Boolean).join(" / ") || "Static records packaged; computed artifacts load only when available.",
      status: tmScore || rmsd || msa ? "Computed" : "Partial",
      variant: tmScore || rmsd || msa ? "success" : "warning",
      id: intelligence.generatedAt ? new Date(intelligence.generatedAt).toLocaleDateString() : "Build-time",
      artifacts: [
        msa ? `MSA: ${msa.method}` : null,
        tmScore ? `Superposition: ${tmScore.method}` : null,
        intelligence.metrics.pae.available ? `PAE matrix: ${intelligence.metrics.pae.matrixSize} residues` : null,
        `Static JSON: ${intelligence.protein.accession}`
      ].filter((artifact): artifact is string => Boolean(artifact))
    },
    {
      name: "Offline static bundle",
      desc: "Selected starter protein packs, structure-intelligence JSON, search indexes, and compressed copies cached for GitHub Pages use",
      status: "Packaged",
      variant: "success",
      id: "19 selected records",
      url: withBasePath("/data/starter-proteins.json")
    }
  ];
  const pagedSources = useIncrementalList(sources, 10);

  return (
    <div id="sources" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Sources & Provenance</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Original bioinformatics databases and tools accessed</p>

      <div className="grid gap-2 md:hidden">
        {pagedSources.visibleItems.map((src) => (
          <div key={src.name} className="rounded-lg border border-border bg-white p-3 text-xs">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-800">{src.name}</p>
              <Badge variant={src.variant} className="px-1.5 py-0 text-[9px]">{src.status}</Badge>
            </div>
            <p className="mt-2 break-words font-mono text-[10px] text-slate-600">{src.id}</p>
            <p className="mt-2 leading-5 text-muted-foreground">{src.desc}</p>
            {src.artifacts?.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {src.artifacts.map((artifact) => (
                  <span key={artifact} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">{artifact}</span>
                ))}
              </div>
            ) : null}
            {src.url ? (
              <a href={src.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
                Open <ArrowUpRight className="h-3 w-3" />
              </a>
            ) : null}
          </div>
        ))}
        {pagedSources.hasMore && <div ref={pagedSources.sentinelRef} className="h-8" aria-hidden="true" />}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <th className="p-3">Source Database</th>
              <th className="p-3">Reference / Key</th>
              <th className="p-3">Status</th>
              <th className="p-3">Data Contributed</th>
              <th className="p-3 text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-xs">
            {pagedSources.visibleItems.map((src) => (
              <tr key={src.name} className="hover:bg-slate-50/30 transition-colors">
                <td className="p-3 font-semibold text-slate-800">{src.name}</td>
                <td className="p-3 font-mono text-[10px] text-slate-600 max-w-[150px] truncate" title={src.id}>{src.id}</td>
                <td className="p-3">
                  <Badge variant={src.variant} className="text-[9px] px-1.5 py-0">
                    {src.status}
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground text-[11px]">
                  <p>{src.desc}</p>
                  {src.artifacts?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {src.artifacts.map((artifact) => (
                        <span key={artifact} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">{artifact}</span>
                      ))}
                    </div>
                  ) : null}
                </td>
                <td className="p-3 text-right">
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary hover:underline font-medium text-[11px]">
                      Open <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground/60">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pagedSources.hasMore && <div ref={pagedSources.sentinelRef} className="h-8" aria-hidden="true" />}
      </div>
    </div>
  );
}
