"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface TemplateCardProps {
  pdbId: string;
  chainId: string;
  title: string;
  organism: string;
  resolution: number;
  sequenceIdentity: number;
  coverage: number;
  eValue: number;
  foldseekScore?: number;
  method?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

function identityColor(identity: number) {
  if (identity >= 50) return "success";
  if (identity >= 30) return "warning";
  return "destructive";
}

export function TemplateCard({
  pdbId, chainId, title, organism, resolution, sequenceIdentity, coverage,
  eValue, foldseekScore, method, isSelected, onSelect, className,
}: TemplateCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={cn(
        "cursor-pointer rounded-xl border bg-background/55 p-4 transition-all",
        isSelected ? "border-primary/50 shadow-glow" : "border-border hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-sm font-bold text-primary">
              {pdbId}
            </span>
            <span className="text-xs text-muted-foreground">Chain {chainId}</span>
            {method && <Badge variant="outline" className="text-[10px]">{method}</Badge>}
          </div>
          <p className="mt-1.5 truncate text-sm text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground/70">{organism}</p>
        </div>
        <Badge variant={identityColor(sequenceIdentity) as any}>{sequenceIdentity}%</Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <MetricBar label="Identity" value={sequenceIdentity} color="teal" />
        <MetricBar label="Coverage" value={coverage} color="blue" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-muted-foreground">
        <span>Res: {resolution} Å</span>
        <span>E: {eValue.toExponential(1)}</span>
        {foldseekScore !== undefined && <span>FS: {(foldseekScore * 100).toFixed(0)}%</span>}
      </div>
    </motion.div>
  );
}

function MetricBar({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = { teal: "#14b8a6", blue: "#3b82f6", violet: "#8b5cf6" };
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-muted/50">
        <motion.div className="h-full rounded-full" style={{ background: colors[color] ?? colors.teal }}
          initial={{ width: 0 }} animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }} />
      </div>
    </div>
  );
}
