import type { SequenceMetrics } from "@/types/protein";
import { calculateSequenceMetrics, validateProteinSequence } from "@/utils/sequence";

export interface SequenceAnalysisResponse {
  name: string;
  validation: {
    clean: string;
    isValid: boolean;
    invalidResidues: string[];
  };
  metrics: SequenceMetrics;
}

export async function analyzeSequence(
  sequence: string,
  name = "Untitled sequence"
): Promise<SequenceAnalysisResponse> {
  const validation = validateProteinSequence(sequence);
  return {
    name,
    validation,
    metrics: calculateSequenceMetrics(validation.clean)
  };
}
