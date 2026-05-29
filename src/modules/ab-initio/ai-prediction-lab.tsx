"use client";

import { Atom, Brain, Cpu, Waves } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientOnlyChart } from "@/components/ui/client-only-chart";
import { confidenceSeries } from "@/modules/shared/mock-data";

const providers = [
  { name: "AlphaFold", score: "86.4 pLDDT", mode: "Evolutionary attention" },
  { name: "ESMFold", score: "82.1 pLDDT", mode: "Language model folding" },
  { name: "ColabFold", score: "85.7 pLDDT", mode: "Fast MSA-backed inference" },
  { name: "RoseTTAFold", score: "79.8 pLDDT", mode: "Three-track network" }
];

export function AiPredictionLab() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <CardTitle>Ab Initio and AI Prediction Lab</CardTitle>
          <CardDescription>
            Physics-first explanations combined with deep learning pipelines, attention maps, pLDDT, and PAE.
          </CardDescription>
        </div>
        <Badge variant="success">AI ensemble ready</Badge>
      </CardHeader>
      <CardContent className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: Atom,
              title: "Physics search",
              body: "Energy landscapes, steric constraints, hydrophobic collapse, salt bridges, and disulfide geometry."
            },
            {
              icon: Brain,
              title: "Attention maps",
              body: "Long-range residue couplings expose contacts that are invisible from local sequence alone."
            },
            {
              icon: Cpu,
              title: "Model ensemble",
              body: "Provider outputs are normalized into common confidence, PAE, chain, and domain contracts."
            },
            {
              icon: Waves,
              title: "Uncertainty",
              body: "Low-confidence loops and mobile domains are separated from high-confidence folded cores."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-background/55 p-4">
              <span className="rounded-lg bg-accent/10 p-2 text-accent">
                <item.icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-sm font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-background/55 p-4">
            <p className="mb-3 text-sm font-semibold">Residue confidence and predicted error</p>
            <div className="h-64">
              <ClientOnlyChart>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <LineChart data={confidenceSeries}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
                    <XAxis dataKey="residue" tickLine={false} axisLine={false} fontSize={11} />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                    <Line type="monotone" dataKey="plddt" stroke="#3b82f6" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="pae" stroke="#f59e0b" dot={false} strokeWidth={2} />
                    <Line type="monotone" dataKey="conservation" stroke="#14b8a6" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ClientOnlyChart>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {providers.map((provider) => (
              <div key={provider.name} className="rounded-lg border border-border bg-background/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{provider.name}</p>
                  <Badge variant="outline">{provider.score}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{provider.mode}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
