"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

interface SourceRow {
  name: string;
  desc: string;
  status: string;
  variant: BadgeVariant;
  id: string;
  url?: string;
}

export function SourcesProvenance({ intelligence }: { intelligence: StructureIntelligencePack }) {
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
    {
      name: "Build-time Pipeline",
      desc: "MSA alignments, profiles, metric validation",
      status: "Computed",
      variant: "default",
      id: `V1.0.0`,
      url: undefined
    }
  ];

  return (
    <div id="sources" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Sources & Provenance</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Original bioinformatics databases and tools accessed</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
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
            {sources.map((src, idx) => (
              <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                <td className="p-3 font-semibold text-slate-800">{src.name}</td>
                <td className="p-3 font-mono text-[10px] text-slate-600 max-w-[150px] truncate" title={src.id}>{src.id}</td>
                <td className="p-3">
                  <Badge variant={src.variant} className="text-[9px] px-1.5 py-0">
                    {src.status}
                  </Badge>
                </td>
                <td className="p-3 text-muted-foreground text-[11px]">{src.desc}</td>
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
      </div>
    </div>
  );
}
