# ----------------------------
# Stage 1: Base + Dependencies
# ----------------------------
FROM node:24-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy only package.json of server and web-client to install deps
COPY apps/server/package.json apps/server/package.json
COPY apps/web-client/package.json apps/web-client/package.json

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ----------------------------
# Stage 2: Build
# ----------------------------
FROM base AS builder

WORKDIR /app

# Copy all source code
COPY . .

# Build only the web-client
RUN pnpm --filter @rtqs/web-client build

# ----------------------------
# Stage 3: Runner
# ----------------------------
FROM node:24-alpine AS runner

# Install serve globally to serve SPA
RUN npm install -g serve

WORKDIR /app

# Copy only the built static files
COPY --from=builder /app/apps/web-client/dist ./dist

# Serve SPA with fallback to index.html, dynamic port
CMD ["sh", "-c", "serve -s dist -l ${CLIENT_PORT:-5173}"]
