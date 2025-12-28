import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { getMailCreds } from './utils';
import { plainToInstance, Type } from 'class-transformer';
import { logger } from '../logger';

class MailCredsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

class MailCredsArr {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MailCredsDto)
  mails: MailCredsDto;
}

export type MailCredsType = InstanceType<typeof MailCredsDto>;

export const validateMailCreds = () => {
  const mailCreds = getMailCreds();

  const validatedConfig = plainToInstance(MailCredsArr, { mails: mailCreds });

  // validate
  const errors = validateSync(validatedConfig, {
    whitelist: true,
  });

  if (errors.length > 0) {
    logger.error('Mail Creds validation failed:');
    logger.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  }

  // overwrite process.env with validated values
  Object.entries(validatedConfig).forEach(([key, value]) => {
    if (value !== undefined) {
      process.env[key] = value; // all values are already strings
    }
  });
};
