import { authClient } from "@/lib/auth-client"
import { useMutation } from "@tanstack/react-query"
import type { LoginWithMagicLinkArgs } from "./types"

export const useLoginByMagicLink = () => {
  return useMutation({
    mutationFn: async (args: LoginWithMagicLinkArgs) => {
      const res = await authClient.signIn.magicLink({ email: args.email, callbackURL: window.location.origin, name: args.name })
      if (res.error) {
        throw new Error(res.error.message)
      }
      return res.data
    }
  })

}
