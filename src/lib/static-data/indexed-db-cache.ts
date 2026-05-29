interface CacheRecord<T> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
}

const DB_NAME = "bioalign-client-cache";
const STORE_NAME = "records";
const DB_VERSION = 1;

function openCacheDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function withStore<T>(mode: IDBTransactionMode, callback: (store: IDBObjectStore) => IDBRequest<T>) {
  const db = await openCacheDb();
  return new Promise<T>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const request = callback(transaction.objectStore(STORE_NAME));
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

export async function getIndexedDbCache<T>(key: string): Promise<T | null> {
  if (typeof indexedDB === "undefined") return null;
  try {
    const record = await withStore<CacheRecord<T> | undefined>("readonly", (store) => store.get(key));
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      await deleteIndexedDbCache(key);
      return null;
    }
    return record.value;
  } catch {
    return null;
  }
}

export async function setIndexedDbCache<T>(key: string, value: T, ttlMs = 24 * 60 * 60 * 1000) {
  if (typeof indexedDB === "undefined") return;
  const record: CacheRecord<T> = {
    key,
    value,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttlMs
  };
  try {
    await withStore<IDBValidKey>("readwrite", (store) => store.put(record));
  } catch {
    // IndexedDB is opportunistic; private browsing and quota failures should not break analysis.
  }
}

export async function deleteIndexedDbCache(key: string) {
  if (typeof indexedDB === "undefined") return;
  try {
    await withStore<undefined>("readwrite", (store) => store.delete(key));
  } catch {
    // no-op
  }
}
