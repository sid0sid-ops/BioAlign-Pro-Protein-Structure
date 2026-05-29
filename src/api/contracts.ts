import { z } from "zod";

export const proteinSequenceRequestSchema = z.object({
  name: z.string().min(1).max(120).default("Untitled protein"),
  sequence: z.string().min(1).max(50_000)
});

export const homologyRunSchema = proteinSequenceRequestSchema.extend({
  workspaceId: z.string().optional(),
  parameters: z
    .object({
      maxTemplates: z.number().int().min(1).max(50).default(10),
      identityCutoff: z.number().min(0).max(100).default(50),
      includeAlphaFold: z.boolean().default(true)
    })
    .partial()
    .optional()
});

export type ProteinSequenceRequest = z.infer<typeof proteinSequenceRequestSchema>;
export type HomologyRunRequest = z.infer<typeof homologyRunSchema>;
