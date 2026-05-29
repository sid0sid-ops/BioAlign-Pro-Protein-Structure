"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricRingProps {
  metrics: Array<{ label: string; value: number; max?: number; color?: string }>;
  size?: number;
  className?: string;
}

export function MetricRing({ metrics, size = 160, className }: MetricRingProps) {
  const strokeWidth = 6;
  const gap = 4;
  const center = size / 2;
  const defaultColors = ["#14b8a6", "#3b82f6", "#8b5cf6", "#f59e0b", "#f43f5e"];

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {metrics.map((metric, i) => {
          const radius = center - strokeWidth / 2 - i * (strokeWidth + gap);
          const circumference = 2 * Math.PI * radius;
          const progress = Math.min((metric.value / (metric.max ?? 100)), 1);
          const color = metric.color ?? defaultColors[i % defaultColors.length];
          return (
            <g key={metric.label}>
              <circle cx={center} cy={center} r={radius} fill="none"
                stroke="hsl(var(--border))" strokeWidth={strokeWidth} opacity={0.2} />
              <motion.circle cx={center} cy={center} r={radius} fill="none"
                stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - progress) }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ filter: `drop-shadow(0 0 4px ${color}50)` }} />
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {metrics.map((metric, i) => (
          <span key={metric.label} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ background: metric.color ?? defaultColors[i % defaultColors.length] }} />
            {metric.label}: {metric.value}
          </span>
        ))}
      </div>
    </div>
  );
}
