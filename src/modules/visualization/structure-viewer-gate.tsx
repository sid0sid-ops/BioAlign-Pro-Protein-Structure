"use client";

import dynamic from "next/dynamic";
import { Box, Cuboid, Database, Eye, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProteinPack } from "@/lib/static-data/protein-pack-types";

const LazyMolecularViewer = dynamic(
  () => import("@/modules/visualization/molecular-viewer").then((module) => module.MolecularViewer),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-4 rounded-lg border border-border bg-background/55 p-4">
        <Skeleton className="h-[420px]" />
        <div className="grid gap-2 sm:grid-cols-3">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </div>
    )
  }
);

interface StructureViewerGateProps {
  pack?: ProteinPack | null;
  title?: string;
}

export function StructureViewerGate({ pack, title = "3D Structure Viewer" }: StructureViewerGateProps) {
  const [open, setOpen] = useState(false);
  const [molstarStatus, setMolstarStatus] = useState<"idle" | "loading" | "ready" | "fallback">("idle");

  useEffect(() => {
    if (!open || molstarStatus !== "loading") return;

    let cancelled = false;
    import("@/modules/visualization/molecular-adapters")
      .then((module) => module.loadMolstarViewer())
      .then(() => {
        if (!cancelled) setMolstarStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setMolstarStatus("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, [molstarStatus, open]);

  if (!open) {
    return (
      <div className="rounded-lg border border-border bg-background/55 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Cuboid className="h-4 w-4 text-primary" />
              {title}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={pack?.pdbStructures.length ? "success" : "outline"}>
                {pack?.pdbStructures.length ?? 0} PDB structure{pack?.pdbStructures.length === 1 ? "" : "s"}
              </Badge>
              <Badge variant={pack?.alphaFold.available ? "success" : "outline"}>
                AlphaFold {pack?.alphaFold.available ? "available" : "not found"}
              </Badge>
              <Badge variant="outline">Lazy Mol*</Badge>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
              if (molstarStatus === "idle") setMolstarStatus("loading");
            }}
            disabled={!pack?.sequence.value && !pack?.pdbStructures.length}
          >
            <Eye className="h-4 w-4" />
            Open Viewer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background/55 p-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <Box className="mr-1 h-3 w-3" />
            3D chunk loaded
          </Badge>
          <Badge variant={molstarStatus === "ready" ? "success" : molstarStatus === "fallback" ? "warning" : "outline"}>
            <Database className="mr-1 h-3 w-3" />
            Mol* {molstarStatus}
          </Badge>
          <Badge variant="outline">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Browser-only
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
          Close Viewer
        </Button>
      </div>
      <LazyMolecularViewer />
    </div>
  );
}
