import { ERROR_MESSAGES } from "@/constants/error-messages";
import axios from "axios";
import { BetterAuthError } from "better-auth";

export function parseErrorMessage(
  err: unknown,
  defaultMessage = "Unknown error occurred",
): string {
  console.log("error", err);
  // Axios error
  if (axios.isAxiosError(err)) {
    console.log("axios error", err.response?.data);
    return err.response?.data?.message || err.message || defaultMessage;
  }

  // better auth error
  if (err instanceof BetterAuthError) {
    return (
      ERROR_MESSAGES[err.message as keyof typeof ERROR_MESSAGES] ||
      err.message ||
      defaultMessage
    );
  }

  // Normal Error
  if (err instanceof Error) {
    return err.message || defaultMessage;
  }

  if (typeof err === "object" && err !== null && "message" in err) {
    const maybeMessage = (err as Record<string, unknown>)["message"];
    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
  }

  // String thrown
  if (typeof err === "string") {
    return err;
  }

  // Anything else
  return defaultMessage;
}
