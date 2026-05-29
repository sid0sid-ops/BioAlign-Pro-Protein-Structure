export type BrowserModelTask = "sequence-type-classifier" | "protein-family-classifier" | "template-ranking-scorer" | "embedding-search";

export interface BrowserModelManifest {
  id: string;
  task: BrowserModelTask;
  modelUrl: string;
  quantized: boolean;
  preferredExecutionProviders: Array<"webgpu" | "wasm" | "cpu">;
  description: string;
}

export const BROWSER_MODEL_REGISTRY: BrowserModelManifest[] = [
  {
    id: "sequence-type-tiny-v1",
    task: "sequence-type-classifier",
    modelUrl: "/models/sequence-type-tiny-v1/model.onnx",
    quantized: true,
    preferredExecutionProviders: ["webgpu", "wasm", "cpu"],
    description: "Tiny local classifier scaffold for DNA/RNA/protein sequence typing."
  },
  {
    id: "template-ranker-tiny-v1",
    task: "template-ranking-scorer",
    modelUrl: "/models/template-ranker-tiny-v1/model.onnx",
    quantized: true,
    preferredExecutionProviders: ["webgpu", "wasm", "cpu"],
    description: "Tiny local scorer scaffold for ranking preloaded template candidates."
  }
];
