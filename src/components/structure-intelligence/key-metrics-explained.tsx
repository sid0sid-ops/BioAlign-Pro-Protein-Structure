"use client";

export function KeyMetricsExplained() {
  const metrics = [
    {
      name: "RMSD (Root-Mean-Square Deviation)",
      unit: "Ångströms (Å)",
      threshold: "< 2.0 Å is highly similar",
      desc: "Measures the average distance between equivalent backbone atoms (usually C-alpha) of two superimposed structures. Lower values indicate higher structural similarity.",
      missingReason: "Requires active TM-align, US-align, or equivalent structural alignment binaries during build or client environment."
    },
    {
      name: "TM-score",
      unit: "0.0 to 1.0",
      threshold: "> 0.5 indicates same global fold",
      desc: "A sequence-length independent metric for structural comparison. Scores below 0.17 indicate random similarity; above 0.5 suggest similar topologies.",
      missingReason: "Requires TM-align coordinate matching. Unavailable if structures are not aligned or if TM-align is missing."
    },
    {
      name: "pLDDT (Predicted lDDT)",
      unit: "0 to 100",
      threshold: "> 90 is very high confidence",
      desc: "AlphaFold's per-residue confidence metric. Values >90 resemble experimental resolution. Values <50 indicate highly flexible, intrinsically disordered regions.",
      missingReason: "Derived directly from AlphaFold PDB/CIF confidence columns. Only present for structures predicted by AlphaFold."
    },
    {
      name: "PAE (Predicted Aligned Error)",
      unit: "Ångströms (Å)",
      threshold: "< 10 Å implies reliable relative orientation",
      desc: "Estimates the distance error at residue X if aligned against residue Y. Dark/blue zones indicate rigid domains; light/green zones suggest flexible inter-domain links.",
      missingReason: "Provided in PAE JSON output from AlphaFold runs. Requires the model's error matrices to be mapped during data building."
    }
  ];

  return (
    <div className="bio-card p-5">
      <h2 className="mb-1 text-sm font-semibold">Key Metrics Explained</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Understanding scientific validation parameters in BioAlign-Pro-Protein-Structure</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="rounded-lg border border-border/80 bg-white p-3.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold text-slate-800">{metric.name}</h3>
              <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600">{metric.unit}</span>
            </div>
            <p className="mt-1.5 text-[10px] font-semibold text-teal-600">{metric.threshold}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-slate-600">{metric.desc}</p>
            <div className="mt-2.5 rounded bg-amber-50 p-2 border border-amber-100/50">
              <span className="text-[9px] font-bold text-amber-700 uppercase">Scientific Guardrail:</span>
              <p className="text-[9px] text-amber-600 leading-snug">{metric.missingReason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
