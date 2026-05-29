import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BioAlign-Pro-Protein-Structure — Scientific Protein Intelligence Workspace",
  description: "BioAlign-Pro-Protein-Structure: A browser-native protein structure intelligence workspace for exploration, structural comparison, sequence analysis, and bioinformatics research.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  keywords: ["protein structure", "bioinformatics", "AlphaFold", "RCSB PDB", "UniProt", "RMSD", "TM-score", "sequence analysis", "protein prediction"],
  authors: [{ name: "BioAlign-Pro-Protein-Structure" }]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
