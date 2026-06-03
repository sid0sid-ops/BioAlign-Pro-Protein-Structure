"use client";

import { BookOpen, Dna, GitFork, Microscope, Network, ShieldCheck } from "lucide-react";
import { PageTransition } from "@/animations/page-transition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AppShell } from "@/layouts/app-shell";
import { KeyMetricsExplained } from "@/components/structure-intelligence/key-metrics-explained";
import { MethodsLibrary } from "@/components/structure-intelligence/methods-library";

const focusCards = [
  {
    title: "Sequence to Structure",
    body: "Amino-acid sequence, conserved motifs, domains, and structure-function relationships.",
    badge: "Protein Analysis",
    icon: Dna
  },
  {
    title: "Homology Modeling",
    body: "Template candidates, sequence identity, coverage, alignments, refinement, and validation readouts.",
    badge: "Template Search",
    icon: Microscope
  },
  {
    title: "Fold Recognition",
    body: "Fold families, conserved regions, remote similarity signals, and structure-level hypotheses.",
    badge: "Fold Biology",
    icon: Network
  }
];

const scoreGuide = [
  {
    code: "QC",
    name: "Quality Check",
    detail: "Coverage and source completeness for sequence, structure, domains, confidence, and provenance fields."
  },
  {
    code: "RC",
    name: "Residue Conservation",
    detail: "MSA-derived residue conservation, consensus sequence, and conserved-site annotations when alignment data exists."
  },
  {
    code: "MC",
    name: "Model Confidence",
    detail: "AlphaFold confidence, pLDDT summaries, and model-level reliability when prediction confidence data is mapped."
  },
  {
    code: "PAE",
    name: "Predicted Aligned Error",
    detail: "Domain-orientation uncertainty from AlphaFold PAE matrices when the source provides mapped error data."
  },
  {
    code: "SC",
    name: "Structural Conservation",
    detail: "Structure similarity evidence from valid coordinate superposition results such as RMSD and TM-score."
  },
  {
    code: "OF",
    name: "Overall Fold",
    detail: "Combined fold reliability score using available quality, conservation, confidence, and structure evidence."
  }
];

const structureLevels = [
  { num: 1, label: "Primary", detail: "Amino acid sequence" },
  { num: 2, label: "Secondary", detail: "Alpha helix, beta sheet, turns, and coils" },
  { num: 3, label: "Tertiary", detail: "Three-dimensional fold of a protein chain" },
  { num: 4, label: "Quaternary", detail: "Assembly of multiple chains or subunits" }
];

export function InformationPage() {
  return (
    <AppShell>
      <PageTransition>
        <div className="space-y-6">
          <section id="information" className="bio-card p-6 scroll-mt-20">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge variant="outline">
                  <BookOpen className="mr-1 h-3 w-3" />
                  Scientific information
                </Badge>
                <h1 className="mt-3 text-2xl font-bold tracking-tight">Protein Structure Reference</h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Method notes, score definitions, and structure-biology background used by the workbench. The home page stays reserved for protein-specific records and database-derived results.
                </p>
              </div>
              <a href="/" className="text-sm font-medium text-primary hover:underline">
                Back to protein data
              </a>
            </div>
          </section>

          <section className="grid gap-3 lg:grid-cols-3">
            {focusCards.map((card) => (
              <Card key={card.title}>
                <CardContent className="p-5">
                  <Badge variant="outline">
                    <card.icon className="mr-1 h-3 w-3" />
                    {card.badge}
                  </Badge>
                  <p className="mt-4 text-sm font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="bio-card p-5">
            <h2 className="text-sm font-semibold">Score Definitions</h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              These definitions explain the dashboard labels. The numeric values on the home page are still computed per selected protein from the current data pack.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {scoreGuide.map((score) => (
                <div key={score.code} className="rounded-lg border border-border bg-white p-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {score.code}
                    </span>
                    <p className="text-xs font-semibold">{score.name}</p>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{score.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bio-card p-5">
            <h2 className="text-sm font-semibold">Protein Structure Levels</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {structureLevels.map((level) => (
                <div key={level.num} className="rounded-lg border border-border bg-white p-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {level.num}
                  </span>
                  <p className="mt-3 text-sm font-semibold">{level.label}</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{level.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <MethodsLibrary />
          <KeyMetricsExplained />

          <section className="bio-card p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Data Guardrail
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Missing values stay missing until real source data or build-time computation exists. RMSD, TM-score, MSA conservation, pLDDT, and PAE are shown only when the relevant database field or generated result is available.
            </p>
          </section>
        </div>
      </PageTransition>
    </AppShell>
  );
}
