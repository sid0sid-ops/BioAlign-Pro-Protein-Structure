"use client";

import { Heatmap } from "./heatmap";
import { cn } from "@/lib/utils";

interface PAEMatrixViewerProps {
  paeData: number[][] | null;
  title?: string;
  className?: string;
}

export function PAEMatrixViewer({ paeData, title = "Predicted Aligned Error (PAE)", className }: PAEMatrixViewerProps) {
  if (!paeData || paeData.length === 0) {
    return (
      <div className={cn("rounded-lg border border-border bg-background/30 p-8 text-center text-sm text-muted-foreground", className)}>
        No PAE data available. PAE matrices are provided by AlphaFold DB for predicted structures.
      </div>
    );
  }

  // Downsample large matrices for performance
  const maxDisplay = 100;
  let displayData = paeData;
  if (paeData.length > maxDisplay) {
    const step = Math.ceil(paeData.length / maxDisplay);
    displayData = [];
    for (let i = 0; i < paeData.length; i += step) {
      const row: number[] = [];
      for (let j = 0; j < paeData[i].length; j += step) {
        row.push(paeData[i][j]);
      }
      displayData.push(row);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Heatmap
        data={displayData}
        title={title}
        colorScale="teal-violet"
        cellSize={Math.max(3, Math.min(8, 400 / displayData.length))}
      />
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Low error (high confidence)</span>
        <div className="h-2 w-24 rounded-full" style={{ background: "linear-gradient(to right, #14b8a6, #8b5cf6)" }} />
        <span>High error (low confidence)</span>
      </div>
    </div>
  );
}
