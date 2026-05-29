"use client";

import { BrainCircuit, Cpu, Database, Gauge, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientIntelligence } from "@/hooks/use-client-intelligence";
import { enableLocalAssistant, explainLoadedBioAlignData, type LocalAssistantState } from "@/lib/browser-ai/local-assistant";
import { getBrowserAiCapabilities, type BrowserAiCapabilities } from "@/lib/browser-ai/onnx-runtime";
import { useWorkbenchStore } from "@/store/workbench-store";

export function ClientIntelligencePanel() {
  const sequence = useWorkbenchStore((state) => state.sequence);
  const intelligence = useClientIntelligence(sequence);
  const [assistant, setAssistant] = useState<LocalAssistantState | null>(null);
  const [capabilities, setCapabilities] = useState<BrowserAiCapabilities | null>(null);
  const [assistantText, setAssistantText] = useState("");

  const enableAssistant = async () => {
    const [assistantState, browserCapabilities] = await Promise.all([
      enableLocalAssistant(),
      getBrowserAiCapabilities()
    ]);
    setAssistant(assistantState);
    setCapabilities(browserCapabilities);
    setAssistantText(explainLoadedBioAlignData(intelligence.data ?? null));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            Client Intelligence Engine
          </CardTitle>
          <CardDescription>
            Browser-only rule analysis, lazy browser ML readiness, IndexedDB cache, and optional local explanation mode.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Static-ready</Badge>
          <Badge variant="outline">Workerized</Badge>
          <Badge variant="outline">IndexedDB</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3">
          {intelligence.isLoading ? (
            Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-24" />)
          ) : (
            intelligence.data?.explanations.map((card) => (
              <div key={card.id} className="rounded-lg border border-border bg-background/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{card.title}</p>
                  <Badge variant={card.severity === "danger" ? "danger" : card.severity === "warning" ? "warning" : "outline"}>
                    {card.evidence}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))
          )}
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Gauge className="h-4 w-4 text-teal-500" />
              Runtime Profile
            </p>
            <div className="grid gap-2 text-xs text-muted-foreground">
              <p>Input type: {intelligence.data?.input.type.replace(/_/g, " ") ?? "Analyzing"}</p>
              <p>Class: {intelligence.data?.input.sequenceClass ?? "unknown"}</p>
              <p>Complexity: {intelligence.data?.complexity.label ?? "pending"}</p>
              <p>Worker time: {intelligence.data?.runtime.durationMs ?? 0} ms</p>
              <p>Low-memory mode: {intelligence.data?.runtime.lowMemoryMode ? "active" : "off"}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Cpu className="h-4 w-4 text-violet-500" />
              Browser ML Layer
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <p>ONNX Runtime Web is loaded only when a model session is requested.</p>
              <p>Execution preference: WebGPU when available, WASM/CPU fallback otherwise.</p>
              <p>Models belong in `/public/models`; indexes belong in `/public/indexes`.</p>
            </div>
            {capabilities && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant={capabilities.webgpu ? "success" : "outline"}>WebGPU {capabilities.webgpu ? "ready" : "off"}</Badge>
                <Badge variant="outline">Provider {capabilities.selectedExecutionProvider}</Badge>
              </div>
            )}
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Optional Local AI
            </p>
            <p className="text-sm text-muted-foreground">
              Disabled by default. It explains already-loaded BioAlign data and does not claim structure prediction.
            </p>
            <Button className="mt-3" size="sm" onClick={enableAssistant}>
              <Zap className="h-4 w-4" />
              Enable Local AI
            </Button>
            {assistant && (
              <div className="mt-3 rounded-lg border border-border bg-background/50 p-3 text-xs text-muted-foreground">
                <p className="mb-1 flex items-center gap-2 font-medium text-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                  Provider: {assistant.provider}
                </p>
                {assistant.warning && <p className="mb-2 text-warning">{assistant.warning}</p>}
                <p>{assistantText}</p>
              </div>
            )}
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Database className="h-4 w-4 text-blue-500" />
              Static Packs
            </p>
            <p className="text-sm text-muted-foreground">
              Public JSON packs are cached locally in IndexedDB, so deployed GitHub Pages builds keep working after the build PC is shut down.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
