import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient as auth } from "./lib";
import type { MagicLinkLoginProps } from "./types";
import { QUERY_KEYS } from "@/constants/query-keys";
import { BetterAuthError } from "better-auth";

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: () =>
      auth.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      }),
  });
};

export const useAnonymousLogin = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await auth.signIn.anonymous();
      if (res.error?.code) {
        throw new BetterAuthError(res.error.code);
      } else if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
  });
};

export const useMagicLinkLogin = () => {
  return useMutation({
    mutationFn: ({ email, name }: MagicLinkLoginProps) =>
      auth.signIn.magicLink({
        email,
        callbackURL: window.location.origin,
        name,
        newUserCallbackURL: `${window.location.origin}/onboarding`,
      }),
  });
};

export const querySessionOptions = queryOptions({
  queryKey: QUERY_KEYS.auth.session(),
  queryFn: async () => {
    const res = await auth.getSession();
    if (res.error?.code) {
      throw new BetterAuthError(res.error.code);
    } else if (res.error) {
      throw new Error(res.error.message);
    }
    if (!res.data) {
      throw new Error("No active session");
    }
    return res.data;
  },
  retry: false,
});

/**
 * Use this hook when you are absolutely sure that the user is authenticated
 */
export const useUser = () => {
  const { data: session } = useQuery(querySessionOptions);
  return session?.user!;
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: Parameters<typeof auth.multiSession.revoke>[0],
    ) => {
      const res = await auth.multiSession.revoke(params);
      if (res.error) {
        throw new Error(res.error?.message || "Failed to revoke session");
      }

      await queryClient.invalidateQueries(querySessionOptions);

      return res.data;
    },
  });
};

export const listSessionsOptions = queryOptions({
  queryKey: QUERY_KEYS.auth.sessions(),
  queryFn: async () => {
    const res = await auth.multiSession.listDeviceSessions();
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  },
});

export const useSetActiveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      args: Parameters<typeof auth.multiSession.setActive>[0],
    ) => {
      const res = await auth.multiSession.setActive(args);
      if (res.error) {
        throw new Error(res.error.message);
      }

      await queryClient.invalidateQueries(querySessionOptions);

      return res.data;
    },
  });
};

export * from "../organizations/hooks";
