import { analyzeScientificInput } from "@/lib/intelligence/rule-engine";
import { resolveProteinQuery } from "@/lib/intelligence/query-engine";
import type { IntelligenceWorkerRequest, IntelligenceWorkerResponse } from "@/lib/intelligence/types";

self.onmessage = async (event: MessageEvent<IntelligenceWorkerRequest>) => {
  const request = event.data;

  try {
    if (request.type === "analyze") {
      const result = analyzeScientificInput(request.input, request.options);
      const response: IntelligenceWorkerResponse = {
        id: request.id,
        type: "result",
        result: {
          ...result,
          runtime: {
            ...result.runtime,
            executedInWorker: true
          }
        }
      };
      self.postMessage(response);
      return;
    }

    if (request.type === "resolve-query") {
      const result = await resolveProteinQuery(request.query, request.options);
      const response: IntelligenceWorkerResponse = {
        id: request.id,
        type: "protein-query-result",
        result
      };
      self.postMessage(response);
    }
  } catch (error) {
    const response: IntelligenceWorkerResponse = {
      id: request.id,
      type: "error",
      error: error instanceof Error ? error.message : "Unknown worker error"
    };
    self.postMessage(response);
  }
};

export {};
