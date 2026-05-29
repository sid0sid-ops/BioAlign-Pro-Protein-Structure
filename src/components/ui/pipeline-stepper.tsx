"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Gauge, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface PipelineStepData {
  id: string;
  title: string;
  description: string;
  status: "queued" | "running" | "complete" | "warning" | "error";
  progress: number;
  metric: string;
}

interface PipelineStepperProps {
  steps: PipelineStepData[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const statusConfig = {
  complete: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  running: { icon: Loader2, color: "text-blue-500", bg: "bg-blue-500/10", animate: true },
  warning: { icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10" },
  error: { icon: XCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
  queued: { icon: CircleDashed, color: "text-muted-foreground", bg: "bg-muted/50" },
};

export function PipelineStepper({ steps, orientation = "horizontal", className }: PipelineStepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div className={cn(isVertical ? "space-y-3" : "grid gap-3", !isVertical && `grid-cols-${Math.min(steps.length, 4)}`, className)}
      style={!isVertical ? { gridTemplateColumns: `repeat(${Math.min(steps.length, 4)}, 1fr)` } : undefined}>
      {steps.map((step, i) => {
        const config = statusConfig[step.status];
        const Icon = config.icon;
        return (
          <motion.div key={step.id}
            className="relative rounded-lg border border-border bg-background/55 p-4"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }} whileHover={{ y: -3 }}>
            <div className="flex items-center justify-between gap-2">
              <span className={cn("rounded-lg p-2", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color, "animate" in config && "animate-spin")} />
              </span>
              <Badge variant={step.status === "complete" ? "success" : step.status === "running" ? "default" : "outline"}>
                {step.metric}
              </Badge>
            </div>
            <h4 className="mt-3 text-sm font-semibold">{step.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{step.description}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/50">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
                initial={{ width: 0 }} animate={{ width: `${step.progress}%` }}
                transition={{ duration: 1, delay: i * 0.1 }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
