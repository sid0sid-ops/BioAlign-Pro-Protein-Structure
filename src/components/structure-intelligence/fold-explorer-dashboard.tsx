"use client";

import { useMemo } from "react";
import type { ProteinPack } from "@/lib/static-data/protein-pack-types";
import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";
import { PredictionRoute } from "./prediction-route";
import { ScoresDashboard } from "./scores-dashboard";
import { MethodsLibrary } from "./methods-library";
import { KeyMetricsExplained } from "./key-metrics-explained";
import { SourcesProvenance } from "./sources-provenance";
import { DomainsMotifsPanel } from "./domains-motifs-panel";
import { EvolutionPanel } from "./evolution-panel";
import { StructureViewerGate } from "@/modules/visualization/structure-viewer-gate";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export interface FoldExplorerDashboardProps {
  pack: ProteinPack;
  intelligence: StructureIntelligencePack;
}

export function FoldExplorerDashboard({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const isPdbAvail = pack.pdbStructures.length > 0;
  const isAfAvail = pack.alphaFold.available;

  return (
    <div className="space-y-6">
      {/* ─── Hero section dynamically updating per protein ─── */}
      <div className="bio-card p-6 bg-slate-50 border-slate-200/80">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                {pack.proteinName || pack.geneName}
              </h1>
              <Badge variant="outline" className="font-mono text-[10px] bg-white">
                {pack.accession}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Gene: <span className="font-semibold text-slate-700">{pack.geneName}</span> · Organism: <span className="font-semibold text-slate-700">{pack.organism.scientificName}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant={isPdbAvail ? "success" : "outline"} className="text-[9px]">
                {pack.pdbStructures.length} PDB available
              </Badge>
              <Badge variant={isAfAvail ? "success" : "outline"} className="text-[9px]">
                AlphaFold {isAfAvail ? "available" : "not found"}
              </Badge>
              <Badge variant={pack.domains.length > 0 ? "success" : "outline"} className="text-[9px]">
                {pack.domains.length} domains mapped
              </Badge>
              <Badge variant="outline" className="text-[9px] text-amber-600 bg-amber-50 border-amber-200">
                MSA Unavailable
              </Badge>
              <Badge variant="outline" className="text-[9px] text-amber-600 bg-amber-50 border-amber-200">
                RMSD Unavailable
              </Badge>
            </div>
          </div>

          {/* Sequence → Structure → Function pipeline mini visual */}
          <div className="rounded-lg border border-border bg-white p-3 shadow-sm min-w-[280px]">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Integrated Pipeline</span>
            <div className="flex items-center justify-between gap-1 text-[11px] font-medium">
              <div className="flex flex-col items-center">
                <span className="text-primary font-bold">Sequence</span>
                <span className="text-[9px] text-muted-foreground">{pack.sequence.length} aa</span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col items-center">
                <span className={isPdbAvail || isAfAvail ? "text-primary font-bold" : "text-muted-foreground"}>Structure</span>
                <span className="text-[9px] text-muted-foreground">
                  {isPdbAvail ? "Experimental" : isAfAvail ? "Predicted" : "None"}
                </span>
              </div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col items-center">
                <span className="text-primary font-bold">Function</span>
                <span className="text-[9px] text-muted-foreground">Annotations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Dashboard Layout ─── */}
      <div className="space-y-6">
        {/* Top Section: Decision Flow, Scores, Methods, Explanations */}
        <div className="space-y-6">
          {/* Prediction route flowchart */}
          <PredictionRoute pack={pack} intelligence={intelligence} />

          {/* Scores dashboard */}
          <ScoresDashboard intelligence={intelligence} />

          {/* Methods library */}
          <MethodsLibrary />

          {/* Key metrics explained */}
          <KeyMetricsExplained />
        </div>

        {/* Bottom Section: 3D Viewer, Domains, Evolution, Function, Sources */}
        <div className="space-y-6">
          {/* 3D Structure Viewer gate */}
          <div id="structure-viewer" className="scroll-mt-20">
            <StructureViewerGate pack={pack} title="3D Structure Viewer" />
          </div>

          {/* Domains and motifs panel */}
          <DomainsMotifsPanel domains={intelligence.domains} sequenceLength={pack.sequence.length} />

          {/* Evolution panel */}
          <EvolutionPanel msa={intelligence.msa} />

          {/* Function & Warnings Panel */}
          <div id="function" className="bio-card p-5 scroll-mt-20">
            <h2 className="mb-1 text-sm font-semibold">Functional Annotations & Warnings</h2>
            <p className="mb-4 text-[11px] text-muted-foreground">Detailed warnings and functional comments from UniProt</p>

            <div className="space-y-3.5">
              {intelligence.intelligence.warnings.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-3.5 space-y-2">
                  <div className="flex items-center gap-2 text-red-800">
                    <ShieldAlert className="h-4 w-4" />
                    <span className="text-xs font-bold">Warnings & Discrepancies</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-red-700 space-y-1">
                    {intelligence.intelligence.warnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pack.diseaseSummary && (
                <div className="rounded-lg border border-border bg-slate-50 p-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Disease Association</span>
                  <p className="text-[11px] text-slate-700 leading-relaxed">{pack.diseaseSummary}</p>
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Functional Comments</span>
                <div className="space-y-2">
                  {intelligence.protein.functionComments && intelligence.protein.functionComments.length > 0 ? (
                    intelligence.protein.functionComments.map((comment: string, i: number) => (
                      <div key={i} className="flex gap-2 text-[11px] text-slate-700 bg-white border border-border/60 p-2.5 rounded shadow-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <p className="leading-normal">{comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] text-muted-foreground italic">No comments available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sources and provenance table */}
          <SourcesProvenance intelligence={intelligence} />
        </div>
      </div>
    </div>
  );
}
