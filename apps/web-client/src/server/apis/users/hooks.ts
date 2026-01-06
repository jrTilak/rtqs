import { KEYS } from "@/server/keys";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListUsers = () => {
  return useQuery({
    queryKey: KEYS.users.list(),
    queryFn: async () => {
      const res = await authClient.admin.listUsers({
        query: {
          limit: 999, // todo implement pagintion and query
          sortBy: "name",
          sortDirection: "asc",
        },
      });
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data.users;
    },
  });
};

export const useChangeRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Parameters<typeof authClient.admin.setRole>) => {
      const res = await authClient.admin.setRole(...data);
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.users.list(),
      });
    },
  });
};
