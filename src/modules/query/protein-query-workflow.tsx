"use client";

import {
  Search,
} from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProteinQuery } from "@/hooks/use-protein-query";
import { cn } from "@/lib/utils";
import type { ProteinQueryMatch, ProteinQueryResult } from "@/lib/static-data/protein-pack-types";
import { useWorkbenchStore } from "@/store/workbench-store";
import { StructureIntelligenceExplorer } from "@/components/structure-intelligence/structure-intelligence-explorer";

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
  const submittedQuery = useWorkbenchStore((state) => state.rawInput || "P04637");
  const { setRawInput, addSearchHistory, setSequence, setSequenceName } = useWorkbenchStore();
  const query = useProteinQuery(submittedQuery);

  useEffect(() => {
    const result = query.data;
    const pack = result?.selectedPack;
    if (!result || !pack?.sequence.value) return;
    setSequence(pack.sequence.value);
    setSequenceName(`${pack.geneName} - ${pack.accession}`);
    addSearchHistory(submittedQuery, result.detectedType);
  }, [addSearchHistory, query.data, setSequence, setSequenceName, submittedQuery]);

  const selectMatch = (match: ProteinQueryMatch) => {
    setRawInput(match.accession);
  };

  return (
    <Card className="animated-border">
      <CardContent className="grid gap-5 p-5">
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
