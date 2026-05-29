"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedScoreBarProps {
  value: number;
  max?: number;
  label: string;
  sublabel?: string;
  colorScale?: "teal" | "violet" | "blue" | "amber" | "rose" | "gradient";
  showValue?: boolean;
  className?: string;
}

const barColors: Record<string, string> = {
  teal: "from-teal-500 to-teal-400",
  violet: "from-violet-500 to-purple-400",
  blue: "from-blue-500 to-cyan-400",
  amber: "from-amber-500 to-yellow-400",
  rose: "from-rose-500 to-pink-400",
  gradient: "from-teal-500 via-blue-500 to-violet-500",
};

export function AnimatedScoreBar({
  value, max = 100, label, sublabel, colorScale = "gradient", showValue = true, className,
}: AnimatedScoreBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {showValue && <>{value}{sublabel ? ` ${sublabel}` : `/${max}`}</>}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", barColors[colorScale])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ boxShadow: "0 0 8px rgba(20, 184, 166, 0.3)" }}
        />
      </div>
    </div>
  );
}
