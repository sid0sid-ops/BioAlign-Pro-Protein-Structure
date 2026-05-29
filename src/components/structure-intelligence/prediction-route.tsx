"use client";

import type { ProteinPack } from "@/lib/static-data/protein-pack-types";
import type { StructureIntelligencePack } from "@/lib/structure-intelligence/types";

function Node({ text, className = "" }: { text: string; className?: string }) {
  return <div className={`flowchart-node text-center ${className}`}>{text}</div>;
}

function ActiveNode({ text }: { text: string }) {
  return <div className="flowchart-node flowchart-node-active text-center font-semibold">{text}</div>;
}

function DecisionNode({ text }: { text: string }) {
  return <div className="flowchart-node flowchart-node-decision text-center">{text}</div>;
}

function Arrow({ label, direction = "down" }: { label?: string; direction?: "down" | "right" }) {
  if (direction === "right") {
    return (
      <div className="flex items-center gap-1 px-1">
        {label && <span className="text-[10px] font-semibold text-primary">{label}</span>}
        <svg width="24" height="12" className="text-muted-foreground"><path d="M0 6 L20 6 M16 2 L20 6 L16 10" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-0.5">
      {label && <span className="text-[10px] font-semibold text-red-500">{label}</span>}
      <svg width="12" height="20" className="text-muted-foreground"><path d="M6 0 L6 16 M2 12 L6 16 L10 12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
    </div>
  );
}

export function PredictionRoute({ pack, intelligence }: { pack: ProteinPack; intelligence: StructureIntelligencePack }) {
  const hasExperimental = intelligence.structures.experimental.length > 0;
  const hasPredicted = intelligence.structures.predicted.length > 0;
  const hasDomains = intelligence.domains.length > 0;

  return (
    <div id="structure-route" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Structure Prediction Route</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">How we choose the best way to model this protein</p>

      <div className="overflow-x-auto">
        <div className="flex flex-wrap items-start gap-3 min-w-[700px]">
          {/* Row 1: Input → Experimental check */}
          <div className="flex items-center gap-2">
            <ActiveNode text="Input Sequence" />
            <Arrow direction="right" />
            <DecisionNode text="Experimental structure available?" />
          </div>

          {/* Branch from experimental */}
          <div className="flex flex-col gap-2 ml-4">
            <div className="flex items-center gap-2">
              <Arrow direction="right" label="Yes" />
              {hasExperimental
                ? <ActiveNode text={`PDB: ${intelligence.structures.experimental.slice(0, 2).map((s) => s.pdbId).join(", ")}`} />
                : <Node text="Prefer PDB/RCSB structure" />
              }
            </div>

            <div className="flex items-start gap-2">
              <Arrow label="No" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <DecisionNode text="High sequence identity (≥50%) to template?" />
                  <Arrow direction="right" label="Yes" />
                  <Node text="Homology Modeling (SWISS-MODEL / MODELLER)" />
                </div>

                <div className="flex items-start gap-2 ml-4">
                  <Arrow label="No" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <DecisionNode text="Low identity but fold/profile hit?" />
                      <Arrow direction="right" label="Yes" />
                      <Node text="Threading / Fold Recognition (HHpred / I-TASSER)" />
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Arrow label="No" />
                      <Node text="Ab Initio / AI Prediction (AlphaFold / RoseTTAFold / ESMFold)" />
                      {hasPredicted && (
                        <>
                          <Arrow direction="right" />
                          <ActiveNode text="AlphaFold Confidence (MC score from pLDDT & PAE)" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
