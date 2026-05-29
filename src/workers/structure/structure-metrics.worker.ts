import { computeCalphaRmsd, type PairedAtomCoordinate } from "@/lib/structure-intelligence/metrics/rmsd";

interface RmsdWorkerRequest {
  id: string;
  type: "compute-rmsd";
  pairedAtoms: PairedAtomCoordinate[];
  queryStructure: string;
  templateStructure: string;
  chainA: string;
  chainB: string;
}

type StructureWorkerRequest = RmsdWorkerRequest;

self.onmessage = (event: MessageEvent<StructureWorkerRequest>) => {
  const request = event.data;

  try {
    if (request.type === "compute-rmsd") {
      self.postMessage({
        id: request.id,
        type: "rmsd-result",
        result: computeCalphaRmsd(request.pairedAtoms, {
          queryStructure: request.queryStructure,
          templateStructure: request.templateStructure,
          chainA: request.chainA,
          chainB: request.chainB,
          source: "Browser Computed"
        })
      });
    }
  } catch (error) {
    self.postMessage({
      id: request.id,
      type: "error",
      error: error instanceof Error ? error.message : "Unknown structure worker error"
    });
  }
};

export {};
