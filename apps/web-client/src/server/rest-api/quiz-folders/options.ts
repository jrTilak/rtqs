import {
  mutationOptions,
  QueryClient,
  queryOptions,
} from "@tanstack/react-query";
import {
  createQuizFolder,
  deleteQuizFolder,
  listQuizFolders,
  updateQuizFolder,
  type CreateQuizFolderRequest,
  type DeleteQuizFolderRequest,
  type ListQuizFoldersRequest,
  type UpdateQuizFolderRequest,
} from "./lib";
import { QUERY_KEYS } from "@/constants/query-keys";
import { alert } from "@/components/ui/confirm-dialog";
import { parseErrorMessage } from "@/lib/parse-error-message";

export const createQuizFolderOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (request: CreateQuizFolderRequest) => {
      const res = await createQuizFolder(request);
      return res.data;
    },
    onSuccess: (_, req) => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.quizFolders.list(req),
        });
      }
    },
    onError: (error) => {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    },
  });

export const listQuizFoldersOptions = (request?: ListQuizFoldersRequest) =>
  queryOptions({
    queryFn: async () => {
      const res = await listQuizFolders(request);
      return res.data;
    },
    queryKey: QUERY_KEYS.quizFolders.list(request),
  });

export const updateQuizFolderOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (request: UpdateQuizFolderRequest) => {
      const res = await updateQuizFolder(request);
      return res.data;
    },
    onSuccess: (_, req) => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.quizFolders.list(req),
        });
      }
    },
    onError: (error) => {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    },
  });

export const deleteQuizFolderOptions = (queryClient?: QueryClient) =>
  mutationOptions({
    mutationFn: async (
      request: DeleteQuizFolderRequest & {
        ctx?: ListQuizFoldersRequest;
      },
    ) => {
      await deleteQuizFolder(request);
    },
    onSuccess: (_, req) => {
      if (queryClient) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.quizFolders.list(req.ctx),
        });
      }
    },
    onError: (error) => {
      alert({
        title: "Error",
        description: parseErrorMessage(error),
        variant: "destructive",
      });
    },
  });
