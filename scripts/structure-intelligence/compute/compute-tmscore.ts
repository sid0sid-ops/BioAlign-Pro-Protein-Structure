import type { TmScoreComparisonResult } from "../../../src/lib/structure-intelligence/types";

export function computeTmScoreUnavailable(reason = "TM-align or Foldseek was not available during the static build."): TmScoreComparisonResult {
  return {
    available: false,
    reason,
    method: "TM-align/Foldseek/build-time",
    source: "computed-build-time"
  };
}
