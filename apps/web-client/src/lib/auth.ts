import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { anonymousClient } from "better-auth/client/plugins";
import { lastLoginMethodClient } from "better-auth/client/plugins";
import { multiSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
  plugins: [
    usernameClient(),
    anonymousClient(),
    lastLoginMethodClient(),
    multiSessionClient(),
  ],
});
