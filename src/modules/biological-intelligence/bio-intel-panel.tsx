"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Dna, Map, Network, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedScoreBar } from "@/components/ui/animated-score-bar";
import { useStaticBioIntelligence } from "@/hooks/use-static-bio-intelligence";

interface BioIntelPanelProps {
  accession: string;
  geneName: string;
}

export function BioIntelPanel({ accession, geneName }: BioIntelPanelProps) {
  const intelligence = useStaticBioIntelligence(accession, geneName);

  const variants = intelligence.data?.variants ?? [];
  const pathways = intelligence.data?.pathways ?? [];
  const interactions = intelligence.data?.interactions ?? [];
  const domains = intelligence.data?.domains ?? [];
  const isLoading = intelligence.isLoading || intelligence.isFetching;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-primary" />
            Biological Intelligence
          </CardTitle>
          <CardDescription>
            Disease variants, pathways, protein interactions, and domain annotations from ClinVar, KEGG, STRING, and InterPro.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{variants.length} variants</Badge>
          <Badge variant="outline">{pathways.length} pathways</Badge>
          <Badge variant="outline">{interactions.length} interactions</Badge>
          <Badge variant="success">static pack</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-2">
        {/* Disease Variants */}
        <div className="rounded-lg border border-border bg-background/55 p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Disease Variants (ClinVar)
          </p>
          {isLoading ? (
            <div className="space-y-2">{Array.from({length:3}).map((_,i) => <div key={i} className="shimmer h-12 rounded-lg" />)}</div>
          ) : variants.length > 0 ? (
            <div className="max-h-60 space-y-2 overflow-y-auto">
              {variants.slice(0, 8).map((v, i) => (
                <motion.div key={i} className="rounded-lg border border-border bg-background/40 p-3"
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium line-clamp-1">{v.title || "Unknown variant"}</p>
                    <Badge variant={v.clinicalSignificance?.includes("Pathogenic") ? "danger" : "outline"} className="shrink-0 text-[10px]">
                      {v.clinicalSignificance || "VUS"}
                    </Badge>
                  </div>
                  {v.condition && <p className="mt-1 text-[10px] text-muted-foreground">{v.condition}</p>}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No ClinVar variants found for {geneName}</p>
          )}
        </div>

        {/* Protein Interactions */}
        <div className="rounded-lg border border-border bg-background/55 p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Network className="h-4 w-4 text-violet-500" />
            Interaction Network (STRING)
          </p>
          {isLoading ? (
            <div className="space-y-2">{Array.from({length:3}).map((_,i) => <div key={i} className="shimmer h-8 rounded-lg" />)}</div>
          ) : interactions.length > 0 ? (
            <div className="max-h-60 space-y-1.5 overflow-y-auto">
              {interactions.slice(0, 10).map((int, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2">
                  <span className="text-xs font-medium">{int.target}</span>
                  <AnimatedScoreBar value={Math.round((int.score ?? 0) * 100)} max={100} label="" className="w-24" showValue={false} />
                  <span className="text-[10px] text-muted-foreground">{((int.score ?? 0) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No STRING interactions found</p>
          )}
        </div>

        {/* Pathways */}
        <div className="rounded-lg border border-border bg-background/55 p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Map className="h-4 w-4 text-teal-500" />
            Pathways (KEGG)
          </p>
          {isLoading ? (
            <div className="shimmer h-24 rounded-lg" />
          ) : pathways.length > 0 ? (
            <div className="max-h-48 space-y-1.5 overflow-y-auto">
              {pathways.slice(0, 8).map((pw, i) => (
                <a key={i} href={pw.externalUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2 text-xs transition hover:bg-muted/50">
                  <span className="font-medium line-clamp-1">{pw.name}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No KEGG pathways found</p>
          )}
        </div>

        {/* Domains */}
        <div className="rounded-lg border border-border bg-background/55 p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Shield className="h-4 w-4 text-blue-500" />
            Domains &amp; Motifs (InterPro)
          </p>
          {isLoading ? (
            <div className="shimmer h-24 rounded-lg" />
          ) : domains.length > 0 ? (
            <div className="max-h-48 space-y-1.5 overflow-y-auto">
              {domains.slice(0, 10).map((d, i) => (
                <div key={i} className="rounded-lg bg-background/40 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{d.name}</span>
                    <Badge variant="outline" className="text-[10px]">{d.type}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Residues {d.start}–{d.end}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No InterPro domains found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
