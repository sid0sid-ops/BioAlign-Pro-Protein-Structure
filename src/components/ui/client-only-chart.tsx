"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { Skeleton } from "./skeleton";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ClientOnlyChart({ children, className = "h-full w-full" }: { children: ReactNode; className?: string }) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return <Skeleton className={className} />;
  }

  return children;
}
