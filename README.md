# Realtime Quiz System

A comprehensive real-time quiz platform where administrators can manage quizzes and users can participate in live lobby sessions.

## Project Structure

This is a monorepo managed by `pnpm` workspaces:

- **apps/server**: The backend API and WebSocket server.
- **apps/web-client**: The frontend React application.

## Quick Start

### 1. Start database

Ensure you have a PostgreSQL database running and configured.

### 2. Start the Server

```bash
pnpm -F @rtqs/server run start:dev
```

### 3. Start the Web Client

```bash
pnpm -F @rtqs/web-client run dev
```

## Features

- **Admin Dashboard**: Manage quizzes, modules, and questions. Control live game lobbies.
- **Real-time Gameplay**: WebSocket-based synchronization for question progression and leaderboard updates.
- **Interactive UI**: Modern responsive design for both mobile players and desktop admins.
