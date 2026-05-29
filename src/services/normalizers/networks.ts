import type { NormalizedInteractionEdge, NormalizedInteractionNode } from "../../types/intelligence";
import type { StringNetworkResult } from "../integrations/string-db";
import { uniqueBy } from "./utils";

export function normalizeStringNetwork(network: StringNetworkResult | null) {
  if (!network) return { nodes: [] as NormalizedInteractionNode[], edges: [] as NormalizedInteractionEdge[], networkImageUrl: undefined };

  const edges = network.interactions.map((interaction) => ({
    source: {
      id: interaction.preferredName_A,
      label: interaction.preferredName_A,
      organism: interaction.ncbiTaxonId
    },
    target: {
      id: interaction.preferredName_B,
      label: interaction.preferredName_B,
      organism: interaction.ncbiTaxonId
    },
    score: interaction.score,
    evidence: {
      experimental: interaction.experimentalScore,
      database: interaction.databaseScore,
      textMining: interaction.textminingScore,
      coexpression: interaction.coexpressionScore
    }
  }));

  const nodes = uniqueBy(
    edges.flatMap((edge) => [edge.source, edge.target]),
    (node) => node.id
  );

  return {
    nodes,
    edges,
    networkImageUrl: network.networkImageUrl || undefined
  };
}
