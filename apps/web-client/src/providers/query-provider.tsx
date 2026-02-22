import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const __CACHE_TIME__ = 5 * 60 * 1000; // 5 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: __CACHE_TIME__,
      gcTime: __CACHE_TIME__,

      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

const persistQueryClient: typeof persister = (() => {
  return {
    ...persister,
    // Don't persist if any query has meta.persist === false
    persistClient: async (client) => {
      if (client.clientState.queries.find((q) => q.meta?.persist === false))
        return;
      await persister.persistClient(client);
    },
  };
})();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: persistQueryClient,
        maxAge: __CACHE_TIME__,
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
};
