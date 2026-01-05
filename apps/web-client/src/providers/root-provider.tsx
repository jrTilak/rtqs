import { type ReactNode } from "react"
import { QueryProvider } from "./query-provider"
import { Toaster } from "react-hot-toast"
import { useSocket } from "@/server/ws/hooks"
export type ProviderProps = {
  children: ReactNode
}

export const RootProvider = ({ children }: ProviderProps) => {

  useSocket()

  return (
    <QueryProvider>
      {children}
      <Toaster
        toastOptions={{
          position: "top-center"
        }}
      />
    </QueryProvider>
  )
}
