"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/utils";

export function OfflineDataCache() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    let cancelled = false;

    async function registerOfflineCache() {
      try {
        const registration = await navigator.serviceWorker.register(withBasePath("/offline-sw.js"), {
          scope: withBasePath("/")
        });
        if (cancelled) return;

        const worker = registration.active ?? registration.waiting ?? registration.installing;
        if (worker) {
          worker.postMessage({ type: "CACHE_SELECTED_PROTEIN_DATA" });
        }

        if (registration.installing) {
          registration.installing.addEventListener("statechange", () => {
            if (registration.active) {
              registration.active.postMessage({ type: "CACHE_SELECTED_PROTEIN_DATA" });
            }
          });
        }
      } catch {
        // Offline support is progressive. The static data loader and IndexedDB still work without a service worker.
      }
    }

    registerOfflineCache();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
