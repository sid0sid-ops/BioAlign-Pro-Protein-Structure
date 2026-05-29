import type { DomainAnnotation, StructureIntelligencePack } from "../../../src/lib/structure-intelligence/types";

export function normalizeDomainRange(domain: DomainAnnotation, sequenceLength: number): DomainAnnotation {
  return {
    ...domain,
    start: Math.max(1, Math.min(domain.start, sequenceLength || domain.start)),
    end: Math.max(1, Math.min(domain.end, sequenceLength || domain.end))
  };
}

export function normalizeStructureIntelligencePack(pack: StructureIntelligencePack): StructureIntelligencePack {
  return {
    ...pack,
    domains: pack.domains.map((domain) => normalizeDomainRange(domain, pack.protein.length))
  };
}
