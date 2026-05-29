"use client";

import { useState } from "react";
import { Database, SearchCheck, TimerReset, Play, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkbenchStore } from "@/store/workbench-store";
import { runBlastSearch, BlastHit } from "@/services/integrations/ncbi";

export function BlastPanel() {
  const { sequence } = useWorkbenchStore();
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<string>("Ready to search");
  const [progress, setProgress] = useState(0);
  const [hits, setHits] = useState<BlastHit[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRunBlast = async () => {
    if (!sequence) return;
    setIsRunning(true);
    setError(null);
    setHits([]);
    try {
      const result = await runBlastSearch(sequence, (msg, prog) => {
        setStatus(msg);
        setProgress(prog);
      });
      if (result.status === "ready") {
        setHits(result.hits);
        setStatus("BLAST Search Complete");
      } else {
        setError("BLAST search timed out or failed. Please try again.");
        setStatus("Failed");
      }
    } catch (e: any) {
      setError(e.message ?? "NCBI BLAST Service temporary issue. Standard rate limiting applied.");
      setStatus("Error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <SearchCheck className="h-5 w-5 text-teal-400" />
            BLAST &amp; Template Retrieval
          </CardTitle>
          <CardDescription>
            NCBI BLAST search orchestration with provider-safe polling, cached template metadata, and loading states.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">NCBI Adapter</Badge>
          <Button
            size="sm"
            onClick={handleRunBlast}
            disabled={isRunning || !sequence}
            className="bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20"
          >
            {isRunning ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="mr-1.5 h-3.5 w-3.5" />
            )}
            Run BLAST Search
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stages */}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: "Submit BLASTP",
              metric: isRunning && progress < 20 ? "Submitting..." : progress >= 20 ? "Submitted" : "Ready",
              progress: progress >= 20 ? 100 : progress * 5,
              icon: SearchCheck
            },
            {
              label: "Poll NCBI Job",
              metric: isRunning ? `${Math.round(progress)}%` : hits.length > 0 ? "Complete" : "Idle",
              progress: isRunning ? progress : hits.length > 0 ? 100 : 0,
              icon: TimerReset
            },
            {
              label: "Normalize PDB Hits",
              metric: hits.length > 0 ? `${hits.length} hits` : "0 hits",
              progress: hits.length > 0 ? 100 : 0,
              icon: Database
            }
          ].map((stage) => (
            <div key={stage.label} className="rounded-lg border border-border bg-background/55 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-primary/10 p-2 text-primary">
                  <stage.icon className="h-4 w-4" />
                </span>
                <Badge variant="outline">{stage.metric}</Badge>
              </div>
              <p className="mt-4 text-sm font-semibold">{stage.label}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Requests flow through retry, cache, typed response, and error-boundary layers.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted/50">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300" style={{ width: `${stage.progress}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        {isRunning && (
          <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-3 text-xs text-teal-400">
            Current Status: {status}...
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs text-rose-400">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Hits list */}
        {hits.length > 0 && (
          <div className="rounded-lg border border-border bg-background/30 p-4">
            <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase">NCBI BLAST Search Results</p>
            <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
              {hits.map((hit, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-border bg-background/40 p-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-teal-400">{hit.accession}</span>
                    <span className="ml-2 font-medium">{hit.title}</span>
                    <span className="ml-2 text-muted-foreground italic">({hit.organism})</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono">
                    <span>Identity: <b className="text-emerald-400">{hit.identity}%</b></span>
                    <span>Coverage: <b className="text-blue-400">{hit.coverage}%</b></span>
                    <span>E-value: <b>{hit.eValue.toExponential(1)}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
