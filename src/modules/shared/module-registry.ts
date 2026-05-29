export const moduleRegistry = [
  "auth",
  "dashboard",
  "protein-structure",
  "homology-modeling",
  "threading",
  "ab-initio",
  "alphafold",
  "blast",
  "alignment",
  "visualization",
  "foldseek",
  "rmsd-analysis",
  "sequence-analysis",
  "api-engine",
  "shared",
  "ui",
  "hooks",
  "services",
  "database",
  "animations"
] as const;

export type WorkbenchModule = (typeof moduleRegistry)[number];
