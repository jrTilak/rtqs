# ----------------------------
# Base image with Node 24 and pnpm
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

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy only package.json of server and web-client to install deps
COPY apps/server/package.json apps/server/package.json
COPY apps/web-client/package.json apps/web-client/package.json

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ----------------------------
# Build web-client
# ----------------------------
FROM base AS builder

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/web-client/node_modules ./apps/web-client/node_modules

# Copy all source code
COPY . .

# Build only the web-client
RUN pnpm --filter @rtqs/web-client build

# ----------------------------
# Runner stage (Node 24)
# ----------------------------
FROM node:24-alpine AS runner

# Install serve globally to serve static files
RUN npm install -g serve

WORKDIR /app

# Copy built web-client files
COPY --from=builder /app/apps/web-client/dist ./dist

# Serve SPA with fallback to index.html, using dynamic port
CMD sh -c "serve -s dist -l ${CLIENT_PORT:-5173}"
