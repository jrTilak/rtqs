import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import type { ProviderProps } from "./root-provider"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }

})

export const QueryProvider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {
        import.meta.env.DEV && (
          <ReactQueryDevtools initialIsOpen={false} />
        )
      }
    </QueryClientProvider>
  )
}
