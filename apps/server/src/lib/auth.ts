import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { createAuthMiddleware, magicLink } from 'better-auth/plugins';
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
    }),
    admin(),
  ],
  trustedOrigins: ['http://localhost:5000', 'http://localhost:5173'],
  baseURL: 'http://localhost:5000',
  logger: {
    level: 'debug',
    disabled: false,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // only allow login of whitelisted users
      if (ctx.path !== '/sign-in/magic-link') return;

      console.log(ctx.body);

      const email = ctx.body.email;

      if (!email || email === process.env.SUPER_ADMIN_EMAIL) return;

      //look into db for users
      const shouldLogin = false;
      if (shouldLogin) return;

      throw new APIError('FORBIDDEN', {
        message:
          'You have not registered to the event, Please contact administrator if you believe this is a mistake.',
      });
    }),
  },
});
