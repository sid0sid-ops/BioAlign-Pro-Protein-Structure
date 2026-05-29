import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "danger" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        variant === "default" && "bg-primary/12 text-primary",
        variant === "success" && "bg-success/12 text-success",
        variant === "warning" && "bg-warning/14 text-warning",
        variant === "danger" && "bg-danger/12 text-danger",
        variant === "outline" && "border border-border bg-background/40 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
