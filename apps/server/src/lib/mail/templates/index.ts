import { APP_CONFIG } from '@/config/app.config';
import fs from 'fs';
import handlebars from 'handlebars';
import path from "path"

const parseHbs = <T>(source: string, args: T) => {
  const raw = fs.readFileSync(source, 'utf-8');
  const template = handlebars.compile(raw);
  return template(args);
}

export const MAIL_TEMPLATES = {

  magicLink(args: MagicLinkArgs) {
    return {
      content: parseHbs(path.join(process.cwd(), "/src/lib/mail/templates", "magic-link.hbs"), {
        appName: APP_CONFIG.NAME,
        ...args
      }),
      subject: `Log in to ${APP_CONFIG.NAME}`
    }
  }
}

type MagicLinkArgs = {
  magicLink: string,
  expiresIn: string | number
}

