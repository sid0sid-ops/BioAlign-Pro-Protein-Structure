"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Dna, Moon, Search } from "lucide-react";
import { detectInputType } from "@/services/input-detector";
import { useWorkbenchStore } from "@/store/workbench-store";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const quickActions = [
  { id: "starter-tp53", label: "Load TP53 (P04637)", icon: Dna, section: "Starter Proteins" },
  { id: "starter-hemoglobin", label: "Load Hemoglobin Alpha (P69905)", icon: Dna, section: "Starter Proteins" },
  { id: "starter-insulin", label: "Load Insulin (P01308)", icon: Dna, section: "Starter Proteins" },
  { id: "starter-spike", label: "Load SARS-CoV-2 Spike (P0DTC2)", icon: Dna, section: "Starter Proteins" },
  { id: "go-sequence", label: "Go to Accession Query", icon: Search, section: "Navigation" },
  { id: "go-sequence-workbench", label: "Go to Sequence Workbench", icon: Dna, section: "Navigation" },
  { id: "go-client-intelligence", label: "Go to Client Intelligence", icon: Database, section: "Navigation" },
  { id: "toggle-theme", label: "Toggle dark/light theme", icon: Moon, section: "Settings" },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const { setSequenceName, setRawInput, setInputDetection, addSearchHistory } = useWorkbenchStore();

  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => {
      setQuery("");
      inputRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const filtered = quickActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const sections = [...new Set(filtered.map((a) => a.section))];

  const handleAction = (id: string) => {
    if (id.startsWith("starter-")) {
      const accessions: Record<string, string> = {
        "starter-tp53": "P04637",
        "starter-hemoglobin": "P69905",
        "starter-insulin": "P01308",
        "starter-spike": "P0DTC2",
      };
      const accession = accessions[id] ?? "";
      setSequenceName(`Starter protein: ${accession}`);
      setRawInput(accession);
      setInputDetection(detectInputType(accession));
      addSearchHistory(accession, "uniprot_accession");
    } else if (id.startsWith("go-")) {
      const target = id.replace("go-", "");
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    } else if (id === "toggle-theme") {
      document.documentElement.classList.toggle("dark");
    }
    onOpenChange(false);
  };

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    const detection = detectInputType(query);
    setRawInput(query);
    setInputDetection(detection);
    addSearchHistory(query, detection.type);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(); }}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Search proteins, PDB IDs, genes, or type a command…" />
          <kbd className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {sections.map((section) => (
            <div key={section}>
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{section}</p>
              {filtered.filter((a) => a.section === section).map((action) => (
                <button key={action.id} onClick={() => handleAction(action.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-muted/70 hover:text-foreground">
                  <action.icon className="h-4 w-4 shrink-0 text-primary" />
                  {action.label}
                </button>
              ))}
            </div>
          ))}
          {query && filtered.length === 0 && (
            <button onClick={handleSearchSubmit}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted-foreground transition hover:bg-muted/70 hover:text-foreground">
              <Search className="h-4 w-4 text-primary" />
              Search for &quot;{query}&quot;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
