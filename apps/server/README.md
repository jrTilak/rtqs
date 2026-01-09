# Realtime Quiz System - Server

The backend service built with **NestJS**, handling API requests and WebSocket connections for the quiz lobbies.

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) (Node.js) - specific version 10
- **Database ORM**: [MikroORM](https://mikro-orm.io/) (PostgreSQL) - specific version 6
- **Real-time**: [Socket.IO](https://socket.io/) Gateway
- **Validation**: Zod & NestJS Pipes
- **Documentation**: Swagger/OpenAPI

## Setup & Migration

Run migrations to set up the database schema:

```bash
pnpm mikro-orm migration:create && pnpm mikro-orm migration:up
```
