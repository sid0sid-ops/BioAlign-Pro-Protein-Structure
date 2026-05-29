import type {
  NormalizedConfidence,
  NormalizedLigand,
  NormalizedPredictedModel,
  NormalizedStructureEntry
} from "../../types/intelligence";
import type { AlphaFoldPrediction } from "../integrations/alphafold";
import type { RcsbGraphqlEntry } from "../graphql/rcsb";
import { asArray, numberOrUndefined, uniqueBy } from "./utils";

export function normalizeAlphaFold(predictions: AlphaFoldPrediction[] | null): NormalizedPredictedModel[] {
  return asArray(predictions).map((prediction) => ({
    provider: "AlphaFold",
    accession: prediction.uniprotAccession,
    modelId: prediction.entryId,
    averagePlddt: prediction.confidenceAvg,
    pdbUrl: prediction.pdbUrl,
    cifUrl: prediction.cifUrl,
    paeUrl: prediction.paeDocUrl,
    createdAt: prediction.modelCreatedDate
  }));
}

export function normalizeConfidence(predictions: AlphaFoldPrediction[] | null): NormalizedConfidence {
  const averagePlddt = asArray(predictions)[0]?.confidenceAvg;

  return {
    averagePlddt,
    plddtHistogram: averagePlddt
      ? [
          { band: "very_high", count: averagePlddt >= 90 ? 1 : 0 },
          { band: "confident", count: averagePlddt >= 70 && averagePlddt < 90 ? 1 : 0 },
          { band: "low", count: averagePlddt >= 50 && averagePlddt < 70 ? 1 : 0 },
          { band: "very_low", count: averagePlddt < 50 ? 1 : 0 }
        ]
      : [],
    paeAvailable: Boolean(asArray(predictions)[0]?.paeDocUrl),
    modelVersion: asArray(predictions)[0]?.latestVersion
  };
}

export function normalizeRcsbEntries(entries: Array<RcsbGraphqlEntry | null>): NormalizedStructureEntry[] {
  return entries.filter(Boolean).map((entry) => {
    const typedEntry = entry as RcsbGraphqlEntry;
    const chains =
      typedEntry.polymer_entities?.flatMap((entity) => {
        const identifiers = entity.rcsb_polymer_entity_container_identifiers;
        const chainIds = identifiers?.auth_asym_ids ?? identifiers?.asym_ids ?? [];
        return chainIds.map((chainId) => ({
          id: chainId,
          description: entity.rcsb_polymer_entity?.pdbx_description,
          sequenceLength: entity.entity_poly?.rcsb_sample_sequence_length,
          organism: entity.rcsb_entity_source_organism?.[0]?.ncbi_scientific_name,
          taxonomyId: entity.rcsb_entity_source_organism?.[0]?.ncbi_taxonomy_id,
          uniprotIds: identifiers?.uniprot_ids ?? []
        }));
      }) ?? [];

    const ligands: NormalizedLigand[] =
      typedEntry.nonpolymer_entities?.map((entity) => {
        const chemComp = entity.nonpolymer_comp?.chem_comp;
        const id = chemComp?.id ?? entity.pdbx_entity_nonpoly?.comp_id ?? "unknown";
        return {
          id,
          name: chemComp?.name ?? entity.pdbx_entity_nonpoly?.name ?? id,
          formula: chemComp?.formula,
          molecularWeight: numberOrUndefined(chemComp?.formula_weight),
          source: "rcsb",
          externalUrl: `https://www.rcsb.org/ligand/${id}`
        };
      }) ?? [];

    return {
      pdbId: typedEntry.rcsb_id,
      title: typedEntry.struct?.title ?? typedEntry.struct?.pdbx_descriptor,
      experimentalMethod: typedEntry.exptl?.[0]?.method,
      resolution: typedEntry.rcsb_entry_info?.resolution_combined?.[0],
      depositedAtomCount: typedEntry.rcsb_entry_info?.deposited_atom_count,
      polymerEntityCount: typedEntry.rcsb_entry_info?.polymer_entity_count,
      chains,
      ligands: uniqueBy(ligands, (ligand) => ligand.id)
    };
  });
}
