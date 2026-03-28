import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";
import { authClient } from "../auth/lib";
import { QUERY_KEYS } from "@/constants/query-keys";
import { BetterAuthError } from "better-auth";

export const createOptions = mutationOptions({
  mutationFn: async (
    args: Parameters<typeof authClient.organization.create>[0],
  ) => {
    const res = await authClient.organization.create(args);
    if (res.error) {
      throw new BetterAuthError(res.error.code || "");
    }
    return res.data;
  },
});

export const listOptions = queryOptions({
  queryFn: async () => {
    const res = await authClient.organization.list();
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  },
  queryKey: QUERY_KEYS.organizations.list(),
});

export const getActiveMemberRoleOptions = queryOptions({
  queryFn: async () => {
    const res = await authClient.organization.getActiveMemberRole();
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  },
  queryKey: QUERY_KEYS.organizations.activeMemberRole(),
});

export const setActiveOptions = mutationOptions({
  mutationFn: async (
    args: Parameters<typeof authClient.organization.setActive>[0],
  ) => {
    const res = await authClient.organization.setActive(args);
    if (res.error) {
      throw new BetterAuthError(res.error.message || "");
    }
    return res.data;
  },
});

export const updateOptions = mutationOptions({
  mutationFn: async (
    args: Parameters<typeof authClient.organization.update>[0],
  ) => {
    const res = await authClient.organization.update(args);
    if (res.error) {
      throw new BetterAuthError(res.error.message || "");
    }
    return res.data;
  },
});

export const inviteMemberOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.inviteMember>[0],
    ) => {
      const res = await authClient.organization.inviteMember(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listInvitations(),
        });
      }
    },
  });

export type ListMembersOptionsRequest = Parameters<
  typeof authClient.organization.listMembers
>[0];
export const listMembersOptions = (request?: ListMembersOptionsRequest) =>
  queryOptions({
    queryFn: async () => {
      const res = await authClient.organization.listMembers(request);
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    queryKey: QUERY_KEYS.organizations.listMembers(request),
  });

export const listInvitationsOptions = () =>
  queryOptions({
    queryFn: async () => {
      const res = await authClient.organization.listInvitations();
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    queryKey: QUERY_KEYS.organizations.listInvitations(),
  });

export const cancelInvitationOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.cancelInvitation>[0],
    ) => {
      const res = await authClient.organization.cancelInvitation(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listInvitations(),
        });
      }
    },
  });

export const listMyInvitationsOptions = queryOptions({
  queryFn: async () => {
    const res = await authClient.organization.listUserInvitations();
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  },
  queryKey: QUERY_KEYS.organizations.listMyInvitations(),
});

export const rejectInvitationOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.rejectInvitation>[0],
    ) => {
      const res = await authClient.organization.rejectInvitation(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listMyInvitations(),
        });
      }
    },
  });

export const acceptInvitationOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.acceptInvitation>[0],
    ) => {
      const res = await authClient.organization.acceptInvitation(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listMyInvitations(),
        });
      }
    },
  });

export const getMyRoleOptions = () =>
  queryOptions({
    queryFn: async () => {
      const res = await authClient.organization.getActiveMemberRole();
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    queryKey: QUERY_KEYS.organizations.getMyRole(),
  });

export const removeMemberOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.removeMember>[0],
    ) => {
      const res = await authClient.organization.removeMember(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listMembers(),
        });
      }
    },
  });

export const leaveOrganizationOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.leave>[0],
    ) => {
      const res = await authClient.organization.leave(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.list(),
        });
      }
    },
  });

export const updateMemberRoleOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      args: Parameters<typeof authClient.organization.updateMemberRole>[0],
    ) => {
      const res = await authClient.organization.updateMemberRole(args);
      if (res.error) {
        throw new BetterAuthError(res.error.message || "");
      }
      return res.data;
    },
    onSuccess: () => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.organizations.listMembers(),
        });
      }
    },
  });
