export async function loadMolstarViewer() {
  const molstar = await import("molstar/lib/mol-plugin-ui");
  return molstar;
}

export async function loadNglViewer() {
  const ngl = await import("ngl");
  return ngl;
}

export const molecularRepresentationModes = [
  "cartoon",
  "surface",
  "stick",
  "ball-and-stick",
  "electrostatic",
  "chain-highlight",
  "ligand"
] as const;
