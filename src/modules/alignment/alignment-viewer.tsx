"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { alignmentRows as mockAlignmentRows } from "@/modules/shared/mock-data";
import { useWorkbenchStore } from "@/store/workbench-store";

const annotationColor: Record<string, string> = {
  helix: "bg-blue-500/15 text-blue-500",
  sheet: "bg-teal-500/15 text-teal-500",
  turn: "bg-amber-500/15 text-amber-500",
  domain: "bg-violet-500/15 text-violet-500",
  gap: "bg-slate-500/15 text-slate-500",
  mutation: "bg-rose-500/15 text-rose-500"
};

export function AlignmentViewer() {
  const { analysisResults } = useWorkbenchStore();
  const homologyData = analysisResults["homology"]?.data;
  const alignmentRows = homologyData?.alignments ?? mockAlignmentRows;

  // Compute stats based on alignment
  const identity = homologyData?.bestIdentity ?? 68;
  const coverage = homologyData?.coverage ?? 91;
  const gaps = homologyData?.gaps ?? 2;

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle>Sequence Alignment</CardTitle>
          <CardDescription>Residue identity, domains, secondary structure, and mutation markers.</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Identity {identity}%</Badge>
          <Badge variant="outline">Coverage {coverage}%</Badge>
          <Badge variant="outline">Gaps {gaps}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="hide-scrollbar overflow-x-auto rounded-lg border border-border bg-background/55 p-4">
          <div className="min-w-[860px] space-y-5">
            {alignmentRows.map((row: any) => (
              <div key={row.label} className="grid grid-cols-[6rem_1fr] gap-4">
                <div className="pt-1 text-xs font-semibold text-muted-foreground">{row.label}</div>
                <div>
                  <div className="grid grid-cols-[repeat(92,minmax(0,1fr))] gap-0.5 font-mono text-[10px]">
                    {row.sequence.split("").map((residue: string, index: number) => {
                      const isMismatch =
                        alignmentRows[0].sequence[index] && alignmentRows[0].sequence[index] !== residue;
                      return (
                        <span
                          key={`${row.label}-${index}`}
                          className={`flex h-6 items-center justify-center rounded-sm ${
                            isMismatch ? "bg-danger/15 text-danger" : "bg-primary/8 text-foreground"
                          }`}
                        >
                          {residue}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.annotations?.map((annotation: any) => (
                      <span
                        key={`${row.label}-${annotation.label}`}
                        className={`rounded-md px-2 py-1 text-xs ${annotationColor[annotation.type] ?? "bg-slate-500/10"}`}
                      >
                        {annotation.label}: {annotation.start}-{annotation.end}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
