"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { RadialMeter } from "@/components/ui/radial-meter";
import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";
import { computeQC, computeRC, computeMC, computeSC, computeOF, type ScoreResult } from "@/lib/structure-intelligence/score-utils";
import { cn } from "@/lib/utils";

function ScoreTile({ code, title, score, color }: { code: string; title: string; score: ScoreResult; color: string }) {
  return (
    <div className="score-tile bio-card-hover">
      <div className="score-tile-header flex items-center gap-2">
        <span className={cn("inline-block h-2 w-2 rounded-full", color)} />
        <span>{code}</span>
      </div>
      <div className="p-4">
        <p className="text-[11px] text-muted-foreground">{title}</p>
        {score.available && score.value !== null ? (
          <div className="mt-2 flex items-end gap-2">
            <RadialMeter value={score.value} max={100} label="" size={64} strokeWidth={5} colorScale="teal" />
            <div className="mb-1">
              <p className="text-lg font-bold">{score.value}<span className="text-xs font-normal text-muted-foreground">/100</span></p>
              <p className="text-[10px] text-muted-foreground">{score.label}</p>
            </div>
          </div>
        ) : score.available && score.value === null ? (
          <div className="mt-3">
            <p className="text-sm font-semibold text-amber-600">Partial Evidence</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{score.reason}</p>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-xl font-bold text-muted-foreground/50">—</p>
            <p className="mt-1 text-[10px] leading-snug text-muted-foreground">{score.reason}</p>
          </div>
        )}
        <button className="mt-3 text-[10px] font-medium text-primary hover:underline">Learn more about {code}</button>
      </div>
    </div>
  );
}

export function ScoresDashboard({ intelligence }: { intelligence: StructureIntelligencePack }) {
  const qc = useMemo(() => computeQC(intelligence), [intelligence]);
  const rc = useMemo(() => computeRC(intelligence), [intelligence]);
  const mc = useMemo(() => computeMC(intelligence), [intelligence]);
  const sc = useMemo(() => computeSC(intelligence), [intelligence]);
  const of = useMemo(() => computeOF(qc, rc, mc, sc, intelligence), [qc, rc, mc, sc, intelligence]);

  return (
    <div id="scores" className="scroll-mt-20">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Scores Dashboard</h2>
          <p className="text-[11px] text-muted-foreground">Model quality and reliability summary</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <ScoreTile code="QC" title="Quality Check" score={qc} color="bg-blue-500" />
        <ScoreTile code="RC" title="Residue Conservation" score={rc} color="bg-emerald-500" />
        <ScoreTile code="MC" title="Model Confidence" score={mc} color="bg-teal-500" />
        <div className="score-tile bio-card-hover">
          <div className="score-tile-header flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
            <span>PAE Summary</span>
          </div>
          <div className="p-4">
            <p className="text-[11px] text-muted-foreground">Predicted Aligned Error</p>
            {intelligence.metrics.pae.available ? (
              <div className="mt-2">
                <p className="text-lg font-bold">{intelligence.metrics.pae.meanPae.toFixed(1)}<span className="text-xs font-normal text-muted-foreground"> Å</span></p>
                <p className="text-[10px] text-muted-foreground">Lower values (blue) are better.</p>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-xl font-bold text-muted-foreground/50">—</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{intelligence.metrics.pae.reason}</p>
              </div>
            )}
            <button className="mt-3 text-[10px] font-medium text-primary hover:underline">Learn more about PAE</button>
          </div>
        </div>
        <ScoreTile code="SC" title="Structural Conservation" score={sc} color="bg-amber-500" />
        <ScoreTile code="OF" title="Overall Fold" score={of} color="bg-rose-500" />
      </div>
    </div>
  );
}
