"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface SequenceViewerProps {
  sequence: string;
  annotations?: Array<{ label: string; start: number; end: number; color?: string }>;
  onResidueHover?: (index: number | null, residue: string | null) => void;
  onResidueClick?: (index: number) => void;
  selectedResidue?: number | null;
  className?: string;
}

const residueColors: Record<string, string> = {
  // Acidic
  D: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  E: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  // Basic
  K: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  R: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  H: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  // Polar uncharged
  S: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  T: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  N: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Q: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  // Hydrophobic aliphatic
  A: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  V: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  L: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  I: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  M: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  // Hydrophobic aromatic
  F: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  Y: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  W: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  // Special
  P: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  G: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  C: "bg-lime-500/20 text-lime-300 border-lime-500/30",
};

export function SequenceViewer({
  sequence,
  annotations = [],
  onResidueHover,
  onResidueClick,
  selectedResidue,
  className,
}: SequenceViewerProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const residues = useMemo(() => sequence.split(""), [sequence]);

  // Find annotation for a residue index (1-based)
  const getAnnotationForIndex = (index: number) => {
    return annotations.find((ann) => index >= ann.start && index <= ann.end);
  };

  return (
    <div className={cn("space-y-4 font-mono", className)}>
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-rose-500/30" /> Acidic</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-blue-500/30" /> Basic</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-teal-500/30" /> Polar</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-slate-500/20" /> Non-polar</span>
      </div>

      <div className="hide-scrollbar max-h-80 overflow-y-auto rounded-lg border border-border bg-background/30 p-4 leading-relaxed">
        <div className="grid grid-cols-[3rem_1fr] gap-4">
          {Array.from({ length: Math.ceil(residues.length / 50) }).map((_, rowIndex) => {
            const startIdx = rowIndex * 50;
            const endIdx = Math.min(startIdx + 50, residues.length);
            const rowResidues = residues.slice(startIdx, endIdx);

            return (
              <div key={rowIndex} className="contents">
                <span className="select-none pt-0.5 text-right text-xs font-semibold text-muted-foreground/60">
                  {startIdx + 1}
                </span>
                <div className="flex flex-wrap gap-1">
                  {rowResidues.map((res, colIndex) => {
                    const idx = startIdx + colIndex + 1; // 1-based index
                    const ann = getAnnotationForIndex(idx);
                    const isSelected = selectedResidue === idx;
                    const isHovered = hoveredIndex === idx;

                    return (
                      <span
                        key={idx}
                        className={cn(
                          "relative flex h-7 w-6 cursor-pointer items-center justify-center rounded border text-xs font-bold transition-all hover:scale-110 hover:z-10",
                          residueColors[res] ?? "bg-muted text-muted-foreground",
                          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                          isHovered && "scale-110 border-foreground/30",
                          ann && "border-b-2 border-b-primary"
                        )}
                        onMouseEnter={() => {
                          setHoveredIndex(idx);
                          onResidueHover?.(idx, res);
                        }}
                        onMouseLeave={() => {
                          setHoveredIndex(null);
                          onResidueHover?.(null, null);
                        }}
                        onClick={() => onResidueClick?.(idx)}
                      >
                        {res}
                        {ann && (
                          <span
                            className="absolute -bottom-1 left-0 h-1 w-full rounded-b"
                            style={{ background: ann.color ?? "hsl(var(--primary))" }}
                            title={ann.label}
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
