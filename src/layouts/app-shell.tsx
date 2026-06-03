"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  Eye,
  GitFork,
  Layers3,
  LayoutDashboard,
  Mail,
  Menu,
  Network,
  Search,
  Settings2,
  Sparkles,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prefetchProteinRouteBundle } from "@/lib/navigation/predictive-prefetch";
import { cn } from "@/lib/utils";
import { useWorkbenchStore } from "@/store/workbench-store";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/" },
  { id: "structure-route", label: "Structure Route", icon: GitFork, href: "/#structure-route" },
  { id: "scores", label: "Scores", icon: Compass, href: "/#scores" },
  { id: "structure-viewer", label: "Structure Records", icon: Eye, href: "/#structure-viewer" },
  { id: "domains", label: "Domains", icon: Layers3, href: "/#domains" },
  { id: "evolution", label: "Evolution", icon: Network, href: "/#evolution" },
  { id: "function", label: "Function", icon: Sparkles, href: "/#function" },
  { id: "sources", label: "Sources", icon: Settings2, href: "/#sources" },
  { id: "information", label: "Information", icon: BookOpen, href: "/info/" }
];

const proteinSuggestions = [
  {
    name: "TP53 / p53",
    accession: "P04637",
    aliases: ["TP53", "p53", "tumor protein p53", "cellular tumor antigen p53"]
  },
  {
    name: "Hemoglobin alpha",
    accession: "P69905",
    aliases: ["hemoglobin alpha", "haemoglobin alpha", "HBA", "HBA1", "alpha globin"]
  },
  {
    name: "Hemoglobin beta",
    accession: "P68871",
    aliases: ["hemoglobin beta", "haemoglobin beta", "HBB", "beta globin", "sickle cell protein"]
  },
  {
    name: "EGFR",
    accession: "P00533",
    aliases: ["EGFR", "epidermal growth factor receptor", "ERBB1"]
  },
  {
    name: "BRCA1",
    accession: "P38398",
    aliases: ["BRCA1", "breast cancer type 1 susceptibility protein"]
  },
  {
    name: "BRCA2",
    accession: "P51587",
    aliases: ["BRCA2", "breast cancer type 2 susceptibility protein"]
  },
  {
    name: "Insulin",
    accession: "P01308",
    aliases: ["insulin", "INS"]
  },
  {
    name: "Serum albumin",
    accession: "P02768",
    aliases: ["albumin", "serum albumin", "ALB", "HSA"]
  },
  {
    name: "Amyloid beta precursor protein",
    accession: "P05067",
    aliases: ["APP", "amyloid beta", "amyloid precursor protein", "Alzheimer protein"]
  },
  {
    name: "Tau",
    accession: "P10636",
    aliases: ["tau", "MAPT", "microtubule-associated protein tau"]
  },
  {
    name: "KRAS",
    accession: "P01116",
    aliases: ["KRAS", "K-Ras", "GTPase KRas"]
  },
  {
    name: "HRAS",
    accession: "P01112",
    aliases: ["HRAS", "H-Ras", "GTPase HRas"]
  },
  {
    name: "NRAS",
    accession: "P01111",
    aliases: ["NRAS", "N-Ras", "GTPase NRas"]
  },
  {
    name: "ACE2",
    accession: "Q9BYF1",
    aliases: ["ACE2", "angiotensin-converting enzyme 2", "SARS receptor"]
  },
  {
    name: "SARS-CoV-2 spike",
    accession: "P0DTC2",
    aliases: ["spike", "SARS-CoV-2 spike", "coronavirus spike", "S protein"]
  },
  {
    name: "Actin",
    accession: "P60709",
    aliases: ["actin", "ACTB", "beta actin"]
  },
  {
    name: "Tubulin alpha",
    accession: "Q71U36",
    aliases: ["tubulin", "alpha tubulin", "TUBA1A"]
  },
  {
    name: "Collagen alpha-1(I)",
    accession: "P02452",
    aliases: ["collagen", "COL1A1", "collagen type I alpha 1"]
  },
  {
    name: "Green fluorescent protein",
    accession: "P42212",
    aliases: ["GFP", "green fluorescent protein"]
  }
];

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const rawInput = useWorkbenchStore((state) => state.rawInput);
  const setRawInput = useWorkbenchStore((state) => state.setRawInput);
  const [searchDraft, setSearchDraft] = useState(rawInput || "P04637");
  const [searchFocused, setSearchFocused] = useState(false);
  const hoverPrefetchTimerRef = useRef<number | null>(null);

  const visibleSuggestions = useMemo(() => {
    const query = searchDraft.trim().toLowerCase();
    const ranked = proteinSuggestions
      .map((protein) => {
        const tokens = [protein.name, protein.accession, ...protein.aliases].map((value) => value.toLowerCase());
        const exact = tokens.some((value) => value === query);
        const starts = tokens.some((value) => value.startsWith(query));
        const contains = tokens.some((value) => value.includes(query));
        return { protein, score: exact ? 3 : starts ? 2 : contains || !query ? 1 : 0 };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.protein.name.localeCompare(b.protein.name))
      .slice(0, 8);

    return ranked.map((entry) => entry.protein);
  }, [searchDraft]);

  useEffect(() => {
    setSearchDraft(rawInput || "P04637");
  }, [rawInput]);

  useEffect(() => {
    return () => {
      if (hoverPrefetchTimerRef.current) window.clearTimeout(hoverPrefetchTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const submitSearch = (value = searchDraft) => {
    const nextQuery = value.trim();
    if (!nextQuery) return;
    setRawInput(nextQuery);
    setSearchFocused(false);
  };

  const queueNavPrefetch = (href: string) => {
    if (hoverPrefetchTimerRef.current) window.clearTimeout(hoverPrefetchTimerRef.current);
    const timer = window.setTimeout(() => {
      const route = href.split("#")[0] || "/";
      if (route.startsWith("/")) router.prefetch(route);
      void prefetchProteinRouteBundle(href, rawInput || searchDraft);
    }, 100);
    hoverPrefetchTimerRef.current = timer;
  };

  const cancelNavPrefetch = () => {
    if (!hoverPrefetchTimerRef.current) return;
    window.clearTimeout(hoverPrefetchTimerRef.current);
    hoverPrefetchTimerRef.current = null;
  };

  const sidebarContent = (
    <>
      <nav className="space-y-0.5 p-3">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onMouseEnter={() => queueNavPrefetch(item.href)}
            onMouseLeave={cancelNavPrefetch}
            onFocus={() => queueNavPrefetch(item.href)}
            onBlur={cancelNavPrefetch}
            onClick={() => setSidebarOpen(false)}
            className={cn("sidebar-nav-item", activeSection === item.id && "sidebar-nav-item-active")}
            title={item.label}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto border-t border-border p-3">
        <a
          href="https://sid0sid-ops.github.io/BioAlign-Pro-Contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-nav-item mt-1 text-xs"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span>Contact & Feedback</span>
        </a>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/20"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-[22rem] max-w-[92vw] flex-col overflow-hidden border-r border-border bg-white shadow-2xl transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+12px)]"
        )}
      >
        <div className="flex min-h-16 items-center justify-between gap-3 border-b border-border px-4">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight">BioAlign-Pro-Protein-Structure</p>
              <p className="truncate text-xs text-muted-foreground">Protein Structure</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {sidebarContent}
      </aside>

      <div className="transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border bg-white">
          <div className="flex min-h-14 flex-wrap items-center gap-2 px-2 py-2 sm:flex-nowrap sm:gap-3 sm:px-6">
            <div className="flex min-w-0 shrink-0 items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <span className="max-w-[44vw] truncate text-sm font-semibold tracking-tight text-foreground sm:max-w-none">
                Protein Structure
              </span>
            </div>
            <form
              className="order-2 mx-auto flex w-full min-w-0 max-w-3xl items-center sm:order-none sm:flex-1 md:px-3"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch();
              }}
            >
              <div className="group relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  value={searchDraft}
                  onChange={(event) => setSearchDraft(event.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
                  className={cn(
                    "h-10 min-w-0 rounded-l-full rounded-r-none border-border bg-background pl-9 pr-10 text-sm shadow-sm transition-all duration-300 focus-visible:border-primary focus-visible:ring-primary/30",
                    searchFocused && "shadow-md"
                  )}
                  placeholder="Search protein"
                />
                {searchDraft && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => {
                      setSearchDraft("");
                      setSearchFocused(true);
                    }}
                    className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {searchFocused && visibleSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-12 z-50 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-white py-2 shadow-2xl">
                    {visibleSuggestions.map((protein) => (
                      <button
                        key={protein.accession}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          setSearchDraft(protein.accession);
                          submitSearch(protein.accession);
                        }}
                        className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition hover:bg-muted/70"
                      >
                        <Search className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">{protein.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            UniProt: {protein.accession} - {protein.aliases.join(", ")}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                variant="outline"
                aria-label="Search protein"
                onClick={() => submitSearch()}
                className="h-10 w-12 shrink-0 rounded-l-none rounded-r-full border-l-0 px-0 shadow-sm transition-colors duration-200 hover:bg-muted"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="ml-auto hidden items-center gap-2 xl:flex">
              <a href="https://sid0sid-ops.github.io/BioAlign-Pro-Contact/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="hidden h-10 min-w-[112px] whitespace-nowrap px-4 sm:flex gap-1.5 text-xs">
                  <Mail className="h-3 w-3" />
                  Contact
                </Button>
              </a>
            </div>
          </div>
        </header>
        <motion.main
          className="mx-auto w-full max-w-[1800px] overflow-x-hidden px-2 py-3 sm:px-6 sm:py-5 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.main>
        <footer className="border-t border-border px-3 py-3 text-center text-[11px] leading-5 text-muted-foreground sm:px-6">
          <span className="font-medium">BioAlign-Pro-Protein-Structure</span> - Educational use - Not a substitute for professional advice - Data current as of build time
        </footer>
      </div>
    </div>
  );
}
