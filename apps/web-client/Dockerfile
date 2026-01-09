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
COPY --from=dependencies /app/apps/web-client/node_modules ./apps/web-client/node_modules
COPY . .


RUN pnpm --filter @rtqs/web-client build

FROM node:22-alpine AS runner
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/apps/web-client/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "5173"]
