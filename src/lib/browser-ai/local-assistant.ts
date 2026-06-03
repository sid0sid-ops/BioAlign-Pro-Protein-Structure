import type { ClientIntelligenceResult } from "@/lib/intelligence/types";
import { isLowMemoryDevice } from "@/lib/intelligence/runtime";

export interface LocalAssistantState {
  enabled: boolean;
  provider: "webllm" | "transformers-js" | "rule-explainer";
  warning?: string;
}

export async function enableLocalAssistant(): Promise<LocalAssistantState> {
  if (isLowMemoryDevice()) {
    return {
      enabled: false,
      provider: "rule-explainer",
      warning: "Local AI is disabled by default on mobile or low-memory devices. The rule explainer remains available."
    };
  }

  const providerModule = process.env.NEXT_PUBLIC_LOCAL_AI_PROVIDER_MODULE;
  if (!providerModule) {
    return {
      enabled: true,
      provider: "rule-explainer",
      warning: "No local WebLLM or Transformers.js model is bundled yet; using deterministic explanations over loaded BioAlign-Pro-Protein-Structure data."
    };
  }

  try {
    await import(/* webpackIgnore: true */ providerModule);
    return { enabled: true, provider: providerModule.includes("web-llm") ? "webllm" : "transformers-js" };
  } catch {
    return {
      enabled: true,
      provider: "rule-explainer",
      warning: "Configured local AI provider could not be loaded. Falling back to deterministic explanations."
    };
  }
}

export function explainLoadedBioAlignData(result: ClientIntelligenceResult | null) {
  if (!result) return "Run a local analysis first, then enable explanations for the loaded result.";

  const type = result.input.sequenceClass;
  const motifs = result.motifs.length;
  const complexity = result.complexity.label;
  const invalid = result.metrics.invalidResidues.length;

  return [
    `This local analysis classifies the input as ${type}.`,
    `The rule engine found ${motifs} motif candidate${motifs === 1 ? "" : "s"} and ${complexity} sequence complexity.`,
    invalid
      ? `Review invalid symbols before downstream interpretation: ${result.metrics.invalidResidues.join(", ")}.`
      : "The inferred alphabet is internally consistent.",
    "This assistant explains loaded BioAlign-Pro-Protein-Structure data only; it does not predict protein structures."
  ].join(" ");
}
