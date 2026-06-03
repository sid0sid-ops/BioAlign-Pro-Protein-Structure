"use client";

import { Brain, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLDDTViewer } from "@/components/ui/plddt-viewer";
import { PAEMatrixViewer } from "@/components/ui/pae-matrix-viewer";
import { RadialMeter } from "@/components/ui/radial-meter";
import { AnimatedScoreBar } from "@/components/ui/animated-score-bar";
import { confidenceSeries } from "@/modules/shared/mock-data";

export function AlphaFoldPanel() {
  const plddtValues = confidenceSeries.map((point) => point.plddt);
  const paeSize = Math.min(plddtValues.length, 50);
  const mockPae = Array.from({ length: paeSize }, (_, i) =>
    Array.from({ length: paeSize }, (_, j) => 2 + Math.abs(Math.cos((i - j) / 5) * 8) + Math.random() * 2)
  );

  const avgPlddt =
    plddtValues.length > 0
      ? Math.round((plddtValues.reduce((a, b) => a + b, 0) / plddtValues.length) * 10) / 10
      : 86.4;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-500" />
            AlphaFold Confidence Viewer
          </CardTitle>
          <CardDescription>
            Static confidence visualization using browser-local demo data. This panel does not contact AlphaFold DB after deployment.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Avg pLDDT {avgPlddt}</Badge>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Static report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <PLDDTViewer values={plddtValues} height={180} />
          <PAEMatrixViewer paeData={mockPae} />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-border bg-background/55 p-4">
            <RadialMeter value={avgPlddt} label="pLDDT" sublabel="avg" colorScale="auto" size={110} />
            <RadialMeter value={Math.round(avgPlddt * 0.9)} label="Confidence" sublabel="struct" colorScale="violet" size={110} />
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-background/55 p-4">
            <p className="text-sm font-semibold">AlphaFold Metrics</p>
            <AnimatedScoreBar value={avgPlddt} max={100} label="Avg pLDDT" colorScale="blue" />
            <AnimatedScoreBar
              value={(plddtValues.filter((value) => value >= 90).length / plddtValues.length) * 100}
              max={100}
              label="High confidence %"
              colorScale="teal"
            />
            <AnimatedScoreBar
              value={(plddtValues.filter((value) => value < 50).length / plddtValues.length) * 100}
              max={100}
              label="Low confidence %"
              colorScale="rose"
            />
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-2 text-sm font-semibold">Model Information</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Mode: static browser demonstration</p>
              <p>Source: bundled confidence series</p>
              <p>Runtime: no backend, no API key, no server dependency</p>
              <p>Note: BioAlign-Pro-Protein-Structure does not claim browser-side structure prediction here.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
