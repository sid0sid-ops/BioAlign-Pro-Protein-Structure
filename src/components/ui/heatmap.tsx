"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface HeatmapProps {
  data: number[][];
  xLabels?: string[];
  yLabels?: string[];
  colorScale?: "turbo" | "viridis" | "plasma" | "teal-violet";
  title?: string;
  cellSize?: number;
  className?: string;
  onCellClick?: (row: number, col: number, value: number) => void;
}

function interpolateColor(value: number, min: number, max: number, scale: string): string {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  if (scale === "teal-violet") {
    const r = Math.round(20 + t * 119);
    const g = Math.round(184 - t * 92);
    const b = Math.round(166 + t * 80);
    return `rgb(${r},${g},${b})`;
  }
  // Turbo colormap approximation
  const r = Math.round(Math.max(0, Math.min(255, 34 + t * 255 * (1 - Math.abs(t - 0.65) * 3))));
  const g = Math.round(Math.max(0, Math.min(255, t < 0.5 ? t * 510 : (1 - t) * 510)));
  const b = Math.round(Math.max(0, Math.min(255, t < 0.35 ? 150 + t * 300 : Math.max(0, (0.7 - t) * 400))));
  return `rgb(${r},${g},${b})`;
}

export function Heatmap({ data, xLabels, yLabels, colorScale = "turbo", title, cellSize = 24, className, onCellClick }: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; value: number } | null>(null);

  const { min, max } = useMemo(() => {
    let mn = Infinity, mx = -Infinity;
    for (const row of data) for (const v of row) { mn = Math.min(mn, v); mx = Math.max(mx, v); }
    return { min: mn, max: mx };
  }, [data]);

  return (
    <div className={cn("relative", className)}>
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}
      <div className="hide-scrollbar overflow-auto rounded-lg border border-border bg-background/30 p-2">
        <div className="inline-grid gap-px" style={{ gridTemplateColumns: `${yLabels ? "3rem " : ""}repeat(${data[0]?.length ?? 0}, ${cellSize}px)` }}>
          {data.map((row, ri) => (
            <>
              {yLabels && <span key={`yl-${ri}`} className="flex items-center pr-1 text-[9px] text-muted-foreground">{yLabels[ri]}</span>}
              {row.map((value, ci) => (
                <span
                  key={`${ri}-${ci}`}
                  className="cursor-pointer rounded-sm transition-transform hover:scale-125 hover:z-10"
                  style={{ width: cellSize, height: cellSize, background: interpolateColor(value, min, max, colorScale) }}
                  title={`[${ri},${ci}] = ${value.toFixed(2)}`}
                  onMouseEnter={() => setHoveredCell({ row: ri, col: ci, value })}
                  onMouseLeave={() => setHoveredCell(null)}
                  onClick={() => onCellClick?.(ri, ci, value)}
                />
              ))}
            </>
          ))}
        </div>
      </div>
      {hoveredCell && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 text-xs shadow-lg">
          [{hoveredCell.row}, {hoveredCell.col}] = {hoveredCell.value.toFixed(2)}
        </div>
      )}
    </div>
  );
}
