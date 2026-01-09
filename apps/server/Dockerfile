# ----------------------------
# Base image with Node and pnpm
# ----------------------------
FROM node:24-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# ----------------------------
# Install dependencies
# ----------------------------
FROM base AS dependencies

# Copy root package files for workspace dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy server and web-client package.json to install only their deps
COPY apps/server/package.json apps/server/package.json
COPY apps/web-client/package.json apps/web-client/package.json

# Install all dependencies (frozen lockfile ensures reproducibility)
RUN pnpm install --frozen-lockfile

# ----------------------------
# Build the server
# ----------------------------
FROM base AS builder

# Copy installed node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/server/node_modules ./apps/server/node_modules

# Copy all source code
COPY . .

# Set environment to production for build
ENV NODE_ENV=production

# Build only the server package
RUN pnpm --filter @rtqs/server build

# ----------------------------
# Runner stage (final image)
# ----------------------------
FROM base AS runner

WORKDIR /app

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy built server files from builder
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/apps/server/mikro-orm.config.ts ./apps/server/mikro-orm.config.ts
COPY --from=builder /app/apps/server/src ./apps/server/src
COPY --from=builder /app/apps/server/tsconfig.json ./apps/server/tsconfig.json
COPY --from=builder /app/package.json ./package.json

# Switch to server folder
WORKDIR /app/apps/server

# Run migrations and start server
CMD pnpm dlx mikro-orm migration:up && pnpm run star:prod
