import { MailCredsType } from './validation';
import fs from 'fs';
export const getMailCreds = (): MailCredsType[] => {
  try {
    const json = fs.readFileSync(process.env.MAIL_CREDS_PATH, 'utf8');
    const parsed = JSON.parse(json);
    return parsed as MailCredsType[];
  } catch {
    return [];
  }
};
