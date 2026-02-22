import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
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

export const queryUserOrganizationsOptions = queryOptions({
  queryKey: QUERY_KEYS.auth.userOrganizations(),
  queryFn: async () => {
    const res = await auth.organization.list();
    if (res.error?.code) {
      throw new BetterAuthError(res.error.code);
    } else if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  },
});
