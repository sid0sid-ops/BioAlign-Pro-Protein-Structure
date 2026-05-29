import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function sanitizeSequence(value: string) {
  return value
    .toUpperCase()
    .replace(/^>.*$/gm, "")
    .replace(/[^ARNDCEQGHILKMFPSTWYV]/g, "");
}

export function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
