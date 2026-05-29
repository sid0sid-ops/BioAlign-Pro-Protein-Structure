import type { ConfidenceRegion, PlddtMetric, PlddtSummary } from "../types";

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function regions(values: number[], predicate: (value: number) => boolean, label: string): ConfidenceRegion[] {
  const output: ConfidenceRegion[] = [];
  let start = -1;
  let runningTotal = 0;

  for (let index = 0; index <= values.length; index += 1) {
    const value = values[index];
    const active = typeof value === "number" && predicate(value);
    if (active && start === -1) {
      start = index;
      runningTotal = value;
    } else if (active) {
      runningTotal += value;
    }

    if ((!active || index === values.length) && start !== -1) {
      const end = index;
      const length = end - start;
      if (length >= 5) {
        output.push({
          start: start + 1,
          end,
          mean: Number((runningTotal / length).toFixed(2)),
          label
        });
      }
      start = -1;
      runningTotal = 0;
    }
  }

  return output.slice(0, 12);
}

export function summarizePlddt(values: number[], source: "AlphaFold DB" = "AlphaFold DB"): PlddtMetric {
  const cleaned = values.filter((value) => Number.isFinite(value));
  if (!cleaned.length) {
    return {
      available: false,
      reason: "No per-residue pLDDT values were available in the AlphaFold source data.",
      method: "AlphaFold confidence JSON parsing",
      source
    };
  }

  const count = cleaned.length;
  const summary: PlddtSummary = {
    available: true,
    mean: Number((cleaned.reduce((sum, value) => sum + value, 0) / count).toFixed(2)),
    median: Number(median(cleaned).toFixed(2)),
    bins: {
      veryHigh_90_100: Number((cleaned.filter((value) => value >= 90).length / count).toFixed(3)),
      confident_70_90: Number((cleaned.filter((value) => value >= 70 && value < 90).length / count).toFixed(3)),
      low_50_70: Number((cleaned.filter((value) => value >= 50 && value < 70).length / count).toFixed(3)),
      veryLow_0_50: Number((cleaned.filter((value) => value < 50).length / count).toFixed(3))
    },
    perResidue: cleaned,
    lowConfidenceRegions: regions(cleaned, (value) => value < 70, "Low pLDDT"),
    highConfidenceRegions: regions(cleaned, (value) => value >= 90, "Very high pLDDT"),
    source
  };

  return summary;
}
