"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useIncrementalList } from "@/hooks/use-incremental-list";
import type { MsaAlignedSequence, MsaSummary } from "@/lib/structure-intelligence/types";

interface EvolutionPanelProps {
  msa: MsaSummary;
  accession: string;
  geneName: string;
  sequence: string;
  onMsaLoaded?: (msa: MsaSummary) => void;
}

interface UniProtSearchEntry {
  primaryAccession?: string;
  uniProtkbId?: string;
  organism?: { scientificName?: string };
  sequence?: { value?: string };
}

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function normalizeSequence(sequence: string) {
  return sequence.toUpperCase().replace(/[^A-Z]/g, "");
}

function scorePair(a: string, b: string) {
  if (a === b) return 3;
  if (a === "-" || b === "-") return -4;
  return -1;
}

function alignPair(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));
  const trace = Array.from({ length: rows }, () => Array(cols).fill(""));

  for (let i = 1; i < rows; i += 1) {
    matrix[i][0] = matrix[i - 1][0] - 4;
    trace[i][0] = "up";
  }
  for (let j = 1; j < cols; j += 1) {
    matrix[0][j] = matrix[0][j - 1] - 4;
    trace[0][j] = "left";
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const diagonal = matrix[i - 1][j - 1] + scorePair(a[i - 1], b[j - 1]);
      const up = matrix[i - 1][j] - 4;
      const left = matrix[i][j - 1] - 4;
      const best = Math.max(diagonal, up, left);
      matrix[i][j] = best;
      trace[i][j] = best === diagonal ? "diag" : best === up ? "up" : "left";
    }
  }

  const alignedA: string[] = [];
  const alignedB: string[] = [];
  let i = a.length;
  let j = b.length;
  while (i > 0 || j > 0) {
    const move = trace[i]?.[j];
    if (move === "diag") {
      alignedA.push(a[i - 1]);
      alignedB.push(b[j - 1]);
      i -= 1;
      j -= 1;
    } else if (move === "up") {
      alignedA.push(a[i - 1]);
      alignedB.push("-");
      i -= 1;
    } else {
      alignedA.push("-");
      alignedB.push(b[j - 1]);
      j -= 1;
    }
  }

  return { a: alignedA.reverse().join(""), b: alignedB.reverse().join("") };
}

function summarize(alignedSequences: MsaAlignedSequence[], canonicalSequence: string, method: string): MsaSummary {
  const queryAlignedSequence = alignedSequences[0]?.sequence ?? "";
  const width = Math.max(...alignedSequences.map((record) => record.sequence.length));
  const consensus: string[] = [];
  const conservationScores: number[] = [];
  const gapFrequencies: number[] = [];

  for (let index = 0; index < width; index += 1) {
    const residues = alignedSequences.map((record) => record.sequence[index] ?? "-");
    const nonGapResidues = residues.filter((residue) => residue !== "-");
    const counts = nonGapResidues.reduce<Record<string, number>>((acc, residue) => {
      acc[residue] = (acc[residue] ?? 0) + 1;
      return acc;
    }, {});
    const top = Object.entries(counts).sort((left, right) => right[1] - left[1])[0];

    if ((queryAlignedSequence[index] ?? "-") !== "-") {
      consensus.push(top?.[0] ?? "-");
      conservationScores.push(Number(((top?.[1] ?? 0) / Math.max(nonGapResidues.length, 1)).toFixed(3)));
      gapFrequencies.push(Number((residues.filter((residue) => residue === "-").length / residues.length).toFixed(3)));
    }
  }

  return {
    available: true,
    method,
    alignedSequences,
    consensus: consensus.join("").slice(0, canonicalSequence.length),
    conservationScores: conservationScores.slice(0, canonicalSequence.length),
    gapFrequencies: gapFrequencies.slice(0, canonicalSequence.length),
    sourceSequenceCount: alignedSequences.length,
    source: "UniProt reviewed homolog records"
  };
}

function buildBrowserMsa(records: MsaAlignedSequence[], canonicalSequence: string): MsaSummary {
  const query = records[0];
  const alignedSequences = [
    { ...query, sequence: canonicalSequence },
    ...records.slice(1).map((record) => {
      const pair = alignPair(canonicalSequence, record.sequence);
      return { ...record, sequence: pair.b };
    })
  ];
  const maxWidth = Math.max(...alignedSequences.map((record) => record.sequence.length));
  const padded = alignedSequences.map((record) => ({
    ...record,
    sequence: record.sequence.padEnd(maxWidth, "-")
  }));

  return summarize(padded, canonicalSequence, "Browser UniProt homolog alignment");
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

async function fetchPublicMsa(accession: string, geneName: string, sequence: string): Promise<MsaSummary | null> {
  let canonicalSequence = normalizeSequence(sequence);

  if (!canonicalSequence && accession) {
    const entry = await fetchJson<UniProtSearchEntry>(`https://rest.uniprot.org/uniprotkb/${encodeURIComponent(accession)}.json`);
    canonicalSequence = normalizeSequence(entry?.sequence?.value ?? "");
  }

  if (!canonicalSequence || !geneName) return null;

  const minLength = Math.max(20, Math.floor(canonicalSequence.length * 0.55));
  const maxLength = Math.max(minLength, Math.ceil(canonicalSequence.length * 1.6));
  const query = `(gene_exact:${geneName}) AND reviewed:true`;
  const fields = "accession,id,organism_name,sequence";
  const url = `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(query)}&format=json&fields=${encodeURIComponent(fields)}&size=10`;
  const data = await fetchJson<{ results?: UniProtSearchEntry[] }>(url);
  const records: MsaAlignedSequence[] = [
    {
      id: accession,
      label: `${accession} canonical`,
      sequence: canonicalSequence,
      source: "UniProtKB"
    },
    ...((data?.results ?? [])
      .filter((entry) => entry.primaryAccession !== accession)
      .map((entry) => ({
        id: entry.primaryAccession ?? entry.uniProtkbId ?? "UniProt",
        label: `${entry.primaryAccession ?? entry.uniProtkbId ?? "UniProt"} ${entry.organism?.scientificName ?? ""}`.trim(),
        sequence: normalizeSequence(entry.sequence?.value ?? ""),
        source: "UniProtKB reviewed homolog search"
      }))
      .filter((record) => record.sequence.length >= minLength && record.sequence.length <= maxLength)
      .slice(0, 7))
  ];

  const unique = records.filter((record, index, all) => all.findIndex((item) => item.sequence === record.sequence) === index);
  if (unique.length < 2) return null;

  return buildBrowserMsa(unique, canonicalSequence);
}

function usePublicMsa(accession: string, geneName: string, sequence: string, enabled: boolean) {
  const [remoteMsa, setRemoteMsa] = useState<MsaSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const cacheKey = `bioalign-msa:${accession}:${geneName}`;

    async function run() {
      setLoading(true);
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { storedAt: number; msa: MsaSummary };
          if (Date.now() - parsed.storedAt < CACHE_TTL_MS) {
            if (!cancelled) setRemoteMsa(parsed.msa);
            return;
          }
        }

        const result = await fetchPublicMsa(accession, geneName, sequence);
        if (result) {
          localStorage.setItem(cacheKey, JSON.stringify({ storedAt: Date.now(), msa: result }));
        }
        if (!cancelled) setRemoteMsa(result);
      } catch {
        if (!cancelled) setRemoteMsa(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [accession, enabled, geneName, sequence]);

  return { remoteMsa, loading };
}

function meanConservation(msa: MsaSummary) {
  if (!msa.conservationScores.length) return null;
  return msa.conservationScores.reduce((sum, score) => sum + score, 0) / msa.conservationScores.length;
}

export function EvolutionPanel({ msa, accession, geneName, sequence, onMsaLoaded }: EvolutionPanelProps) {
  const { remoteMsa, loading } = usePublicMsa(accession, geneName, sequence, !msa.available);
  const activeMsa = msa.available ? msa : remoteMsa;
  const mean = useMemo(() => (activeMsa ? meanConservation(activeMsa) : null), [activeMsa]);
  const alignedSequences = useMemo(() => activeMsa?.alignedSequences ?? [], [activeMsa]);
  const pagedAlignedSequences = useIncrementalList(alignedSequences, 10);

  useEffect(() => {
    if (remoteMsa) onMsaLoaded?.(remoteMsa);
  }, [onMsaLoaded, remoteMsa]);

  return (
    <div id="evolution" className="bio-card p-5 scroll-mt-20">
      <h2 className="mb-1 text-sm font-semibold">Evolution (MSA)</h2>
      <p className="mb-4 text-[11px] text-muted-foreground">Multiple Sequence Alignment & evolutionary conservation</p>

      {!activeMsa ? (
        <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            <h3 className="text-xs font-bold text-teal-900">
              {loading ? "Fetching reviewed homolog records" : "No public homolog MSA returned"}
            </h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-teal-800">
            {loading
              ? "Searching UniProtKB reviewed records and computing a browser-side conservation summary for this protein."
              : "No reviewed homolog set with compatible sequence length was returned by the public UniProtKB lookup for this accession."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">MSA Active</Badge>
            <Badge variant="outline">{activeMsa.method}</Badge>
            <Badge variant="outline">{activeMsa.sourceSequenceCount} sequences</Badge>
            {mean !== null && <Badge variant="outline">Mean conservation {(mean * 100).toFixed(1)}%</Badge>}
          </div>

          <div className="rounded border border-teal-200 bg-teal-50/40 p-3 space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">Consensus sequence preview</span>
            <p className="break-all rounded border border-teal-200 bg-white p-2 font-mono text-xs text-slate-700">
              {activeMsa.consensus.slice(0, 180)}
              {activeMsa.consensus.length > 180 ? "..." : ""}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-teal-200 bg-teal-50 text-[9px] font-bold uppercase tracking-wider text-teal-900">
                  <th className="p-2">Identifier</th>
                  <th className="p-2">Aligned sequence segment</th>
                  <th className="p-2">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono text-xs">
                {pagedAlignedSequences.visibleItems.map((seq) => (
                  <tr key={seq.id} className="hover:bg-teal-50/30">
                    <td className="p-2 text-[10px] font-semibold text-slate-800">{seq.label}</td>
                    <td className="block max-w-[480px] overflow-x-auto whitespace-nowrap break-all p-2 text-[11px] text-slate-600">
                      {seq.sequence.slice(0, 80)}
                      {seq.sequence.length > 80 ? "..." : ""}
                    </td>
                    <td className="p-2 text-[10px] text-muted-foreground">{seq.source ?? activeMsa.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pagedAlignedSequences.hasMore && <div ref={pagedAlignedSequences.sentinelRef} className="h-8" aria-hidden="true" />}
          </div>
        </div>
      )}
    </div>
  );
}
