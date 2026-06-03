"use client";

import { motion } from "framer-motion";
import { Copy, Download, RotateCcw, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AMINO_ACIDS, SAMPLE_SEQUENCE } from "@/constants/amino-acids";
import { useClientIntelligence } from "@/hooks/use-client-intelligence";
import { useWorkbenchStore } from "@/store/workbench-store";
import { calculateSequenceMetrics } from "@/utils/sequence";
import { SequenceViewer } from "@/components/ui/sequence-viewer";

export function SequenceWorkbench() {
  const { sequence, sequenceName, setSequence, setSequenceName, selectedResidue, setSelectedResidue } = useWorkbenchStore();
  const analysis = useClientIntelligence(sequence);
  const metrics = analysis.data?.metrics ?? calculateSequenceMetrics(sequence);
  const selectedCode = selectedResidue ? sequence[selectedResidue - 1] : "";
  const selectedResidueInfo = selectedCode ? AMINO_ACIDS[selectedCode] : null;

  const chartData = useMemo(
    () =>
      Object.entries(metrics.composition)
        .map(([code, count]) => ({
          code,
          count,
          name: AMINO_ACIDS[code]?.name ?? code
        }))
        .sort((a, b) => (b.count as number) - (a.count as number))
        .slice(0, 12),
    [metrics.composition]
  );

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Sequence Workbench</CardTitle>
          <CardDescription>
            Active target validation, residue composition, descriptors, suggestions, and export.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => navigator.clipboard?.writeText(sequence)}>
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="secondary" size="sm" onClick={() => {
            setSequence(SAMPLE_SEQUENCE);
          }}>
            <RotateCcw className="h-4 w-4" />
            Demo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-3">
          <Input
            value={sequenceName}
            onChange={(event) => setSequenceName(event.target.value)}
            aria-label="Sequence name"
          />
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <div className="mb-3 grid gap-3 lg:grid-cols-[1fr_260px] lg:items-stretch">
              <div className="rounded-md border border-border bg-background/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground">Residue View</p>
                <p className="mt-1 text-sm text-foreground">Hover for index, click a residue to inspect its position and amino-acid identity.</p>
              </div>
              <div className="rounded-md border border-border bg-background/80 p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground">Selected Residue</p>
                {selectedResidue && selectedCode ? (
                  <div className="mt-2 grid grid-cols-[auto_1fr] items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-md border border-primary/35 bg-primary/10 font-mono text-xl font-semibold text-primary">
                      {selectedCode}{selectedResidue}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{selectedResidueInfo?.name ?? "Residue"}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">Index {selectedResidue} / {sequence.length}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No residue selected.</p>
                )}
              </div>
            </div>
            <SequenceViewer
              sequence={sequence}
              selectedResidue={selectedResidue}
              onResidueClick={(idx) => setSelectedResidue(idx)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {analysis.isLoading
              ? Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-20" />)
              : [
                  ["Length", `${metrics.length} symbols`],
                  ["Weight", metrics.molecularWeight ? `${(metrics.molecularWeight / 1000).toFixed(2)} kDa` : "n/a"],
                  ["Hydropathy", metrics.hydrophobicity ?? "n/a"],
                  ["Complexity", analysis.data?.complexity.label ?? "pending"]
                ].map(([label, value]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -3 }}
                    className="rounded-lg border border-border bg-background/55 p-3"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </motion.div>
                ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Residue composition</p>
                <p className="text-xs text-muted-foreground">Top residues in the active target</p>
              </div>
              <Badge variant="outline">{chartData.length} residues</Badge>
            </div>
            <div className="h-52">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="code" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(148, 163, 184, 0.12)" }}
                      contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="count" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Local scientific cards
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {(analysis.data?.explanations.slice(0, 3) ?? []).map((card) => (
                <p key={card.id}>{card.body}</p>
              ))}
              {!analysis.data && <p>Sequence analysis will populate explanation cards after a target is selected.</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
