"use client";

import { motion } from "framer-motion";
import { Binary, Fingerprint, Library, Radar } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar as RechartsRadar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { foldMatches } from "@/modules/shared/mock-data";

const matrix = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => Math.round(34 + Math.sin(row + col / 2) * 25 + (row === col ? 36 : 0)))
);

export function ThreadingDashboard() {
  const radarData = foldMatches.map((match) => ({
    fold: match.fold,
    score: match.score,
    confidence: match.confidence,
    conservation: match.conservation
  }));

  const scatter = foldMatches.map((match) => ({
    x: match.score,
    y: match.conservation,
    z: match.confidence,
    name: match.fold
  }));

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Threading and Fold Recognition</CardTitle>
          <CardDescription>
            Distant homology detection with profile-profile alignment, HMM comparison, fold library matching, and conservation.
          </CardDescription>
        </div>
        <Badge variant="warning">Triggered below 50% identity</Badge>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Profile-profile", icon: Fingerprint, metric: "Q-score 0.82" },
            { title: "HMM comparison", icon: Binary, metric: "E-value 2e-8" },
            { title: "Fold library", icon: Library, metric: "1,842 folds" },
            { title: "Conservation", icon: Radar, metric: "82%" }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="rounded-lg border border-border bg-background/55 p-4"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-accent/10 p-2 text-accent">
                  <item.icon className="h-4 w-4" />
                </span>
                <Badge variant="outline">{item.metric}</Badge>
              </div>
              <p className="mt-4 text-sm font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Normalized fold evidence is combined with structural conservation and template-independent scoring.
              </p>
            </motion.div>
          ))}
          <div className="rounded-lg border border-border bg-background/55 p-4 md:col-span-2">
            <p className="mb-3 text-sm font-semibold">Similarity matrix</p>
            <div className="grid grid-cols-8 gap-1">
              {matrix.flatMap((row, rowIndex) =>
                row.map((value, colIndex) => (
                  <span
                    key={`${rowIndex}-${colIndex}`}
                    title={`Similarity ${value}%`}
                    className="aspect-square rounded-sm"
                    style={{
                      background: `rgba(${value > 70 ? "20, 184, 166" : "59, 130, 246"}, ${value / 100})`
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 text-sm font-semibold">Fold confidence graph</p>
            <div className="h-64">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(148,163,184,0.25)" />
                    <PolarAngleAxis dataKey="fold" tick={{ fontSize: 10 }} />
                    <RechartsRadar dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.22} />
                    <RechartsRadar dataKey="conservation" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.16} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                  </RadarChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 text-sm font-semibold">Fold library matching</p>
            <div className="h-64">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <ScatterChart>
                    <XAxis type="number" dataKey="x" name="Score" domain={[50, 100]} tickLine={false} axisLine={false} />
                    <YAxis type="number" dataKey="y" name="Conservation" domain={[40, 90]} tickLine={false} axisLine={false} />
                    <ZAxis type="number" dataKey="z" range={[80, 420]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={scatter} fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
