import { summarizePaeMatrix } from "../../../src/lib/structure-intelligence/metrics/pae";
import type { PaeMetric } from "../../../src/lib/structure-intelligence/types";

export interface AlphaFoldPaeJson {
  predicted_aligned_error?: number[][];
}

export function computePaeSummary(pae: AlphaFoldPaeJson | AlphaFoldPaeJson[] | null, matrixUrl = ""): PaeMetric {
  const payload = Array.isArray(pae) ? pae[0] : pae;
  return summarizePaeMatrix(payload?.predicted_aligned_error ?? [], matrixUrl);
}
