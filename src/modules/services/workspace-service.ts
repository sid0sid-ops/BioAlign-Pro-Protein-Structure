export interface WorkspaceSnapshot {
  id: string;
  name: string;
  sequenceName: string;
  sequence: string;
  selectedTemplateId?: string;
  createdAt: string;
}

export function createWorkspaceSnapshot(snapshot: Omit<WorkspaceSnapshot, "id" | "createdAt">): WorkspaceSnapshot {
  return {
    ...snapshot,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
}
