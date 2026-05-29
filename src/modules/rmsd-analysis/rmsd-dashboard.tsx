"use client";

import * as d3 from "d3";
import { Activity, FileDown, GitCompareArrows, ImageDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { RadialMeter } from "@/components/ui/radial-meter";
import { AnimatedScoreBar } from "@/components/ui/animated-score-bar";
import { ScoreCard } from "@/components/ui/score-card";
import { rmsdSeries } from "@/modules/shared/mock-data";

export function RmsdDashboard() {
  const colorScale = d3.scaleSequential(d3.interpolateTurbo).domain([0, 1.5]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Structural Analytics</CardTitle>
          <CardDescription>
            RMSD, TM-score, residue deviation, conservation, sequence similarity, alignment scoring, and exportable metrics.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <ImageDown className="h-4 w-4" />
            Screenshot
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* ─── Score Cards Row ─────────────────────────────────────── */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ScoreCard icon={Activity} label="RMSD" value="1.82 Å" trend="-0.34 Å" trendDirection="down" variant="success" description="Root mean square deviation between template and model backbone" />
          <ScoreCard icon={TrendingUp} label="TM-score" value="0.87" trend="+0.12" trendDirection="up" variant="accent" description="Template Modeling score (1.0 = identical fold)" />
          <ScoreCard icon={Activity} label="Q-score" value="0.82" variant="default" description="Quality of structural alignment" />
          <ScoreCard icon={Activity} label="Clashscore" value="4.1" trend="Low" trendDirection="neutral" variant="warning" description="Number of steric clashes per 1000 atoms" />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          {/* ─── RMSD Chart ─────────────────────────────────────────── */}
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">RMSD and structural deviation</p>
              <Badge variant="success">RMSD 1.82 Å</Badge>
            </div>
            <div className="h-72">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <LineChart data={rmsdSeries}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="residue" tickLine={false} axisLine={false} fontSize={11} />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="reference" stroke="#14b8a6" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="model" stroke="#3b82f6" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="deviation" stroke="#f43f5e" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>

          <div className="grid gap-4">
            {/* ─── Deviation Heatmap ──────────────────────────────────── */}
            <div className="rounded-lg border border-border bg-background/55 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <GitCompareArrows className="h-4 w-4 text-primary" />
                Residue deviation heatmap
              </p>
              <div className="grid grid-cols-12 gap-1">
                {rmsdSeries.slice(0, 48).map((point) => (
                  <span key={point.residue} title={`Residue ${point.residue}: ${point.deviation} Å`}
                    className="aspect-square rounded-sm transition-transform hover:scale-125"
                    style={{ background: colorScale(point.deviation) }} />
                ))}
              </div>
            </div>

            {/* ─── Radial Meters Row ──────────────────────────────────── */}
            <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg border border-border bg-background/55 p-4">
              <RadialMeter value={1.82} max={5} label="RMSD" sublabel="Å" colorScale="teal" size={90} />
              <RadialMeter value={87} max={100} label="TM-score" sublabel="%" colorScale="blue" size={90} />
              <RadialMeter value={82} max={100} label="Q-score" sublabel="%" colorScale="violet" size={90} />
            </div>

            {/* ─── Additional Metrics ─────────────────────────────────── */}
            <div className="space-y-2 rounded-lg border border-border bg-background/55 p-4">
              <AnimatedScoreBar value={712} max={1000} label="Aligned atoms" colorScale="teal" />
              <AnimatedScoreBar value={96.4} max={100} label="Ramachandran favored" sublabel="%" colorScale="blue" />
              <AnimatedScoreBar value={68} max={100} label="Sequence identity" sublabel="%" colorScale="violet" />
              <AnimatedScoreBar value={91} max={100} label="Alignment coverage" sublabel="%" colorScale="gradient" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
