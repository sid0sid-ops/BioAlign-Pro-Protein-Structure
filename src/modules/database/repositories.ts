import { prisma } from "@/database/prisma";

export const workspaceRepository = {
  findRecent(userId: string) {
    return prisma.workspace.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      take: 10
    });
  },
  findWithSequences(workspaceId: string) {
    return prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        sequences: true,
        jobs: {
          include: {
            templateHits: true,
            structures: true,
            analysisResults: true
          }
        }
      }
    });
  }
};
