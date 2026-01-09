# ----------------------------
# Stage 1: Base + Dependencies
# ----------------------------
FROM node:24-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy root package files for workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy server package.json to get its deps
COPY apps/server/package.json apps/server/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# ----------------------------
# Stage 2: Build
# ----------------------------
FROM base AS builder

WORKDIR /app

# Copy all source code
COPY . .

# Build server package only
RUN pnpm --filter @rtqs/server build

# ----------------------------
# Stage 3: Runner
# ----------------------------
FROM node:24-alpine AS runner

# Install pnpm globally in this stage
RUN npm install -g pnpm

WORKDIR /app/apps/server

# Copy node_modules from dependencies
COPY --from=base /app/node_modules ./node_modules

# Copy compiled server files
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json

# Use compiled JS config for MikroORM
# (Make sure tsconfig compiled mikro-orm.config.ts -> dist/mikro-orm.config.js)
COPY --from=builder /app/apps/server/dist/mikro-orm.config.js ./dist/mikro-orm.config.js

# Set production environment
ENV NODE_ENV=production

# Run migrations then start the server
CMD pnpm dlx mikro-orm migration:up -c dist/mikro-orm.config.js && node dist/src/main.js
