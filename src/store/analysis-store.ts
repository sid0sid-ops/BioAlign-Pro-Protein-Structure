"use client";

import { create } from "zustand";

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  status: "queued" | "running" | "complete" | "warning" | "error";
  progress: number;
  metric: string;
}

interface AnalysisStoreState {
  steps: AnalysisStep[];
  overallProgress: number;
  isRunning: boolean;
  error: string | null;
}

interface AnalysisStoreActions {
  setSteps: (steps: AnalysisStep[]) => void;
  updateStep: (id: string, updates: Partial<AnalysisStep>) => void;
  setOverallProgress: (progress: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setError: (error: string | null) => void;
  resetPipeline: () => void;
}

const defaultSteps: AnalysisStep[] = [
  {
    id: "input-detection",
    title: "Input Parsing & Detection",
    description: "Detecting input type and cleaning sequence data...",
    status: "queued",
    progress: 0,
    metric: "Pending",
  },
  {
    id: "db-aggregation",
    title: "Database Aggregation",
    description: "Fetching annotations from UniProt, InterPro, and STRING...",
    status: "queued",
    progress: 0,
    metric: "Pending",
  },
  {
    id: "homology-blast",
    title: "BLAST Homology Search",
    description: "Submitting sequence queries to NCBI BLAST against PDB...",
    status: "queued",
    progress: 0,
    metric: "Pending",
  },
  {
    id: "structure-retrieval",
    title: "Structure Prediction/Retrieval",
    description: "Retrieving AlphaFold DB models and RCSB coordinates...",
    status: "queued",
    progress: 0,
    metric: "Pending",
  },
];

export const useAnalysisStore = create<AnalysisStoreState & AnalysisStoreActions>((set) => ({
  steps: defaultSteps,
  overallProgress: 0,
  isRunning: false,
  error: null,

  setSteps: (steps) => set({ steps }),
  updateStep: (id, updates) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id ? { ...step, ...updates } : step
      ),
    })),
  setOverallProgress: (overallProgress) => set({ overallProgress }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setError: (error) => set({ error }),
  resetPipeline: () =>
    set({
      steps: defaultSteps.map((step) => ({ ...step, status: "queued", progress: 0, metric: "Pending" })),
      overallProgress: 0,
      isRunning: false,
      error: null,
    }),
}));
