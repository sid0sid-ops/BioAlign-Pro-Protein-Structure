"use client";

import { motion } from "framer-motion";
import { Atom, Boxes, Dna, Layers3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useWorkbenchStore } from "@/store/workbench-store";
import type { ProteinStructureLevel } from "@/types/protein";

const levels: Array<{
  id: ProteinStructureLevel;
  title: string;
  icon: typeof Dna;
  description: string;
  signal: string;
  confidence: number;
}> = [
  {
    id: "primary",
    title: "Primary",
    icon: Dna,
    description: "Linear amino acid chain, peptide bonds, residue identity, mutations, and motifs.",
    signal: "92 residues",
    confidence: 99
  },
  {
    id: "secondary",
    title: "Secondary",
    icon: Layers3,
    description: "Alpha helices, beta sheets, turns, hydrogen bonds, and local backbone geometry.",
    signal: "Helix rich",
    confidence: 84
  },
  {
    id: "tertiary",
    title: "Tertiary",
    icon: Atom,
    description: "Full 3D fold, hydrophobic packing, ionic contacts, disulfides, and domains.",
    signal: "Globin-like",
    confidence: 88
  },
  {
    id: "quaternary",
    title: "Quaternary",
    icon: Boxes,
    description: "Multi-chain assembly, chain interfaces, ligand contacts, and biological unit context.",
    signal: "2 chains",
    confidence: 72
  }
];

export function StructureHierarchy() {
  const { activeStructureLevel, setActiveStructureLevel } = useWorkbenchStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protein Structure Hierarchy</CardTitle>
        <CardDescription>
          Four coordinated views explain how sequence becomes fold, function, and assembly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {levels.map((level, index) => (
            <motion.button
              key={level.id}
              className={cn(
                "group rounded-lg border border-border bg-background/55 p-4 text-left transition hover:-translate-y-1 hover:bg-background/80",
                activeStructureLevel === level.id && "border-primary/60 bg-primary/8"
              )}
              onClick={() => setActiveStructureLevel(level.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-lg bg-primary/10 p-2 text-primary transition group-hover:scale-105">
                  <level.icon className="h-5 w-5" />
                </span>
                <Badge variant={activeStructureLevel === level.id ? "success" : "outline"}>
                  {level.signal}
                </Badge>
              </div>
              <h4 className="mt-4 text-sm font-semibold">{level.title} structure</h4>
              <p className="mt-2 min-h-16 text-sm text-muted-foreground">{level.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Model confidence</span>
                  <span>{level.confidence}%</span>
                </div>
                <Progress value={level.confidence} />
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
