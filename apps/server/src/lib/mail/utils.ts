import { MailCredsType } from './validation';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

export const getMailCreds = (): MailCredsType[] => {
  try {
    const filePath = path.join(process.cwd(), process.env.MAIL_CREDS_PATH);
    const json = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(json);
    return parsed as MailCredsType[];
  } catch (err) {
    console.error(err);
    return [];
  }
};
