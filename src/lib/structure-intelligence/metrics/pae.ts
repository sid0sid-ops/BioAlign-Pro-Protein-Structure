import type { PaeMetric } from "../types";

function downsampleMatrix(matrix: number[][], maxSize = 80) {
  if (matrix.length <= maxSize) return matrix.map((row) => row.slice(0, maxSize));
  const step = Math.ceil(matrix.length / maxSize);
  const output: number[][] = [];
  for (let row = 0; row < matrix.length; row += step) {
    const values: number[] = [];
    for (let column = 0; column < matrix[row].length; column += step) {
      values.push(Number(matrix[row][column].toFixed(2)));
    }
    output.push(values);
  }
  return output;
}

export function summarizePaeMatrix(matrix: number[][], matrixUrl: string): PaeMetric {
  if (!matrix.length) {
    return {
      available: false,
      reason: "No PAE matrix was available in the AlphaFold source data.",
      method: "AlphaFold PAE JSON parsing",
      source: "AlphaFold DB"
    };
  }

  let total = 0;
  let count = 0;
  for (const row of matrix) {
    for (const value of row) {
      if (Number.isFinite(value)) {
        total += value;
        count += 1;
      }
    }
  }

  return {
    available: true,
    matrixUrl,
    downsampledMatrix: downsampleMatrix(matrix),
    matrixSize: matrix.length,
    meanPae: Number((total / Math.max(count, 1)).toFixed(2)),
    domainPairPae: [],
    highUncertaintyRegions: [],
    source: "AlphaFold DB"
  };
}
