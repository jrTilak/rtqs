import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { magicLink } from 'better-auth/plugins';
import { mail } from './mail';
import { MAIL_TEMPLATES } from './mail/templates';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
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
  trustedOrigins: ['http://localhost:5000', 'http://localhost:5173'],
  baseURL: 'http://localhost:5000',
  logger: {
    level: 'debug',
    disabled: false,
  },
});
