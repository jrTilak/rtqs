import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { mail } from './mail';
import { MAIL_TEMPLATES } from './mail/templates';
import { admin } from 'better-auth/plugins';
import { MikroORM } from '@mikro-orm/core';
import { mikroOrmAdapter } from 'better-auth-mikro-orm';

export const createAuth = (orm: MikroORM) =>
  betterAuth({
    database: mikroOrmAdapter(orm),
    advanced: {
      database: {
        generateId: false,
      },
    },

    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          return mail.sendMail({
            to: email,
            ...MAIL_TEMPLATES.magicLink({
              expiresIn: '5',
              magicLink: url,
            }),
          });
        },
        // disableSignUp: process.env.DISABLE_SIGNUP === 'true', // todo implement this in send magic link
      }),
      admin(),
    ],
    trustedOrigins: [process.env.BETTER_AUTH_URL!, process.env.CORS_ORIGINS!],
    baseURL: process.env.BETTER_AUTH_URL,
    logger: {
      level: 'debug',
      disabled: false,
    },
  });

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;
