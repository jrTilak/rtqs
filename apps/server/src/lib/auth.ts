import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { betterAuth } from "better-auth";
import { dataSource } from "../db";
import { username } from "better-auth/plugins/username";
import { serializeUsername } from "./serialize-username";
import { magicLink } from "better-auth/plugins";
import { anonymous } from "better-auth/plugins";
import { organization } from "better-auth/plugins";
import { lastLoginMethod } from "better-auth/plugins";
import { multiSession } from "better-auth/plugins";
import { openAPI } from "better-auth/plugins";

export const GUEST_EMAIL_DOMAIN = "guest.rtqs";

export const auth = betterAuth({
  database: typeormAdapter(dataSource, {
    outputDir: "./src/db",
  }),
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    ...(process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) ||
      []),
  ],
  baseURL: process.env.BETTER_AUTH_URL,
  logger: {
    level: process.env.NODE_ENV === "prod" ? "error" : "debug",
    disabled: process.env.NODE_ENV === "prod",
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
    magicLink({
      // todo: implement this function to send magic link emails
      sendMagicLink: ({ email, url }) => {
        console.log(`Send magic link to ${email}: ${url}`);
        return;
      },
    }),
    anonymous({
      emailDomainName: GUEST_EMAIL_DOMAIN,
    }),
    organization(),
    lastLoginMethod(),
    multiSession(),
    openAPI({
      disableDefaultReference: true,
    }),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
  databaseHooks: {
    user: {
      create: {
        // eslint-disable-next-line @typescript-eslint/require-await
        before: async (user) => {
          const username = user.username ?? serializeUsername(user.email);
          return {
            data: {
              ...user,
              username,
              displayUsername: username,
            },
          };
        },
      },
    },
  },
});
