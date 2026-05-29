export interface ProviderEnvelope<T> {
  data: T;
  cacheHit?: boolean;
  cacheLayer?: string;
  stale?: boolean;
}

export function unwrapProviderData<T>(value: T | ProviderEnvelope<T> | null | undefined): T | null {
  if (value == null) return null;
  if (typeof value === "object" && "data" in value) {
    return (value as ProviderEnvelope<T>).data;
  }
  return value as T;
}

export function asArray<T>(value: T[] | T | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  return value == null ? [] : [value];
}

export function compact<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => item != null);
}

export function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function numberOrUndefined(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function textOrUndefined(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}
