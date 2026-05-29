import type { SourceBadge } from "../types";

export function uniqueSourceBadges(badges: SourceBadge[]) {
  return Array.from(new Set(badges));
}

export function sourceBadgeDescription(badge: SourceBadge) {
  const descriptions: Record<SourceBadge, string> = {
    UniProt: "Canonical sequence and annotation source",
    "RCSB PDB": "Experimental structure metadata source",
    "AlphaFold DB": "Predicted model confidence source",
    InterPro: "Integrated domain and family annotation source",
    Pfam: "Profile/domain family evidence",
    "Build-time Computed": "Computed once during static data build",
    "Browser Computed": "Computed in a browser Web Worker",
    "Browser Cache": "Cached in IndexedDB",
    "Static Pack": "Loaded from GitHub Pages static files",
    "Optional Live API": "Optional no-key public API refresh"
  };
  return descriptions[badge];
}
