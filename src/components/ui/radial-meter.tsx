"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadialMeterProps {
  value: number;
  max?: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  colorScale?: "teal" | "violet" | "blue" | "amber" | "rose" | "auto";
  className?: string;
}

function getColor(value: number, max: number, colorScale: string) {
  const ratio = value / max;
  if (colorScale !== "auto") {
    const colors: Record<string, string> = {
      teal: "#14b8a6", violet: "#8b5cf6", blue: "#3b82f6", amber: "#f59e0b", rose: "#f43f5e",
    };
    return colors[colorScale] ?? "#14b8a6";
  }
  if (ratio >= 0.8) return "#14b8a6";
  if (ratio >= 0.6) return "#3b82f6";
  if (ratio >= 0.4) return "#f59e0b";
  return "#f43f5e";
}

export function RadialMeter({
  value, max = 100, label, sublabel, size = 120, strokeWidth = 8, colorScale = "auto", className,
}: RadialMeterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const dashOffset = circumference * (1 - progress);
  const color = getColor(value, max, colorScale);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="hsl(var(--border))" strokeWidth={strokeWidth} opacity={0.3} />
          <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
            strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color}40)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className="text-xl font-bold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            {typeof value === "number" ? value.toFixed(value % 1 ? 1 : 0) : value}
          </motion.span>
          {sublabel && <span className="text-[10px] text-muted-foreground">{sublabel}</span>}
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
