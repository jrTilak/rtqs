import type { ListMembersOptionsRequest } from "@/server/rest-api/organizations";
import type { ListQuizFoldersRequest } from "@/server/rest-api/quiz-folders/lib";

export const QUERY_KEYS = {
  plugins: {
    theme: (plugin: string) => ["theme-plugin", { plugin }],
    illustration: (plugin: string) => ["illustration-plugin", { plugin }],
    illustrationComponent: (plugin: string, name: string) => [
      "illustration-component",
      { plugin, name },
    ],
    icon: (plugin: string) => ["icon-plugin", { plugin }],
    iconComponent: (plugin: string, name: string) => [
      "icon-component",
      { plugin, name },
    ],
  },
  auth: {
    session: () => ["auth", "session"],
    sessions: () => ["auth", "sessions"],
  },
  organizations: {
    list: () => ["organizations", "list"],
    listMembers: (request?: ListMembersOptionsRequest) => [
      "organizations",
      "list",
      "members",
      { request },
    ],
    listInvitations: () => ["organizations", "list", "invitations"],
    activeMemberRole: () => ["organizations", "activeMemberRole"],
    listMyInvitations: () => ["organizations", "list", "my-invitations"],
    getMyRole: () => ["organizations", "get", "my-role"],
  },
  quizFolders: {
    list: (request?: ListQuizFoldersRequest) => [
      "quiz-folders",
      "list",
      { request },
    ],
  },
};
