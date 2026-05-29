"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CircleDashed, Gauge, Network, Pickaxe, ShieldCheck } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { PipelineStepper } from "@/components/ui/pipeline-stepper";
import { TemplateCard } from "@/components/ui/template-card";
import { homologySteps as mockHomologySteps, templateHits as mockTemplateHits } from "@/modules/shared/mock-data";
import { useWorkbenchStore } from "@/store/workbench-store";
import { useAnalysisStore } from "@/store/analysis-store";
import { describeIdentity } from "@/utils/sequence";

export function HomologyPipeline() {
  const { analysisResults, selectedTemplateId, setSelectedTemplateId } = useWorkbenchStore();
  const { steps, isRunning } = useAnalysisStore();

  // Retrieve homology hits from live analysis if present, else fallback to mock
  const homologyData = analysisResults["homology"]?.data;
  const hits = homologyData?.hits ?? mockTemplateHits;

  const identityData = hits.map((hit: any) => ({
    id: `${hit.pdbId}-${hit.chainId}`,
    identity: hit.sequenceIdentity,
    coverage: hit.coverage,
    foldseek: Math.round((hit.foldseekScore ?? 0.8) * 100)
  }));

  // Map steps to pipeline structure
  const pipelineSteps = isRunning || steps.some(s => s.status !== "queued")
    ? steps.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        status: s.status,
        progress: s.progress,
        metric: s.metric
      }))
    : mockHomologySteps.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        status: s.status as any,
        progress: s.progress,
        metric: s.metric
      }));

  const bestIdentity = Math.max(...hits.map((h: any) => h.sequenceIdentity), 0);

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Homology Modeling Pipeline</CardTitle>
          <CardDescription>
            BLAST to template retrieval, identity scoring, alignment, model building, refinement, validation, and RMSD.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Best identity {bestIdentity}%</Badge>
          <Badge variant="outline">Rule: greater than 50% reliable</Badge>
          <Badge variant="warning">Fallback: threading</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 2xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold">Pipeline Orchestration State</p>
          <PipelineStepper steps={pipelineSteps} />
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Template ranking</p>
                <p className="text-xs text-muted-foreground">Identity, coverage, and Foldseek-compatible score</p>
              </div>
              <Network className="h-4 w-4 text-primary" />
            </div>
            <div className="h-52">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <AreaChart data={identityData}>
                    <defs>
                      <linearGradient id="identity-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="id" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                    <Area type="monotone" dataKey="identity" stroke="#3b82f6" fill="url(#identity-fill)" />
                    <Area type="monotone" dataKey="coverage" stroke="#14b8a6" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 max-h-[400px] overflow-y-auto pr-1">
            {hits.map((hit: any) => (
              <TemplateCard
                key={hit.id}
                pdbId={hit.pdbId}
                chainId={hit.chainId}
                title={hit.title}
                organism={hit.organism ?? "Unknown"}
                resolution={hit.resolution}
                sequenceIdentity={hit.sequenceIdentity}
                coverage={hit.coverage}
                eValue={hit.eValue ?? 0}
                foldseekScore={hit.foldseekScore}
                isSelected={selectedTemplateId === `${hit.pdbId}-${hit.chainId}`}
                onSelect={() => setSelectedTemplateId(`${hit.pdbId}-${hit.chainId}`)}
              />
            ))}
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Pickaxe className="h-4 w-4 text-warning" />
              Modeling decision
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {bestIdentity >= 50
                ? "The top hit clears the 50 percent identity rule, so the platform prioritizes homology modeling."
                : "The top hit is below the 50 percent threshold. Threading comparison and fold library rescue are recommended."}
              Remote candidates stay available for secondary structure validation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
