"use client";

import { PageTransition } from "@/animations/page-transition";
import { AppShell } from "@/layouts/app-shell";
import { ProteinQueryWorkflow } from "@/modules/query/protein-query-workflow";
import { SequenceWorkbench } from "@/modules/sequence-analysis/sequence-workbench";

export function DashboardShell() {
  return (
    <AppShell>
      <PageTransition>
        <div className="grid gap-5">
          <section id="sequence">
            <ProteinQueryWorkflow />
          </section>
          <section id="sequence-workbench">
            <SequenceWorkbench />
          </section>
        </div>
      </PageTransition>
    </AppShell>
  );
}
