import { computeCalphaRmsd, type PairedAtomCoordinate } from "../../../src/lib/structure-intelligence/metrics/rmsd";
import type { RmsdComparisonResult } from "../../../src/lib/structure-intelligence/types";

export function computeRmsdFromPairedCalphas(
  pairedAtoms: PairedAtomCoordinate[],
  options: {
    queryStructure: string;
    templateStructure: string;
    chainA: string;
    chainB: string;
  }
): RmsdComparisonResult {
  return computeCalphaRmsd(pairedAtoms, {
    ...options,
    source: "computed-build-time"
  });
}
