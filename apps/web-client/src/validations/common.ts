import { z, ZodString } from "zod";
import {
  DESCRIPTION_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "./length";

const email = () =>
  z
    .string()
    .trim()
    .nonempty("Email is required")
    .max(
      EMAIL_MAX_LENGTH,
      `Email cannot be longer than ${EMAIL_MAX_LENGTH} characters`,
    )
    .email("Invalid email address")
    .transform((value) => value.toLowerCase());

const password = () =>
  z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(
      PASSWORD_MIN_LENGTH,
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `Password cannot be longer than ${PASSWORD_MAX_LENGTH} characters`,
    );

const username = () =>
  z
    .string()
    .trim()
    .nonempty("Username is required")
    .min(
      USERNAME_MIN_LENGTH,
      `Username must be at least ${USERNAME_MIN_LENGTH} characters long`,
    )
    .max(
      USERNAME_MAX_LENGTH,
      `Username cannot be longer than ${USERNAME_MAX_LENGTH} characters`,
    )
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must be alphanumeric and can include underscores only",
    )
    .transform((value) => value.trim().toLowerCase());

const otpCode = () =>
  z
    .string()
    .nonempty("OTP is required")
    .trim()
    .length(6, "OTP should be of 6 characters");

const name = () =>
  z
    .string()
    .nonempty("Name is required")
    .trim()
    .min(NAME_MIN_LENGTH, "Name is required")
    .max(
      NAME_MAX_LENGTH,
      `Name cannot be longer than ${NAME_MAX_LENGTH} characters`,
    );

const identifier = () => z.union([email(), username()]);

const stringNumber = () =>
  z.union([
    z
      .string()
      .trim()
      .transform((v) => {
        const nbr = Number(v);
        if (isNaN(nbr)) {
          throw new Error("Invalid number format");
        }
        return nbr;
      }),
    z.number(),
  ]) as unknown as ZodString;

const uuid = (message?: string) =>
  z
    .string()
    .nonempty(message || "UUID is required")
    .trim()
    .uuid();

export const description = (message?: string) =>
  z
    .string()
    .trim()
    .max(
      DESCRIPTION_MAX_LENGTH,
      message ||
        `Description cannot be longer than ${DESCRIPTION_MAX_LENGTH} characters`,
    );

const common = {
  email,
  password,
  username,
  otpCode,
  name,
  identifier,
  stringNumber,
  uuid,
  description,
};

export { common as c };
