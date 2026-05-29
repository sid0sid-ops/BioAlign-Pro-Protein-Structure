# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ─── Dependencies ──────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ─── Build stage (shared) ──────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npx next build --webpack

# Build Express API
RUN npx tsc -p tsconfig.server.json

# ─── Production web image (Next.js) ───────────────────────────────
FROM base AS web
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# ─── Production API image (Express) ───────────────────────────────
FROM base AS api
ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 apiuser

COPY --from=builder /app/dist ./dist
COPY --from=deps    /app/node_modules ./node_modules
COPY package.json ./

USER apiuser
EXPOSE 4000
CMD ["node", "dist/server/index.js"]
