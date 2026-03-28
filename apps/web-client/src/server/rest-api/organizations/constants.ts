export const ORG_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  OWNER: "owner",
} as const;

export const ORG_ROLE_DESCRIPTION = {
  [ORG_ROLES.ADMIN]: "Can manage everything in the organization",
  [ORG_ROLES.MEMBER]:
    "Can view the organization and its members, manage quizzes they are invited to.",
  [ORG_ROLES.OWNER]: "Can manage everything in the organization",
};
