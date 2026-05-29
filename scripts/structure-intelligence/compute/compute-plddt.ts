import { summarizePlddt } from "../../../src/lib/structure-intelligence/metrics/plddt";
import type { PlddtMetric } from "../../../src/lib/structure-intelligence/types";

export interface AlphaFoldConfidenceJson {
  confidenceScore?: number[];
}

export function computePlddt(confidence: AlphaFoldConfidenceJson | null): PlddtMetric {
  return summarizePlddt(confidence?.confidenceScore ?? []);
}
