"use client";

import {
  Activity,
  BadgeCheck,
  Database,
  Dna,
  FileText,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useProteinQuery } from "@/hooks/use-protein-query";
import { cn } from "@/lib/utils";
import type { ProteinPack, ProteinQueryMatch, ProteinQueryResult } from "@/lib/static-data/protein-pack-types";
import { useWorkbenchStore } from "@/store/workbench-store";
import { StructureIntelligenceExplorer } from "@/components/structure-intelligence/structure-intelligence-explorer";

const starterExamples = ["P04637", "1CRN", "hemoglobin", "humoglobin", "BRCA1", "spike"];

function sourceVariant(source: ProteinQueryResult["source"]) {
  if (source === "local-static-pack" || source === "browser-cache") return "success";
  if (source === "browser-api" || source === "user-input") return "outline";
  return "warning";
}

function sourceLabel(source: ProteinQueryResult["source"]) {
  const labels: Record<ProteinQueryResult["source"], string> = {
    "local-static-pack": "Local static pack",
    "browser-api": "Browser API",
    "browser-cache": "Browser cache",
    "user-input": "User input",
    fallback: "Fallback"
  };
  return labels[source];
}

function compositionRows(pack: ProteinPack | null) {
  const sequence = pack?.sequence.value ?? "";
  if (!sequence) return [];
  const counts = sequence.split("").reduce<Record<string, number>>((acc, symbol) => {
    acc[symbol] = (acc[symbol] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([symbol, count]) => ({
      symbol,
      count,
      percent: Number(((count / Math.max(sequence.length, 1)) * 100).toFixed(1))
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 12);
}

function DataMetric({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Gauge }) {
  return (
    <div className="rounded-lg border border-border bg-background/55 p-4">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </p>
      <p className="mt-2 break-words text-base font-semibold leading-snug">{value}</p>
    </div>
  );
}

function MatchButton({
  match,
  active,
  onSelect
}: {
  match: ProteinQueryMatch;
  active: boolean;
  onSelect: (match: ProteinQueryMatch) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(match)}
      className={cn(
        "rounded-lg border p-3 text-left transition hover:border-primary/60 hover:bg-primary/8",
        active ? "border-primary bg-primary/10" : "border-border bg-background/55"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{match.proteinName}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {match.geneName} - {match.accession}
          </p>
        </div>
        <Badge variant={active ? "success" : "outline"}>{match.score}</Badge>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Matched {match.matchType}: {match.matchedAlias}
      </p>
    </button>
  );
}

function QuerySkeleton() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

function ProteinResult({ result, onSelectMatch }: { result: ProteinQueryResult; onSelectMatch: (match: ProteinQueryMatch) => void }) {
  const pack = result.selectedPack;
  const composition = useMemo(() => compositionRows(pack), [pack]);

  if (!pack) {
    return (
      <div className="rounded-lg border border-border bg-background/55 p-5">
        <div className="flex flex-wrap gap-2">
          {result.sourceBadges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{result.fallbackMessage}</p>
        {result.liveRefreshError && <p className="mt-2 text-xs text-warning">{result.liveRefreshError}</p>}
      </div>
    );
  }

  const domainsAndMotifs = [
    ...pack.domains.map((domain) => ({ key: `${domain.name}-${domain.start ?? 0}`, label: domain.name, detail: domain.type })),
    ...pack.motifs.map((motif) => ({ key: `${motif.name}-${motif.start ?? 0}`, label: motif.name, detail: motif.type }))
  ].slice(0, 10);

  return (
    <div className="grid gap-5">
      {result.matches.length > 1 && (
        <div className="rounded-lg border border-border bg-slate-50/50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Search className="h-4 w-4 text-primary" />
              Local matches
            </p>
            <Badge variant="outline" className="bg-white">{result.matches.length} options</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {result.matches.map((match) => (
              <MatchButton
                key={match.accession}
                match={match}
                active={match.accession === pack.accession}
                onSelect={onSelectMatch}
              />
            ))}
          </div>
        </div>
      )}

      <StructureIntelligenceExplorer pack={pack} />
    </div>
  );
}

export function ProteinQueryWorkflow() {
  const [draftQuery, setDraftQuery] = useState("P04637");
  const [submittedQuery, setSubmittedQuery] = useState("P04637");
  const query = useProteinQuery(submittedQuery);
  const { setRawInput, addSearchHistory, setSequence, setSequenceName } = useWorkbenchStore();

  useEffect(() => {
    const result = query.data;
    const pack = result?.selectedPack;
    if (!result || !pack?.sequence.value) return;
    setRawInput(submittedQuery);
    setSequence(pack.sequence.value);
    setSequenceName(`${pack.geneName} - ${pack.accession}`);
    addSearchHistory(submittedQuery, result.detectedType);
  }, [addSearchHistory, query.data, setRawInput, setSequence, setSequenceName, submittedQuery]);

  const submit = () => {
    if (!draftQuery.trim()) return;
    setSubmittedQuery(draftQuery.trim());
  };

  const selectMatch = (match: ProteinQueryMatch) => {
    setDraftQuery(match.accession);
    setSubmittedQuery(match.accession);
  };

  return (
    <Card className="animated-border">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Accession Query Workflow
          </CardTitle>
          <CardDescription>
            Static index first, compressed protein packs second, browser APIs only as a no-key fallback.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <ShieldCheck className="mr-1 h-3 w-3" />
            GitHub Pages
          </Badge>
          <Badge variant="outline">Worker search</Badge>
          <Badge variant="outline">IndexedDB</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-3 xl:grid-cols-[1fr_18rem]">
          <div className="grid gap-3">
            <div className="flex gap-2">
              <Input
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && submit()}
                placeholder="P04637, 1CRN, hemoglobin, FASTA, DNA, RNA, protein sequence"
                className="font-mono"
              />
              <Button onClick={submit} disabled={query.isFetching}>
                <Search className="h-4 w-4" />
                {query.isFetching ? "Resolving" : "Search"}
              </Button>
            </div>
            <Textarea
              value={draftQuery}
              onChange={(event) => setDraftQuery(event.target.value)}
              spellCheck={false}
              className="min-h-24 font-mono text-xs"
              aria-label="BioAlign query input"
            />
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-3">
            <p className="mb-3 text-xs font-semibold text-muted-foreground">Starter queries</p>
            <div className="grid grid-cols-2 gap-2">
              {starterExamples.map((example) => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDraftQuery(example);
                    setSubmittedQuery(example);
                  }}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {query.isLoading ? (
          <QuerySkeleton />
        ) : query.data ? (
          <ProteinResult result={query.data} onSelectMatch={selectMatch} />
        ) : query.isError ? (
          <div className="rounded-lg border border-border bg-background/55 p-5">
            <Badge variant="warning">Fallback UI</Badge>
            <p className="mt-3 text-sm text-muted-foreground">
              The worker could not resolve this query. Static sequence analysis remains available in the sequence workbench.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
