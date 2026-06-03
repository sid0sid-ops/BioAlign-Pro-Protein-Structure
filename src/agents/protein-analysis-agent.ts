/**
 * Client-only analysis agent.
 *
 * This agent intentionally avoids API calls so BioAlign-Pro-Protein-Structure can run from
 * GitHub Pages after the build machine is shut down.
 */

import { runClientIntelligence } from "@/lib/intelligence/worker-client";
import { detectInputType } from "@/services/input-detector";
import { useAnalysisStore } from "@/store/analysis-store";
import { useWorkbenchStore } from "@/store/workbench-store";

export async function runProteinAnalysisAgent(input: string) {
  const analysisStore = useAnalysisStore.getState();
  const workbenchStore = useWorkbenchStore.getState();

  analysisStore.resetPipeline();
  analysisStore.setIsRunning(true);

  try {
    analysisStore.updateStep("input-detection", {
      status: "running",
      progress: 50,
      metric: "Local"
    });

    const detection = detectInputType(input);
    workbenchStore.setRawInput(input);
    workbenchStore.setInputDetection(detection);
    workbenchStore.addSearchHistory(input, detection.type);

    analysisStore.updateStep("input-detection", {
      status: "complete",
      progress: 100,
      metric: detection.type.replace(/_/g, " ").toUpperCase()
    });

    analysisStore.updateStep("db-aggregation", {
      status: "running",
      progress: 40,
      metric: "Static packs"
    });

    const intelligence = await runClientIntelligence(detection.value || input);
    if (intelligence.input.sequenceClass !== "identifier") {
      workbenchStore.setSequence(intelligence.input.cleaned);
    }

    workbenchStore.setAnalysisResult("client-intelligence", {
      provider: "client-intelligence",
      status: "success",
      data: intelligence
    });

    analysisStore.updateStep("db-aggregation", {
      status: "complete",
      progress: 100,
      metric: "Worker complete"
    });

    analysisStore.updateStep("homology-blast", {
      status: "warning",
      progress: 100,
      metric: "Backend disabled"
    });

    analysisStore.updateStep("structure-retrieval", {
      status: "warning",
      progress: 100,
      metric: "Static viewer"
    });

    analysisStore.setOverallProgress(100);
    analysisStore.setIsRunning(false);
  } catch (error) {
    analysisStore.setError(error instanceof Error ? error.message : "Client analysis failed");
    analysisStore.setIsRunning(false);
  }
}
