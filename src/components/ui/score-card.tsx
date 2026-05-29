"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  description?: string;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  className?: string;
}

const variantStyles = {
  default: "from-primary/10 to-primary/5 border-primary/20",
  success: "from-emerald-500/10 to-teal-500/5 border-teal-500/20",
  warning: "from-amber-500/10 to-orange-500/5 border-amber-500/20",
  danger: "from-rose-500/10 to-red-500/5 border-rose-500/20",
  accent: "from-violet-500/10 to-purple-500/5 border-violet-500/20",
};

const trendColors = {
  up: "text-emerald-500",
  down: "text-rose-500",
  neutral: "text-muted-foreground",
};

export function ScoreCard({
  icon: Icon, label, value, trend, trendDirection = "neutral", description, variant = "default", className,
}: ScoreCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "rounded-xl border bg-gradient-to-br p-4 transition-shadow hover:shadow-lg",
        variantStyles[variant], className
      )}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <span className="rounded-lg bg-muted p-2">
            <Icon className="h-4 w-4 text-primary" />
          </span>
        )}
        {trend && (
          <span className={cn("text-xs font-medium", trendColors[trendDirection])}>
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
