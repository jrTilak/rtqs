import { type ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { Toaster } from "react-hot-toast";
export type ProviderProps = {
  children: ReactNode;
};

export const RootProvider = ({ children }: ProviderProps) => {
  return (
    <QueryProvider>
      {children}
      <Toaster
        toastOptions={{
          position: "top-center",
        }}
      />
    </QueryProvider>
  );
};
