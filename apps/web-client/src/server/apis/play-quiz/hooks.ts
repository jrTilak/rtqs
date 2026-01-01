import { KEYS } from "@/server/keys";
import { useQuery } from "@tanstack/react-query";
import { listLobbies, type ListLobbiesParams } from ".";

export const useListLobbies = (params: ListLobbiesParams) => {
  return useQuery({
    queryKey: KEYS.playQuiz.listLobbies(params),
    queryFn: () => listLobbies(params).then((res) => res.data),
  });
};
