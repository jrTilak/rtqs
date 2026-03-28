import { createAccessControl } from "better-auth/plugins/access";

const CRUD_PERMISSIONS = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
} as const;

export const PERMISSIONS = {
  quizFolder: CRUD_PERMISSIONS,
} as const;

const values = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as T[keyof T][];

// includes everything, including delete
const canManageDangerously = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as T[keyof T][];

const canReadonly = <T extends Record<string, string>>(obj: T) =>
  Object.values(obj) as T[keyof T][];

const statement = Object.fromEntries(
  Object.entries(PERMISSIONS).map(([key, value]) => [key, values(value)]),
) as Record<keyof typeof PERMISSIONS, string[]>;

export const ac = createAccessControl(statement);

export const ROLES = {
  member: ac.newRole({
    quizFolder: canReadonly(PERMISSIONS.quizFolder),
  }),
  admin: ac.newRole({
    quizFolder: canManageDangerously(PERMISSIONS.quizFolder),
  }),
  owner: ac.newRole({
    quizFolder: canManageDangerously(PERMISSIONS.quizFolder),
  }),
} as const;
