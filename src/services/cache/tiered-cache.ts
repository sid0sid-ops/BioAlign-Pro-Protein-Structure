import Redis from "ioredis";
import type { CacheLayer, CacheState } from "../../types/intelligence";

interface CacheRecord<T> {
  value: T;
  createdAt: number;
  staleAt: number;
  expiresAt: number;
}

export interface CacheHit<T> {
  key: string;
  value: T;
  layer: CacheLayer;
  state: CacheState;
  createdAt: number;
  staleAt: number;
  expiresAt: number;
}

export interface CacheStats {
  memoryEntries: number;
  memoryHits: number;
  redisHits: number;
  misses: number;
  writes: number;
  redisErrors: number;
  redisEnabled: boolean;
}

const memoryCache = new Map<string, CacheRecord<unknown>>();
const stats: CacheStats = {
  memoryEntries: 0,
  memoryHits: 0,
  redisHits: 0,
  misses: 0,
  writes: 0,
  redisErrors: 0,
  redisEnabled: Boolean(process.env.REDIS_URL)
};

let redis: Redis | null = null;
let redisSuppressedUntil = 0;

function now() {
  return Date.now();
}

function getRedis() {
  if (!process.env.REDIS_URL || now() < redisSuppressedUntil) return null;
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      lazyConnect: true
    });
    redis.on("error", () => {
      stats.redisErrors += 1;
      redisSuppressedUntil = now() + 30_000;
    });
  }
  return redis;
}

function stateFor(record: CacheRecord<unknown>): CacheState | null {
  const timestamp = now();
  if (timestamp > record.expiresAt) return null;
  return timestamp > record.staleAt ? "stale" : "fresh";
}

function toRecord<T>(value: T, ttlSeconds: number, staleSeconds: number): CacheRecord<T> {
  const createdAt = now();
  return {
    value,
    createdAt,
    staleAt: createdAt + staleSeconds * 1000,
    expiresAt: createdAt + ttlSeconds * 1000
  };
}

function remember<T>(key: string, record: CacheRecord<T>) {
  memoryCache.set(key, record);
  stats.memoryEntries = memoryCache.size;
}

export async function getTieredCache<T>(key: string): Promise<CacheHit<T> | null> {
  const memoryRecord = memoryCache.get(key) as CacheRecord<T> | undefined;
  if (memoryRecord) {
    const state = stateFor(memoryRecord);
    if (state) {
      stats.memoryHits += 1;
      return {
        key,
        value: memoryRecord.value,
        layer: "memory",
        state,
        createdAt: memoryRecord.createdAt,
        staleAt: memoryRecord.staleAt,
        expiresAt: memoryRecord.expiresAt
      };
    }
    memoryCache.delete(key);
    stats.memoryEntries = memoryCache.size;
  }

  const client = getRedis();
  if (!client) {
    stats.misses += 1;
    return null;
  }

  try {
    const raw = await client.get(key);
    if (!raw) {
      stats.misses += 1;
      return null;
    }

    const parsed = JSON.parse(raw) as CacheRecord<T> | T;
    const record =
      typeof parsed === "object" && parsed !== null && "value" in parsed && "expiresAt" in parsed
        ? (parsed as CacheRecord<T>)
        : toRecord(parsed as T, 3600, 300);
    const state = stateFor(record);

    if (!state) {
      await client.del(key);
      stats.misses += 1;
      return null;
    }

    remember(key, record);
    stats.redisHits += 1;
    return {
      key,
      value: record.value,
      layer: "redis",
      state,
      createdAt: record.createdAt,
      staleAt: record.staleAt,
      expiresAt: record.expiresAt
    };
  } catch {
    stats.redisErrors += 1;
    stats.misses += 1;
    redisSuppressedUntil = now() + 30_000;
    return null;
  }
}

export async function setTieredCache<T>(
  key: string,
  value: T,
  ttlSeconds = 3600,
  staleSeconds = Math.max(60, Math.floor(ttlSeconds * 0.25))
) {
  const record = toRecord(value, ttlSeconds, Math.min(staleSeconds, ttlSeconds));
  remember(key, record);
  stats.writes += 1;

  const client = getRedis();
  if (!client) return;

  try {
    await client.set(key, JSON.stringify(record), "EX", ttlSeconds);
  } catch {
    stats.redisErrors += 1;
    redisSuppressedUntil = now() + 30_000;
  }
}

export async function deleteTieredCache(key: string) {
  memoryCache.delete(key);
  stats.memoryEntries = memoryCache.size;

  const client = getRedis();
  if (!client) return;

  try {
    await client.del(key);
  } catch {
    stats.redisErrors += 1;
    redisSuppressedUntil = now() + 30_000;
  }
}

export function getTieredCacheStats(): CacheStats {
  return {
    ...stats,
    memoryEntries: memoryCache.size,
    redisEnabled: Boolean(process.env.REDIS_URL)
  };
}

export async function getCachedJson<T>(key: string): Promise<T | null> {
  const hit = await getTieredCache<T>(key);
  return hit?.value ?? null;
}

export async function getCachedJsonHit<T>(key: string): Promise<CacheHit<T> | null> {
  return getTieredCache<T>(key);
}

export async function setCachedJson<T>(key: string, value: T, ttlSeconds = 3600) {
  await setTieredCache(key, value, ttlSeconds);
}
