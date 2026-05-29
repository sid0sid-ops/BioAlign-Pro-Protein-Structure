import axios from "axios";
import { withRetry } from "./retry";

export interface BlastSubmission {
  rid: string;
  rtoe?: string;
}

export async function submitBlast(sequence: string): Promise<BlastSubmission> {
  const baseUrl = process.env.NCBI_BLAST_BASE_URL ?? "https://blast.ncbi.nlm.nih.gov/Blast.cgi";
  const params = new URLSearchParams({
    CMD: "Put",
    PROGRAM: "blastp",
    DATABASE: "pdb",
    QUERY: sequence
  });

  const response = await withRetry(() =>
    axios.post<string>(baseUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 30_000
    })
  );

  const rid = response.data.match(/RID = ([A-Z0-9-]+)/)?.[1] ?? "pending";
  const rtoe = response.data.match(/RTOE = (\d+)/)?.[1];
  return { rid, rtoe };
}
