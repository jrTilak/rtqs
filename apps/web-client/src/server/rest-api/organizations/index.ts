import { mutationOptions, queryOptions } from "@tanstack/react-query";
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
