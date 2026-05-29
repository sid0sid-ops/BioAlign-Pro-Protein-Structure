export function isLowMemoryDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return mobile || memory <= 4 || cores <= 4;
}

export function supportsWebGpu() {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

export function supportsWorkers() {
  return typeof Worker !== "undefined";
}
