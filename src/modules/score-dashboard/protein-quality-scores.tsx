"use client";

import { Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialMeter } from "@/components/ui/radial-meter";
import { MetricRing } from "@/components/ui/metric-ring";
import { AnimatedScoreBar } from "@/components/ui/animated-score-bar";

interface ProteinQualityScoresProps {
  rmsd?: number;
  tmScore?: number;
  plddt?: number;
  sequenceIdentity?: number;
  coverage?: number;
  clashscore?: number;
}

export function ProteinQualityScores({
  rmsd = 1.82, tmScore = 0.87, plddt = 86.4,
  sequenceIdentity = 68, coverage = 91, clashscore = 4.1,
}: ProteinQualityScoresProps) {
  const qc = Math.round(Math.max(0, 100 - clashscore * 5));
  const rc = Math.round(sequenceIdentity * 0.9);
  const mc = Math.round(plddt);
  const sc = Math.round(tmScore * 100);
  const of = Math.round((qc + rc + mc + sc) / 4);

  return (
    <Card className="animated-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Protein Quality Scores
        </CardTitle>
        <CardDescription>
          Composite quality metrics: QC (Quality Check), RC (Residue Conservation), MC (Model Confidence), SC (Structural Conservation), OF (Overall Fold)
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <RadialMeter value={qc} label="QC" sublabel="Quality" colorScale="teal" size={100} />
          <RadialMeter value={rc} label="RC" sublabel="Residue" colorScale="blue" size={100} />
          <RadialMeter value={mc} label="MC" sublabel="Model" colorScale="violet" size={100} />
          <RadialMeter value={sc} label="SC" sublabel="Structure" colorScale="amber" size={100} />
          <RadialMeter value={of} label="OF" sublabel="Overall" colorScale="auto" size={130} strokeWidth={10} />
        </div>
        <div className="space-y-4">
          <MetricRing metrics={[
            { label: "QC", value: qc, color: "#14b8a6" },
            { label: "RC", value: rc, color: "#3b82f6" },
            { label: "MC", value: mc, color: "#8b5cf6" },
            { label: "SC", value: sc, color: "#f59e0b" },
            { label: "OF", value: of, color: "#f43f5e" },
          ]} size={140} />
          <div className="space-y-2 rounded-lg border border-border bg-background/55 p-4">
            <AnimatedScoreBar value={rmsd} max={5} label="RMSD" sublabel="Å" colorScale="teal" />
            <AnimatedScoreBar value={tmScore * 100} max={100} label="TM-score" sublabel="%" colorScale="blue" />
            <AnimatedScoreBar value={plddt} max={100} label="pLDDT" sublabel="" colorScale="violet" />
            <AnimatedScoreBar value={sequenceIdentity} max={100} label="Seq. Identity" sublabel="%" colorScale="amber" />
            <AnimatedScoreBar value={coverage} max={100} label="Coverage" sublabel="%" colorScale="gradient" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
