---
---

# Pocket IQ

## API Overview

The API supports four types of routes:

### 1. POST (Create)

Creates a new document in the database and returns a success response upon completion.

### 2. GET (Read)

Retrieves documents based on optional filter criteria.

### 3. DELETE

Removes documents matching specified filters and returns the ID of the deleted document.

### 4. PATCH (Update)

Updates an existing document, typically identified by its document ID.

## Authentication

Authentication is managed using Better Auth. See [/api/auth/docs/](/api/auth/docs/) for more info.
