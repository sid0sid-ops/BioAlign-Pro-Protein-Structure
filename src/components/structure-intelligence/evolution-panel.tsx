"use client";

import { Badge } from "@/components/ui/badge";
import type { MsaSummary } from "@/lib/structure-intelligence/types";

export function EvolutionPanel({ msa }: { msa: MsaSummary }) {
  return (
    <div id="evolution" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Evolution (MSA)</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Multiple Sequence Alignment & evolutionary conservation</p>

      {!msa.available ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <h3 className="text-xs font-bold text-amber-800">MSA & Conservation Data Unavailable</h3>
          </div>
          <p className="mt-2 text-xs text-amber-700 leading-relaxed">
            Multiple Sequence Alignment (MSA) was not executed for this protein during the static pack generation pipeline.
            We strictly enforce scientific honesty and do not display synthetic or faked metrics.
          </p>

          <div className="mt-3 border-t border-amber-200/60 pt-3">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Required Environment Setup:</span>
            <p className="mt-1 text-[11px] text-amber-700 leading-snug">
              To enable evolutionary conservation scores, install bioinformatics aligners (e.g. <span className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-[10px]">mafft</span>, <span className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-[10px]">clustalo</span>, or <span className="font-mono bg-amber-100/60 px-1 py-0.5 rounded text-[10px]">muscle</span>) on your system, configure them in the build scripts, and rerun the build command.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">MSA Active</Badge>
            <Badge variant="outline">{msa.method}</Badge>
            <Badge variant="outline">{msa.sourceSequenceCount} Sequences</Badge>
          </div>

          <div className="rounded border border-border bg-slate-50/50 p-3 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Consensus Sequence Preview:</span>
            <p className="font-mono text-xs text-slate-700 break-all bg-white p-2 border border-border/60 rounded">
              {msa.consensus.slice(0, 180)}...
            </p>
          </div>

          {/* Simple alignment preview table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-50/50 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-2">Identifier</th>
                  <th className="p-2">Aligned Sequence Segment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono text-xs">
                {msa.alignedSequences.slice(0, 5).map((seq) => (
                  <tr key={seq.id} className="hover:bg-slate-50/30">
                    <td className="p-2 font-semibold text-slate-800 text-[10px]">{seq.label}</td>
                    <td className="p-2 text-slate-600 break-all text-[11px] select-all whitespace-nowrap overflow-x-auto max-w-[400px] block">
                      {seq.sequence.slice(0, 50)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
