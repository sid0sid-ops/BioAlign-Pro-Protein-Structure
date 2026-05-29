import type { RmsdComparisonResult } from "../types";

export interface Coordinate3D {
  x: number;
  y: number;
  z: number;
}

export interface PairedAtomCoordinate {
  residueA: number;
  residueB: number;
  atomA: Coordinate3D;
  atomB: Coordinate3D;
}

function centroid(points: Coordinate3D[]) {
  const total = points.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
      z: acc.z + point.z
    }),
    { x: 0, y: 0, z: 0 }
  );
  const divisor = Math.max(points.length, 1);
  return {
    x: total.x / divisor,
    y: total.y / divisor,
    z: total.z / divisor
  };
}

function subtract(point: Coordinate3D, origin: Coordinate3D) {
  return {
    x: point.x - origin.x,
    y: point.y - origin.y,
    z: point.z - origin.z
  };
}

function covarianceMatrix(left: Coordinate3D[], right: Coordinate3D[]) {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  for (let index = 0; index < left.length; index += 1) {
    const a = left[index];
    const b = right[index];
    matrix[0][0] += a.x * b.x;
    matrix[0][1] += a.x * b.y;
    matrix[0][2] += a.x * b.z;
    matrix[1][0] += a.y * b.x;
    matrix[1][1] += a.y * b.y;
    matrix[1][2] += a.y * b.z;
    matrix[2][0] += a.z * b.x;
    matrix[2][1] += a.z * b.y;
    matrix[2][2] += a.z * b.z;
  }

  return matrix;
}

function quaternionMatrix(covariance: number[][]) {
  const [[sxx, sxy, sxz], [syx, syy, syz], [szx, szy, szz]] = covariance;
  return [
    [sxx + syy + szz, syz - szy, szx - sxz, sxy - syx],
    [syz - szy, sxx - syy - szz, sxy + syx, szx + sxz],
    [szx - sxz, sxy + syx, -sxx + syy - szz, syz + szy],
    [sxy - syx, szx + sxz, syz + szy, -sxx - syy + szz]
  ];
}

function dominantQuaternion(matrix: number[][]) {
  let vector = [1, 0, 0, 0];
  for (let iteration = 0; iteration < 24; iteration += 1) {
    const next = matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
    const norm = Math.hypot(...next) || 1;
    vector = next.map((value) => value / norm);
  }
  return vector;
}

function rotateByQuaternion(point: Coordinate3D, quaternion: number[]) {
  const [w, x, y, z] = quaternion;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;
  const wx = w * x;
  const wy = w * y;
  const wz = w * z;

  return {
    x: (1 - 2 * (yy + zz)) * point.x + 2 * (xy - wz) * point.y + 2 * (xz + wy) * point.z,
    y: 2 * (xy + wz) * point.x + (1 - 2 * (xx + zz)) * point.y + 2 * (yz - wx) * point.z,
    z: 2 * (xz - wy) * point.x + 2 * (yz + wx) * point.y + (1 - 2 * (xx + yy)) * point.z
  };
}

function interpretationForRmsd(rmsd: number): "Low deviation" | "Moderate deviation" | "High deviation" {
  if (rmsd < 2) return "Low deviation";
  if (rmsd < 5) return "Moderate deviation";
  return "High deviation";
}

export function computeCalphaRmsd(
  pairedAtoms: PairedAtomCoordinate[],
  options: {
    queryStructure: string;
    templateStructure: string;
    chainA: string;
    chainB: string;
    source?: string;
  }
): RmsdComparisonResult {
  if (pairedAtoms.length < 3) {
    return {
      available: false,
      reason: "At least three paired C-alpha coordinates are required for structural superposition.",
      method: "Kabsch superposition",
      source: options.source ?? "Browser Computed"
    };
  }

  const leftCentroid = centroid(pairedAtoms.map((pair) => pair.atomA));
  const rightCentroid = centroid(pairedAtoms.map((pair) => pair.atomB));
  const centeredLeft = pairedAtoms.map((pair) => subtract(pair.atomA, leftCentroid));
  const centeredRight = pairedAtoms.map((pair) => subtract(pair.atomB, rightCentroid));
  const covariance = covarianceMatrix(centeredLeft, centeredRight);
  const quaternion = dominantQuaternion(quaternionMatrix(covariance));

  const squaredDistance = centeredLeft.reduce((sum, point, index) => {
    const rotated = rotateByQuaternion(point, quaternion);
    const target = centeredRight[index];
    return sum + (rotated.x - target.x) ** 2 + (rotated.y - target.y) ** 2 + (rotated.z - target.z) ** 2;
  }, 0);
  const rmsd = Math.sqrt(squaredDistance / pairedAtoms.length);

  return {
    available: true,
    queryStructure: options.queryStructure,
    templateStructure: options.templateStructure,
    chainA: options.chainA,
    chainB: options.chainB,
    atomType: "CA",
    alignedResidues: pairedAtoms.length,
    rmsd: Number(rmsd.toFixed(3)),
    method: "Kabsch superposition",
    interpretation: interpretationForRmsd(rmsd),
    source: options.source ?? "Browser Computed"
  };
}
