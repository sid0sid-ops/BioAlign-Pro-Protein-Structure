import axios from "axios";
import { withRetry } from "./retry";

export interface FoldseekSearchResult {
  query: string;
  target: string;
  score: number;
  probability: number;
  evalue: number;
}

export async function submitFoldseekSearch(pdbText: string) {
  const baseUrl = process.env.FOLDSEEK_BASE_URL ?? "https://search.foldseek.com/api";
  const response = await withRetry(() =>
    axios.post<{ id: string }>(
      `${baseUrl}/ticket`,
      { q: pdbText, database: ["pdb100"] },
      { timeout: 30_000 }
    )
  );
  return response.data;
}
