import { Logger } from '../logger';
import { getMailCreds } from './utils';
import { validateMailCreds, MailCredsType } from './validation';
import nodemailer, { Transporter } from 'nodemailer';

class Mail {
  private _currentMailClient: number;
  private _mailClients: Transporter[] = [];
  private _creds: MailCredsType[];
  private _logger: Logger;

  constructor() {
    validateMailCreds();

    this._currentMailClient = 0;
    this._creds = getMailCreds();

    this._creds.forEach((cred) => {
      const mailClient = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: cred.email,
          pass: cred.password,
        },
      });
      this._mailClients.push(mailClient);
    });

    this._logger = new Logger(Mail.name);
  }

  private _getClient() {
    const curr = this._currentMailClient;
    this._currentMailClient =
      (this._currentMailClient + 1) % this._creds.length;
    return { t: this._mailClients[curr], creds: this._creds[curr] };
  }

  async sendMail(args: SendMailArgs) {
    try {
      const { t, creds } = this._getClient();
      await t.sendMail({
        from: `"${creds.name}" <${creds.email}>`,
        to: args.to,
        subject: args.subject,
        html: args.content,
      });
    } catch (err) {
      this._logger.error(err);
    }
  }
}

type SendMailArgs = {
  content: string;
  subject: string;
  to: string;
};

export const mail = new Mail();
