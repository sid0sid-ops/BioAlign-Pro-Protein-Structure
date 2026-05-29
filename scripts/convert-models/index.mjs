import path from "node:path";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { ensureRuntimeDirs, modelsDir, rootDir, writeJson } from "../shared/static-pipeline.mjs";

await ensureRuntimeDirs();

const ortSourceDir = path.join(rootDir, "node_modules", "onnxruntime-web", "dist");
const ortTargetDir = path.join(modelsDir, "ort");
await mkdir(ortTargetDir, { recursive: true });

try {
  const files = await readdir(ortSourceDir);
  await Promise.all(
    files
      .filter((file) => file.endsWith(".wasm") || file.endsWith(".mjs"))
      .map((file) => copyFile(path.join(ortSourceDir, file), path.join(ortTargetDir, file)))
  );
} catch {
  console.warn("ONNX Runtime Web assets were not copied. Install onnxruntime-web before converting browser models.");
}

await writeJson(path.join(modelsDir, "manifest.json"), {
  generatedAt: new Date().toISOString(),
  models: [],
  note: "Place quantized ONNX models under public/models/<model-id>/model.onnx. Conversion is a build-time step only."
});

console.log("Prepared browser model manifest.");
