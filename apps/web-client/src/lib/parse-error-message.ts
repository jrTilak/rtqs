import axios from "axios";

export function parseErrorMessage(
  err: unknown,
  defaultMessage = "Unknown error occurred"
): string {
  // Axios error
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.message ||
      err.message ||
      defaultMessage
    );
  }

  // Normal Error
  if (err instanceof Error) {
    return err.message || defaultMessage;
  }

  // String thrown
  if (typeof err === "string") {
    return err;
  }

  // Anything else
  return defaultMessage;
}

