"use client";

import { motion } from "framer-motion";
import { Copy, Download, FileUp, RotateCcw, Sparkles, Edit2, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { AMINO_ACIDS, SAMPLE_SEQUENCE } from "@/constants/amino-acids";
import { useClientIntelligence } from "@/hooks/use-client-intelligence";
import { cn, sanitizeSequence } from "@/lib/utils";
import { useWorkbenchStore } from "@/store/workbench-store";
import { calculateSequenceMetrics } from "@/utils/sequence";
import { SequenceViewer } from "@/components/ui/sequence-viewer";

export function SequenceWorkbench() {
  const { sequence, sequenceName, setSequence, setSequenceName, selectedResidue, setSelectedResidue } = useWorkbenchStore();
  const [dragActive, setDragActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const analysis = useClientIntelligence(sequence);
  const metrics = analysis.data?.metrics ?? calculateSequenceMetrics(sequence);

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

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    const text = await file.text();
    setSequence(sanitizeSequence(text));
    setSequenceName(file.name.replace(/\.(fasta|fa|txt)$/i, ""));
  };

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Sequence Workbench</CardTitle>
          <CardDescription>
            FASTA input, validation, residue composition, descriptors, suggestions, and export.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            {isEditing ? "Done" : "Edit Sequence"}
          </Button>
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
            setIsEditing(false);
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
          {isEditing ? (
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={cn(
                "block rounded-lg border border-dashed border-border bg-background/50 p-3 transition",
                dragActive && "border-primary bg-primary/8"
              )}
            >
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  Drop FASTA or paste a target sequence
                </span>
                <Badge variant={analysis.data?.metrics.invalidResidues.length ? "warning" : "success"}>
                  {analysis.data?.input.type.replace(/_/g, " ") ?? "Checking"}
                </Badge>
              </div>
              <Textarea
                value={sequence}
                spellCheck={false}
                onChange={(event) => setSequence(sanitizeSequence(event.target.value))}
                className="min-h-52 border-0 bg-transparent font-mono text-xs leading-6 focus-visible:ring-0"
                aria-label="Protein sequence input"
              />
            </label>
          ) : (
            <div className="rounded-lg border border-border bg-background/50 p-3">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Residue View (hover for index, click to inspect)</span>
                {selectedResidue && (
                  <Badge variant="outline">
                    Selected: {sequence[selectedResidue - 1]}{selectedResidue}
                  </Badge>
                )}
              </div>
              <SequenceViewer
                sequence={sequence}
                selectedResidue={selectedResidue}
                onResidueClick={(idx) => setSelectedResidue(idx)}
              />
            </div>
          )}
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
              {!analysis.data && <p>Worker analysis will populate local explanation cards without contacting a backend.</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
