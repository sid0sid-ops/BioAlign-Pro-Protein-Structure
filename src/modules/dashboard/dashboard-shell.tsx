"use client";

import { Database, Dna, Rocket, Search, ShieldCheck, Zap } from "lucide-react";
import { useCallback, useState } from "react";
import { PageTransition } from "@/animations/page-transition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/layouts/app-shell";
import { ClientIntelligencePanel } from "@/modules/client-intelligence/client-intelligence-panel";
import { ProteinQueryWorkflow } from "@/modules/query/protein-query-workflow";
import { SequenceWorkbench } from "@/modules/sequence-analysis/sequence-workbench";
import { detectInputType } from "@/services/input-detector";
import { useWorkbenchStore } from "@/store/workbench-store";

const provenanceCards = [
  {
    title: "Static Pack First",
    body: "Runtime lookup starts with the local search index and selected protein pack before any optional browser API refresh.",
    badge: "Static Pack"
  },
  {
    title: "No Invented Metrics",
    body: "MSA, pLDDT, PAE, RMSD, and TM-score panels show values only when real source data or build-time computation exists.",
    badge: "Guardrail"
  },
  {
    title: "Browser Runtime",
    body: "Deployed GitHub Pages files run the intelligence workflow in the user's browser with workers and IndexedDB.",
    badge: "GitHub Pages"
  }
];

export function DashboardShell() {
  const { setRawInput, setInputDetection, addSearchHistory, setSequence, setSequenceName } = useWorkbenchStore();
  const [heroQuery, setHeroQuery] = useState("");
  const [detectedType, setDetectedType] = useState<string | null>(null);

  const handleSearch = useCallback(() => {
    if (!heroQuery.trim()) return;
    const detection = detectInputType(heroQuery);
    setDetectedType(detection.type);
    setRawInput(heroQuery);
    setInputDetection(detection);
    addSearchHistory(heroQuery, detection.type);

    if (detection.type === "uniprot_accession") {
      setSequenceName(`UniProt: ${detection.value}`);
    } else if (detection.type === "pdb_id") {
      setSequenceName(`PDB: ${detection.value}`);
    } else if (detection.type === "protein_sequence" || detection.type === "fasta") {
      setSequence(detection.value);
      setSequenceName("User sequence");
    } else if (detection.type === "gene_name") {
      setSequenceName(`Gene: ${detection.value}`);
    }
  }, [addSearchHistory, heroQuery, setInputDetection, setRawInput, setSequence, setSequenceName]);

  return (
    <AppShell>
      <PageTransition>
        <section className="mb-5 grid gap-4">
          <div className="glass-panel rounded-lg p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl w-full">
                <div className="flex gap-2">
                  <div className="relative max-w-xl flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={heroQuery}
                      onChange={(event) => setHeroQuery(event.target.value)}
                      onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                      className="pl-9 pr-24"
                      placeholder="Enter UniProt ID, PDB ID, gene name, or FASTA sequence"
                    />
                    {detectedType && (
                      <Badge variant="outline" className="absolute right-12 top-1/2 -translate-y-1/2 text-[10px]">
                        {detectedType.replace(/_/g, " ")}
                      </Badge>
                    )}
                  </div>
                  <Button onClick={handleSearch}>
                    <Zap className="h-4 w-4" />
                    Analyze
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  No backend required
                </Badge>
                <Badge variant="outline">
                  <Database className="mr-1 h-3 w-3" />
                  IndexedDB cache
                </Badge>
                <Badge variant="outline">
                  <Dna className="mr-1 h-3 w-3" />
                  Worker analysis
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {provenanceCards.map((card) => (
              <Card key={card.title}>
                <CardContent className="p-5">
                  <Badge variant={card.badge === "Guardrail" ? "warning" : "outline"}>{card.badge}</Badge>
                  <p className="mt-4 text-sm font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-5">
          <section id="sequence">
            <ProteinQueryWorkflow />
          </section>
          <section id="sequence-workbench">
            <SequenceWorkbench />
          </section>
          <section id="client-intelligence">
            <ClientIntelligencePanel />
          </section>
        </div>
      </PageTransition>
    </AppShell>
  );
}
