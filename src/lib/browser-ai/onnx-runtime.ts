import { supportsWebGpu } from "@/lib/intelligence/runtime";
import { publicAssetPath } from "@/lib/static-data/data-pack-loader";
import type { BrowserModelManifest } from "./model-registry";

export interface BrowserAiCapabilities {
  webgpu: boolean;
  wasm: boolean;
  lowMemoryMode: boolean;
  selectedExecutionProvider: "webgpu" | "wasm" | "cpu";
}

export async function getBrowserAiCapabilities(): Promise<BrowserAiCapabilities> {
  const { isLowMemoryDevice } = await import("@/lib/intelligence/runtime");
  const webgpu = supportsWebGpu() && !isLowMemoryDevice();
  return {
    webgpu,
    wasm: typeof WebAssembly !== "undefined",
    lowMemoryMode: isLowMemoryDevice(),
    selectedExecutionProvider: webgpu ? "webgpu" : "wasm"
  };
}

export async function createOnnxSession(model: BrowserModelManifest) {
  const ort = await import("onnxruntime-web");
  const capabilities = await getBrowserAiCapabilities();
  const executionProviders = model.preferredExecutionProviders.filter((provider) => {
    if (provider === "webgpu") return capabilities.webgpu;
    if (provider === "wasm") return capabilities.wasm;
    return true;
  });

  ort.env.wasm.wasmPaths = publicAssetPath("/models/ort/");

  return ort.InferenceSession.create(publicAssetPath(model.modelUrl), {
    executionProviders: executionProviders.length ? executionProviders : ["wasm"]
  });
}
