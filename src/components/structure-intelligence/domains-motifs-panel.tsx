"use client";

import type { DomainAnnotation } from "@/lib/structure-intelligence/types";

const domainColors = [
  "bg-teal-500",
  "bg-violet-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-indigo-500",
];

export function DomainsMotifsPanel({ domains, sequenceLength }: { domains: DomainAnnotation[]; sequenceLength: number }) {
  return (
    <div id="domains" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Domains & Motifs</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Structural and functional sequence segments</p>

      {domains.length === 0 ? (
        <div className="rounded bg-slate-50 p-4 text-center border border-border">
          <p className="text-xs text-muted-foreground">No domain annotations available for this protein.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Timeline representation */}
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Sequence Timeline Mapping (1 - {sequenceLength} aa)</span>
            <div className="domain-timeline">
              {domains.map((dom, idx) => {
                const startPct = (dom.start / sequenceLength) * 100;
                const endPct = (dom.end / sequenceLength) * 100;
                const widthPct = endPct - startPct;
                const color = domainColors[idx % domainColors.length];

                return (
                  <div
                    key={dom.id}
                    className={`domain-segment ${color} opacity-85 hover:opacity-100 transition-opacity cursor-help`}
                    style={{ left: `${startPct}%`, width: `${Math.max(widthPct, 1.5)}%` }}
                    title={`${dom.name} (${dom.start}-${dom.end}): ${dom.description}`}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {domains.map((dom, idx) => {
                const color = domainColors[idx % domainColors.length].replace("bg-", "text-");
                return (
                  <span key={dom.id} className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700">
                    <span className={`inline-block h-2 w-2 rounded-full ${domainColors[idx % domainColors.length]}`} />
                    {dom.name} ({dom.start}-{dom.end})
                  </span>
                );
              })}
            </div>
          </div>

          {/* Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-50/50 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="p-2">Name</th>
                  <th className="p-2">Database</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Range</th>
                  <th className="p-2">Evidence / Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs">
                {domains.map((dom, idx) => (
                  <tr key={dom.id} className="hover:bg-slate-50/30">
                    <td className="p-2 font-semibold text-slate-800 flex items-center gap-1.5">
                      <span className={`inline-block h-2 w-2 rounded-full ${domainColors[idx % domainColors.length]}`} />
                      {dom.name}
                    </td>
                    <td className="p-2 text-slate-600 font-mono text-[10px]">{dom.sourceDatabase}</td>
                    <td className="p-2"><span className="capitalize">{dom.type}</span></td>
                    <td className="p-2 text-slate-700 font-medium">{dom.start} - {dom.end}</td>
                    <td className="p-2 text-muted-foreground text-[11px] leading-snug">{dom.description} · <span className="italic">{dom.evidence}</span></td>
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
