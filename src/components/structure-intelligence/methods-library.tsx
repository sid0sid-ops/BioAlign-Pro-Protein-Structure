"use client";

import { Badge } from "@/components/ui/badge";

export function MethodsLibrary() {
  const categories = [
    {
      title: "Homology Modeling",
      subtitle: "High sequence identity (≥50% or 30-50%) to templates",
      tools: [
        { name: "SWISS-MODEL", desc: "Automated homology modeling server that aligns sequence with template structures." },
        { name: "MODELLER", desc: "Predicts 3D structure by satisfaction of spatial restraints derived from templates." }
      ],
      pros: "Extremely accurate when high-identity templates (>50%) exist.",
      cons: "Accuracy drops significantly with template divergence; fails completely without close structural homologs."
    },
    {
      title: "Threading / Fold Recognition",
      subtitle: "Low sequence identity, but compatible fold exists in library",
      tools: [
        { name: "HHpred", desc: "Profile hidden Markov model (HMM) comparison tool for remote homology detection." },
        { name: "I-TASSER (LOMETS)", desc: "Iterative threading assembly refinement of structural models from databases." }
      ],
      pros: "Detects structural similarity even at <20% sequence identity.",
      cons: "Limited to folds already present in the PDB; cannot model novel architectures."
    },
    {
      title: "Ab Initio / Deep Learning",
      subtitle: "Novel folds or no structural templates available",
      tools: [
        { name: "AlphaFold 3", desc: "Predicts 3D coordinates using an attention-based neural network architecture." },
        { name: "ESMFold / ESM-3", desc: "Transformer-based language model predicting structure directly from single sequence." }
      ],
      pros: "Models novel architectures accurately; fast browser inference option available for ESMFold.",
      cons: "Extremely resource-intensive (GPU required for AlphaFold); can generate physically implausible loops."
    }
  ];

  return (
    <div id="methods" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Methods Library & Comparison</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Comprehensive overview of protein structure prediction methods</p>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col rounded-lg border border-border bg-slate-50/50 p-4">
            <h3 className="text-xs font-bold text-slate-800">{cat.title}</h3>
            <p className="mt-0.5 text-[10px] text-muted-foreground leading-normal">{cat.subtitle}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {cat.tools.map((tool, tIdx) => (
                <div key={tIdx} className="w-full">
                  <span className="text-[11px] font-semibold text-primary">{tool.name}</span>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">{tool.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 space-y-2 border-t border-border/60">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Pros:</span>
                <p className="text-[10px] text-slate-700 leading-snug">{cat.pros}</p>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700">Cons:</span>
                <p className="text-[10px] text-slate-700 leading-snug">{cat.cons}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
