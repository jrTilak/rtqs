FROM node:22-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json apps/server/package.json
COPY apps/web-client/package.json apps/web-client/package.json
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/server/node_modules ./apps/server/node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm --filter @rtqs/server build

FROM base AS runner
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/apps/server/mikro-orm.config.ts ./apps/server/mikro-orm.config.ts
COPY --from=builder /app/apps/server/src ./apps/server/src
COPY --from=builder /app/apps/server/tsconfig.json ./apps/server/tsconfig.json
COPY --from=builder /app/package.json ./package.json

WORKDIR /app/apps/server
EXPOSE 5000
CMD npx mikro-orm migration:up && node dist/main
