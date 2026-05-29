"use client";

import { motion } from "framer-motion";
import {
  Atom, BookOpen, Command, Compass, Eye, FlaskConical, GitFork,
  Layers3, LayoutDashboard, Mail, Menu, Network, Search, Settings2,
  Sparkles, X
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommandPalette } from "@/modules/ui/command-palette";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "structure-route", label: "Structure Route", icon: GitFork },
  { id: "scores", label: "Scores", icon: Compass },
  { id: "structure-viewer", label: "Structure Viewer", icon: Eye },
  { id: "domains", label: "Domains", icon: Layers3 },
  { id: "evolution", label: "Evolution", icon: Network },
  { id: "methods", label: "Methods", icon: FlaskConical },
  { id: "function", label: "Function", icon: Sparkles },
  { id: "sources", label: "Sources", icon: Settings2 },
];

const structureLevels = [
  { num: 1, label: "Primary", detail: "Amino acid sequence" },
  { num: 2, label: "Secondary", detail: "α-Helix, β-Sheet" },
  { num: 3, label: "Tertiary", detail: "3D fold of a chain" },
  { num: 4, label: "Quaternary", detail: "Assembly of chains" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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

  const sidebarContent = (
    <>
      <nav className="space-y-0.5 p-3">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setMobileSidebarOpen(false)}
            className={cn(
              "sidebar-nav-item",
              activeSection === item.id && "sidebar-nav-item-active",
              !sidebarOpen && "justify-center"
            )}
            title={item.label}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      {sidebarOpen && (
        <div className="mt-auto border-t border-border p-3">
          <div className="mb-3">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Protein Structure Levels
            </p>
            {structureLevels.map((level) => (
              <div key={level.num} className="flex items-start gap-2.5 px-3 py-1.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {level.num}
                </span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{level.label}</p>
                  <p className="text-[10px] text-muted-foreground">{level.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#methods" className="sidebar-nav-item text-xs">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            {sidebarOpen && <span>Learn more</span>}
          </a>

          <a href="https://sid0sid-ops.github.io/BioAlign-Pro-Contact/" target="_blank" rel="noopener noreferrer"
            className="sidebar-nav-item mt-1 text-xs">
            <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
            {sidebarOpen && <span>Contact & Feedback</span>}
          </a>
        </div>
      )}
    </>
  );

  return (
    <div className="relative min-h-screen">
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      {/* ─── Mobile Overlay ──────────────────────────────────────── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <aside className="flex h-full w-72 flex-col border-r border-border bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-white">
                  <Atom className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-tight">BioAlign Pro</p>
                  <p className="text-[10px] text-muted-foreground">Protein Structure</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* ─── Desktop Sidebar ─────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border bg-white transition-all duration-300 lg:flex",
          sidebarOpen ? "w-60" : "w-16"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-3">
          <div className={cn("flex items-center gap-2.5 overflow-hidden", !sidebarOpen && "justify-center")}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <Atom className="h-4 w-4" />
            </span>
            {sidebarOpen && (
              <div>
                <p className="text-xs font-bold tracking-tight">BioAlign Pro</p>
                <p className="text-[10px] text-muted-foreground">Protein Structure</p>
              </div>
            )}
          </div>
        </div>
        {sidebarContent}
      </aside>

      <div className={cn("transition-all duration-300", sidebarOpen ? "lg:pl-60" : "lg:pl-16")}>
        <header className="sticky top-0 z-30 border-b border-border bg-white">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation"
              onClick={() => setMobileSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-9 pl-9 text-sm" placeholder="Search protein (TP53, hemoglobin, P04637...)"
                onFocus={() => setPaletteOpen(true)} />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPaletteOpen(true)}>
                <Command className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-xs">⌘K</span>
              </Button>
              <a href="https://sid0sid-ops.github.io/BioAlign-Pro-Contact/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs">
                  <Mail className="h-3 w-3" />
                  Contact
                </Button>
              </a>
            </div>
          </div>
        </header>
        <motion.main className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          {children}
        </motion.main>
        <footer className="border-t border-border px-6 py-3 text-center text-[11px] text-muted-foreground">
          <span className="font-medium">BioAlign-Pro-Protein-Structure</span> · Educational use · Not a substitute for professional advice · Data current as of build time
        </footer>
      </div>
    </div>
  );
}
