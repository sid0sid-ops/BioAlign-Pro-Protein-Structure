"use client";

import { create } from "zustand";
import { SAMPLE_SEQUENCE } from "@/constants/amino-acids";
import type { PredictionProvider, ProteinStructureLevel, WorkbenchState } from "@/types/protein";
import type { DetectionResult } from "@/services/input-detector";

export interface AnalysisProviderResult {
  provider: string;
  status: "idle" | "loading" | "success" | "error";
  data: any;
  error?: string;
  timestamp?: number;
}

interface ExtendedWorkbenchState extends WorkbenchState {
  // Input and detection
  rawInput: string;
  inputDetection: DetectionResult | null;
  isAnalyzing: boolean;

  // Active workspace
  activePanel: string;
  expandedPanels: string[];

  // Analysis results per provider
  analysisResults: Record<string, AnalysisProviderResult>;

  // Structure comparison
  comparisonTargets: string[];
  comparisonResults: any | null;

  // Search history
  searchHistory: Array<{ query: string; type: string; timestamp: number }>;
}

interface WorkbenchActions {
  setSequence: (sequence: string) => void;
  setSequenceName: (sequenceName: string) => void;
  setSelectedChain: (selectedChain: string) => void;
  setSelectedResidue: (selectedResidue: number) => void;
  setActiveStructureLevel: (activeStructureLevel: ProteinStructureLevel) => void;
  setSelectedTemplateId: (selectedTemplateId: string) => void;
  setProvider: (provider: PredictionProvider) => void;
  setRawInput: (rawInput: string) => void;
  setInputDetection: (detection: DetectionResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setActivePanel: (panel: string) => void;
  togglePanel: (panel: string) => void;
  setAnalysisResult: (provider: string, result: AnalysisProviderResult) => void;
  clearAnalysisResults: () => void;
  addComparisonTarget: (target: string) => void;
  removeComparisonTarget: (target: string) => void;
  setComparisonResults: (results: any) => void;
  addSearchHistory: (query: string, type: string) => void;
}

export const useWorkbenchStore = create<ExtendedWorkbenchState & WorkbenchActions>((set) => ({
  // Original fields
  sequenceName: "Demo kinase regulatory domain",
  sequence: SAMPLE_SEQUENCE,
  selectedChain: "A",
  selectedResidue: 42,
  activeStructureLevel: "tertiary",
  selectedTemplateId: "4HHB-A",
  provider: "AlphaFold",

  // New fields
  rawInput: "P04637",
  inputDetection: null,
  isAnalyzing: false,
  activePanel: "sequence",
  expandedPanels: ["sequence", "hierarchy", "homology", "blast", "alignment", "threading", "ai", "foldseek", "viewer", "analytics", "validation"],
  analysisResults: {},
  comparisonTargets: [],
  comparisonResults: null,
  searchHistory: [],

  // Actions
  setSequence: (sequence) => set({ sequence }),
  setSequenceName: (sequenceName) => set({ sequenceName }),
  setSelectedChain: (selectedChain) => set({ selectedChain }),
  setSelectedResidue: (selectedResidue) => set({ selectedResidue }),
  setActiveStructureLevel: (activeStructureLevel) => set({ activeStructureLevel }),
  setSelectedTemplateId: (selectedTemplateId) => set({ selectedTemplateId }),
  setProvider: (provider) => set({ provider }),
  setRawInput: (rawInput) => set({ rawInput }),
  setInputDetection: (inputDetection) => set({ inputDetection }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setActivePanel: (activePanel) => set({ activePanel }),
  togglePanel: (panel) =>
    set((state) => ({
      expandedPanels: state.expandedPanels.includes(panel)
        ? state.expandedPanels.filter((p) => p !== panel)
        : [...state.expandedPanels, panel],
    })),
  setAnalysisResult: (provider, result) =>
    set((state) => ({
      analysisResults: { ...state.analysisResults, [provider]: result },
    })),
  clearAnalysisResults: () => set({ analysisResults: {} }),
  addComparisonTarget: (target) =>
    set((state) => ({
      comparisonTargets: [...state.comparisonTargets.filter((t) => t !== target), target].slice(0, 4),
    })),
  removeComparisonTarget: (target) =>
    set((state) => ({
      comparisonTargets: state.comparisonTargets.filter((t) => t !== target),
    })),
  setComparisonResults: (comparisonResults) => set({ comparisonResults }),
  addSearchHistory: (query, type) =>
    set((state) => ({
      searchHistory: [
        { query, type, timestamp: Date.now() },
        ...state.searchHistory.filter((h) => h.query !== query),
      ].slice(0, 20),
    })),
}));
