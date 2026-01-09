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

Here’s a **short README** for your setup — simple, clear, and enough to run the Docker environment with the environment variables:

---

# Docker Setup

This project uses **Docker Compose** to run Postgres, backend, and frontend in containers.

## 1. Environment Variables

Create a `.env` file or pass variables directly. Examples:

```env
# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=realtime_quiz

# Backend server
SERVER_PORT=5000
SERVER_EXPOSED_PORT=5000

# Web client
CLIENT_PORT=5173
CLIENT_EXPOSED_PORT=5173
```

- `SERVER_PORT` / `CLIENT_PORT` → port inside the container
- `SERVER_EXPOSED_PORT` / `CLIENT_EXPOSED_PORT` → port on the host machine

> Defaults are used if variables are not provided.

---

## 2. Build and Run Containers

```bash
# Build and start all services
docker-compose up --build
```

- Postgres will start first, then backend, then frontend.
- Backend connects to Postgres using `DATABASE_URL` defined in Docker Compose.
- Frontend is served as a SPA with fallback to `index.html`.

---

## 3. Access

- Backend: `http://localhost:${SERVER_EXPOSED_PORT}`
- Frontend: `http://localhost:${CLIENT_EXPOSED_PORT}`

> Example with default ports: backend `5000`, frontend `5173`.

---

## 4. Notes

- Database ports **don’t need to be exposed** if only the backend connects.
- Port mapping can be changed dynamically via `.env`.
- Containers restart automatically (`restart: always`).

---

This is enough to **get the project running** with Docker Compose on any machine or VPS.
