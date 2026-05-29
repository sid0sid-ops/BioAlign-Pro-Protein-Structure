"use client";

import { GitBranch, Microscope, ScanSearch } from "lucide-react";
import { Sankey, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { useWorkbenchStore } from "@/store/workbench-store";
import { templateHits as mockTemplateHits } from "@/modules/shared/mock-data";

const sankeyData = {
  nodes: [
    { name: "Target Fold" },
    { name: "Globin-like" },
    { name: "Rossmann-like" },
    { name: "Remote Scaffold" },
    { name: "Homology Model" },
    { name: "Threading Review" }
  ],
  links: [
    { source: 0, target: 1, value: 68 },
    { source: 0, target: 2, value: 42 },
    { source: 0, target: 3, value: 19 },
    { source: 1, target: 4, value: 60 },
    { source: 2, target: 5, value: 24 },
    { source: 3, target: 5, value: 18 }
  ]
};

export function FoldseekPanel() {
  const { analysisResults } = useWorkbenchStore();
  const homologyData = analysisResults["homology"]?.data;
  const hits = (homologyData?.hits ?? mockTemplateHits).slice(0, 3);

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Foldseek Structural Search</CardTitle>
          <CardDescription>
            Fast fold similarity routing, template matching, domain discovery, and structural neighbors.
          </CardDescription>
        </div>
        <Badge variant="outline">Service Adapter Ready</Badge>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3">
          {hits.map((hit: any, index: number) => {
            const fsScore = hit.foldseekScore ?? (0.9 - index * 0.1);
            return (
              <div key={hit.id ?? hit.pdbId} className="rounded-lg border border-border bg-background/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                      {index === 0 ? <ScanSearch className="h-4 w-4" /> : index === 1 ? <GitBranch className="h-4 w-4" /> : <Microscope className="h-4 w-4" />}
                    </span>
                    <span>
                      <p className="text-sm font-semibold">{hit.pdbId} structural neighbor</p>
                      <p className="text-xs text-muted-foreground">{hit.title}</p>
                    </span>
                  </span>
                  <Badge variant={fsScore > 0.8 ? "success" : "outline"}>
                    {Math.round(fsScore * 100)}
                  </Badge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.round(fsScore * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="rounded-lg border border-border bg-background/55 p-4">
          <p className="mb-3 text-sm font-semibold">Fold routing Sankey</p>
          <div className="h-72">
            <ClientOnlyChart>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <Sankey data={sankeyData} nodePadding={18} nodeWidth={12} link={{ stroke: "#3b82f6" }}>
                  <RechartsTooltip />
                </Sankey>
              </ResponsiveContainer>
            </ClientOnlyChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
