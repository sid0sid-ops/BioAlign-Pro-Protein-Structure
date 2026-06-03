"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Line, OrbitControls } from "@react-three/drei";
import { Cuboid, MousePointer2, Rotate3D, ZoomIn, Loader2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { STRUCTURE_COLORS } from "@/constants/amino-acids";
import { useWorkbenchStore } from "@/store/workbench-store";

interface DynamicProteinRibbonProps {
  sequence: string;
  viewMode: string;
}

function DynamicProteinRibbon({ sequence, viewMode }: DynamicProteinRibbonProps) {
  const group = useRef<THREE.Group>(null);

  // Generate coordinates representing a realistic protein backbone based on sequence length
  const { ribbonPoints, helixPoints, sheetPoints, spherePoints } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const hPoints: THREE.Vector3[] = [];
    const sPoints: THREE.Vector3[] = [];
    const spheres: Array<{ pos: THREE.Vector3; color: string; label: string }> = [];

    const len = Math.max(30, Math.min(200, sequence.length));

    // Simple pseudo-secondary structure assigner
    // We'll define a few helices and sheets along the sequence length
    let currentPos = new THREE.Vector3(0, 0, -len * 0.05);

    for (let i = 0; i < len; i++) {
      const t = i / 10;
      const step = new THREE.Vector3(0, 0, 0.1);

      // Helix: residues 15 to 45, 80 to 110
      const isHelix = (i >= 15 && i <= 45) || (i >= 80 && i <= 110);
      // Beta sheet: residues 55 to 70, 120 to 140
      const isSheet = (i >= 55 && i <= 70) || (i >= 120 && i <= 140);

      if (isHelix) {
        step.set(Math.sin(t * 5) * 0.45, Math.cos(t * 5) * 0.45, 0.08);
      } else if (isSheet) {
        step.set((i % 2 === 0 ? 0.2 : -0.2), Math.sin(t * 2) * 0.1, 0.09);
      } else {
        // Random loop/coil with smooth noise
        step.set(Math.sin(t * 1.5) * 0.15, Math.cos(t * 1.5) * 0.15, 0.12);
      }

      currentPos = currentPos.clone().add(step);
      points.push(currentPos);

      if (isHelix) {
        hPoints.push(currentPos);
      } else if (isSheet) {
        sPoints.push(currentPos);
      }

      // Add spheres at key residues/hotspots
      if (i % 12 === 0) {
        spheres.push({
          pos: currentPos,
          color: i % 24 === 0 ? STRUCTURE_COLORS.mutation : STRUCTURE_COLORS.domain,
          label: `${sequence[i] ?? "A"}${i + 1}`,
        });
      }
    }

    return {
      ribbonPoints: points,
      helixPoints: hPoints,
      sheetPoints: sPoints,
      spherePoints: spheres,
    };
  }, [sequence]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x = Math.sin(Date.now() / 3000) * 0.05;
    }
  });

  const showCartoon = viewMode === "Cartoon" || viewMode === "Electrostatic";
  const showStick = viewMode === "Stick" || viewMode === "Ball-stick";

  return (
    <group ref={group}>
      {/* Cartoon backbone */}
      {showCartoon && (
        <>
          <Line points={ribbonPoints} color="#94a3b8" lineWidth={1.5} opacity={0.6} />
          {helixPoints.length > 1 && (
            <Line points={helixPoints} color={STRUCTURE_COLORS.helix} lineWidth={4.5} />
          )}
          {sheetPoints.length > 1 && (
            <Line points={sheetPoints} color={STRUCTURE_COLORS.sheet} lineWidth={3.5} />
          )}
        </>
      )}

      {/* Stick / Sidechain atoms */}
      {showStick && (
        <Line points={ribbonPoints} color="#3b82f6" lineWidth={2.5} />
      )}

      {/* Spheres / Hotspots */}
      {spherePoints.map((sphere, index) => (
        <mesh key={index} position={sphere.pos}>
          <sphereGeometry args={[viewMode === "Ball-stick" ? 0.06 : 0.09, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive={sphere.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}

      {/* Interactive Residue Label */}
      {spherePoints.length > 0 && (
        <Html position={spherePoints[0].pos} center className="pointer-events-none">
          <span className="rounded-md border border-teal-500/20 bg-slate-950/80 px-2 py-0.5 text-[9px] text-teal-400 shadow-lg backdrop-blur">
            {spherePoints[0].label} hotspot
          </span>
        </Html>
      )}
    </group>
  );
}

export function MolecularViewer() {
  const { sequence, selectedChain, selectedResidue, setSelectedChain, setSelectedResidue } = useWorkbenchStore();
  const [viewMode, setViewMode] = useState<string>("Cartoon");

  return (
    <Card className="overflow-hidden animated-border">
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Interactive 3D Molecular Viewer</CardTitle>
          <CardDescription>
            Dynamic browser-native cartoon, sheet, helix, and residue hotspot viewer responding live to the target sequence.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Chain {selectedChain}</Badge>
          <Badge variant="outline">Residue {selectedResidue}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="relative min-h-[440px] overflow-hidden rounded-lg border border-border bg-slate-950">
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            {["Cartoon", "Surface", "Stick", "Ball-stick", "Electrostatic"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "glass"}
                size="sm"
                onClick={() => setViewMode(mode)}
              >
                {mode}
              </Button>
            ))}
          </div>
          <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />
            <DynamicProteinRibbon sequence={sequence} viewMode={viewMode} />
            <Environment preset="city" />
            <OrbitControls enablePan enableZoom autoRotate={viewMode !== "Surface"} autoRotateSpeed={0.25} />
          </Canvas>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="text-sm font-semibold">Viewer Controls</p>
            <div className="mt-4 grid gap-2">
              {[
                { icon: Rotate3D, label: "Rotate and inspect tertiary packing" },
                { icon: ZoomIn, label: "Zoom into ligand and residue contacts" },
                { icon: MousePointer2, label: "Hover residues for annotations" },
                { icon: Cuboid, label: "Switch chain and assembly context" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="text-sm font-semibold">Chain Selection</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["A", "B", "C"].map((chain) => (
                <Button
                  key={chain}
                  variant={selectedChain === chain ? "default" : "outline"}
                  onClick={() => setSelectedChain(chain)}
                >
                  Chain {chain}
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <label className="text-sm font-semibold" htmlFor="residue-slider">
              Residue Selection
            </label>
            <input
              id="residue-slider"
              className="mt-4 w-full accent-teal-500"
              min={1}
              max={Math.max(50, sequence.length)}
              value={selectedResidue}
              type="range"
              onChange={(event) => setSelectedResidue(Number(event.target.value))}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Residue annotations connect sequence, alignment, and 3D structure panels.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
