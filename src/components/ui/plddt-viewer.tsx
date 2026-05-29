"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PLDDTViewerProps {
  values: number[];
  startResidue?: number;
  className?: string;
  height?: number;
}

function plddtColor(value: number): string {
  if (value >= 90) return "#0053d6"; // very high - dark blue
  if (value >= 70) return "#65cbf3"; // confident - light blue
  if (value >= 50) return "#ffdb13"; // low - yellow
  return "#ff7d45"; // very low - orange
}

export function PLDDTViewer({ values, startResidue = 1, className, height = 160 }: PLDDTViewerProps) {
  const bars = useMemo(() => {
    if (!values.length) return [];
    return values.map((v, i) => ({
      residue: startResidue + i,
      value: v,
      color: plddtColor(v),
    }));
  }, [values, startResidue]);

  const barWidth = Math.max(1, Math.min(6, 600 / Math.max(bars.length, 1)));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>pLDDT per-residue confidence</span>
        <div className="flex items-center gap-2">
          {[
            { label: "Very high (>90)", color: "#0053d6" },
            { label: "Confident (70-90)", color: "#65cbf3" },
            { label: "Low (50-70)", color: "#ffdb13" },
            { label: "Very low (<50)", color: "#ff7d45" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm" style={{ background: l.color }} />
              <span className="text-[9px]">{l.label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="hide-scrollbar overflow-x-auto rounded-lg border border-border bg-background/30 p-2" style={{ height }}>
        <svg width={bars.length * (barWidth + 0.5)} height={height - 24} className="block">
          {bars.map((bar, i) => {
            const barH = (bar.value / 100) * (height - 40);
            return (
              <g key={i}>
                <rect x={i * (barWidth + 0.5)} y={height - 40 - barH}
                  width={barWidth} height={barH} fill={bar.color} rx={barWidth > 3 ? 1 : 0}>
                  <title>{`Residue ${bar.residue}: pLDDT ${bar.value.toFixed(1)}`}</title>
                </rect>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
