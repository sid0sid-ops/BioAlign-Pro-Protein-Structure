"use client";

import { Database, Download, ExternalLink, FlaskConical, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/ui/badge";
import type { ProteinPack } from "@/lib/static-data/protein-pack-types";
import { useWorkbenchStore } from "@/store/workbench-store";

interface StructureViewerGateProps {
  pack?: ProteinPack | null;
  title?: string;
}

function formatResolution(value?: string | null) {
  if (!value) return "Not listed";
  return value;
}

function computedModelId(pdbId: string) {
  return `pdb_00001${pdbId.toLowerCase()}`;
}

export function StructureViewerGate({ pack, title = "3D Structure" }: StructureViewerGateProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rawInput = useWorkbenchStore((state) => state.rawInput);
  const searchedPdbId = rawInput.trim().match(/^[0-9][A-Za-z0-9]{3}$/)?.[0].toUpperCase();
  const primaryPdb =
    (searchedPdbId && pack?.pdbStructures.find((structure) => structure.pdbId.toUpperCase() === searchedPdbId)) ||
    pack?.pdbStructures[0];
  const hasStructure = Boolean(primaryPdb || pack?.alphaFold.available);
  const structureTitle = primaryPdb?.pdbId
    ? pack?.structureIntelligence?.structures.experimental.find((structure) => structure.pdbId === primaryPdb.pdbId)?.title
    : undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const downloadRecord = () => {
    if (!pack) return;
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pack.accession}-protein-structure-record.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const compactViewer = primaryPdb ? (
    <iframe
      title={`${primaryPdb.pdbId} molecular structure`}
      src={`https://molstar.org/viewer/?pdb=${primaryPdb.pdbId}&hide-controls=1`}
      className="absolute border-0 bg-white"
      style={{ left: "-18%", top: "-7%", width: "136%", height: "114%" }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    <div className="grid h-full min-h-[420px] place-items-center bg-slate-50 p-8 text-center">
      <div>
        <Database className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-3 text-sm font-semibold">AlphaFold model available</p>
        <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
          Open the linked AlphaFold record for the mapped predicted structure.
        </p>
      </div>
    </div>
  );
  const fullViewer = primaryPdb ? (
    <iframe
      title={`${primaryPdb.pdbId} full molecular structure`}
      src={`https://molstar.org/viewer/?pdb=${primaryPdb.pdbId}`}
      className="absolute inset-0 h-full w-full border-0 bg-white"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  ) : (
    compactViewer
  );

  return (
    <>
      <section className="relative overflow-hidden rounded-lg bg-white/80 shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/10">
        <div className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white/95 px-3 text-xs font-semibold leading-none text-teal-700 shadow-sm ring-1 ring-slate-900/10 backdrop-blur transition hover:bg-teal-50 sm:min-w-[6.75rem]"
            title="Expand structure viewer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Expand</span>
          </button>
        </div>
        {!hasStructure ? (
          <div className="m-4 rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
            No experimental or predicted structure record is available in the current data pack for this sequence.
          </div>
        ) : (
          <div className="relative h-[420px] overflow-hidden bg-white sm:h-[520px]">
            <div className="absolute inset-0">
              {compactViewer}
            </div>
            {primaryPdb && (
              <div
                className="pointer-events-none absolute bottom-0 right-0 z-10 h-16 w-64 bg-gradient-to-l from-white via-white via-70% to-transparent"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </section>

      {expanded && mounted && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-hidden bg-slate-950/35 p-2 pt-3 backdrop-blur-md sm:p-4 sm:pt-5"
          onMouseDown={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
        >
          <section
            className="max-h-[calc(100vh-24px)] w-[min(1760px,calc(100vw-12px))] overflow-hidden rounded-lg bg-white shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/15 sm:max-h-[calc(100vh-40px)] sm:w-[min(1760px,calc(100vw-32px))]"
            onMouseDown={(event) => event.stopPropagation()}
          >
      <div className="border-b border-slate-900/10 bg-gradient-to-r from-emerald-50 via-white to-teal-50 px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <FlaskConical className="h-3.5 w-3.5 text-teal-600" />
              {title}
            </p>
            {primaryPdb ? (
              <>
                <h2 className="mt-2 flex min-w-0 flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-foreground sm:text-2xl">
                  <span className="font-mono">{primaryPdb.pdbId}</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="min-w-0 truncate font-mono text-slate-700">{computedModelId(primaryPdb.pdbId)}</span>
                </h2>
                <p className="mt-1 max-w-6xl text-xs uppercase tracking-wide text-slate-700 sm:text-sm">
                  {structureTitle || pack?.proteinName || "Protein structure record"}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">No PDB structure mapped</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The current pack does not include an experimental PDB structure for this sequence.
                </p>
              </>
            )}
          </div>

          <div className="grid w-full gap-2 [grid-template-columns:repeat(auto-fit,minmax(9.5rem,1fr))] sm:w-auto sm:min-w-[34rem] sm:shrink-0 lg:justify-end">
            <Badge variant={primaryPdb ? "success" : "outline"}>{primaryPdb ? "Experimental PDB" : "No PDB"}</Badge>
            <Badge variant={pack?.alphaFold.available ? "success" : "outline"}>
              AlphaFold {pack?.alphaFold.available ? "mapped" : "not mapped"}
            </Badge>
            <button
              type="button"
              onClick={downloadRecord}
              disabled={!pack}
              className="inline-flex h-10 min-w-[8.75rem] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 text-xs font-semibold leading-none text-teal-700 shadow-sm ring-1 ring-slate-900/10 transition hover:bg-teal-50 disabled:opacity-50 sm:min-w-[10.75rem]"
              title="Download structure record"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="sm:hidden">Download</span>
              <span className="hidden sm:inline">Download record</span>
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex h-10 min-w-[7.5rem] items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 text-xs font-semibold leading-none text-teal-700 shadow-sm ring-1 ring-slate-900/10 transition hover:bg-teal-50"
              title="Collapse structure viewer"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              Collapse
            </button>
          </div>
        </div>
      </div>

      {!hasStructure ? (
        <div className="m-4 rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground">
          No experimental or predicted structure record is available in the current data pack for this sequence.
        </div>
      ) : (
        <div className="grid max-h-[calc(100vh-140px)] gap-0 overflow-hidden xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative min-h-[360px] bg-white sm:min-h-[620px] xl:min-h-[calc(100vh-140px)]">
            {fullViewer}
          </div>

          <aside className="border-t border-teal-200/80 bg-emerald-50/45 xl:border-l xl:border-t-0">
            <div className="border-b border-teal-200/80 px-4 py-3">
              <p className="text-xs font-semibold">Structure</p>
            </div>
            <dl className="divide-y divide-teal-200/70 text-xs">
              <div className="grid grid-cols-[82px_1fr] gap-3 px-3 py-3 sm:grid-cols-[90px_1fr] sm:px-4">
                <dt className="text-muted-foreground">PDB ID</dt>
                <dd className="font-mono font-semibold text-foreground">{primaryPdb?.pdbId ?? "None"}</dd>
              </div>
              <div className="grid grid-cols-[82px_1fr] gap-3 px-3 py-3 sm:grid-cols-[90px_1fr] sm:px-4">
                <dt className="text-muted-foreground">Method</dt>
                <dd className="text-foreground">{primaryPdb?.method || "Not listed"}</dd>
              </div>
              <div className="grid grid-cols-[82px_1fr] gap-3 px-3 py-3 sm:grid-cols-[90px_1fr] sm:px-4">
                <dt className="text-muted-foreground">Resolution</dt>
                <dd className="text-foreground">{formatResolution(primaryPdb?.resolution)}</dd>
              </div>
              <div className="grid grid-cols-[82px_1fr] gap-3 px-3 py-3 sm:grid-cols-[90px_1fr] sm:px-4">
                <dt className="text-muted-foreground">AlphaFold</dt>
                <dd className="text-foreground">{pack?.alphaFold.available ? "Mapped" : "Not mapped"}</dd>
              </div>
            </dl>
            <div className="grid gap-2 px-4 py-4">
              {primaryPdb && (
                <a
                  href={`https://www.rcsb.org/3d-view/${primaryPdb.pdbId}?preset=validationReport`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md bg-teal-600 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-teal-700"
                >
                  <span className="truncate">Open source viewer</span> <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              )}
              {pack?.alphaFold.available && (
                <a
                  href={`https://alphafold.ebi.ac.uk/entry/${pack.accession}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md border border-teal-200 bg-white px-3 py-2 text-xs font-medium text-teal-800 transition hover:bg-teal-50"
                >
                  <span className="truncate">Open AlphaFold record</span> <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              )}
            </div>
          </aside>
        </div>
      )}
          </section>
        </div>,
        document.body
      )}
    </>
  );
}
