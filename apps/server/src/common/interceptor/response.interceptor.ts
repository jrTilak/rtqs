import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

/**
 * Defines a standard structure for all outgoing responses.
 * Helps ensure consistency across all API endpoints.
 */
type Response = {
  statusCode: number;
  message: string;
  data?: unknown;
  error?: unknown;
};

/**
 * Helper function to check if an object is empty
 * @param obj - Object to check
 * @returns true if object is empty, false otherwise
 */
function isEmptyObject(obj: unknown): boolean {
  return (
    typeof obj === "object" && obj !== null && !Array.isArray(obj) && Object.keys(obj).length === 0
  );
}

@Injectable()
/**
 * Custom interceptor to transform all API responses to a consistent format.
 * Implements NestJS's Interceptor interface.
 */
export class ResponseInterceptor implements NestInterceptor<unknown, unknown> {
  /**
   * Intercepts every outgoing response from a controller.
   * @param context - Execution context of the request
   * @param next - CallHandler that handles the next function in the request pipeline
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      /**
       * Handles successful responses.
       * Transforms the data into a standard Response object.
       */
      map((data: { data?: unknown; error?: unknown; message?: string } = {}) => {
        const responseObj = context.switchToHttp().getResponse();

        /** Check if response content type is not application/json */
        const contentType = responseObj.getHeader?.("content-type") as string;
        if (contentType && !contentType.includes("application/json")) {
          /** Return non-JSON responses as-is without transformation */
          return data;
        }

        /* Why: If no explicit status code is set, default to 200 (OK) */
        const statusCode = responseObj.statusCode ?? 200;

        /** Why: Build a standard response format */
        const response: Response = {
          message: (data?.message || responseObj.statusMessage) ?? "OK",
          statusCode,
          data: data?.data,
        };

        /** If data is not an object or is null/undefined, return as-is */
        if (typeof data !== "object" || data === null || data === undefined) {
          response.data = data;
          return response;
        }

        /** If it's an object, check for known keys and assign accordingly */
        if ("data" in data || "error" in data || "message" in data) {
          // check if it has paginated keys
          if ("meta" in data) {
            response.data = data;
          } else if ("data" in data) {
            response.data = data?.data;
          } else {
            response.data = data;
          }

          if ("message" in data && data.message) {
            response.message = data?.message;
          }
        } else {
          /** If object doesn't contain standard keys, assign it directly */
          response.data = data;
        }

        /** Convert empty objects to null */
        if (isEmptyObject(response.data)) {
          response.data = null;
        }

        return response;
      }),

      /**
       * Handles errors thrown during request handling.
       * Catches and transforms them into a standard error response format.
       */
      catchError((err) => {
        const responseObj = context.switchToHttp().getResponse();

        /** Ensure the response has a status code based on the error type */
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        responseObj.statusCode = statusCode;

        /** Extract message from error object or provide a generic fallback */
        const message: string =
          err?.message ?? err?.response?.message ?? "Whoops! Something went wrong.";

        const response: Response = {
          message,
          statusCode,
          error: err?.response?.error || null,
        };

        console.log("Error in response interceptor:", response);

        /** Return the error response as an observable using `of` */
        return of(response); // 'of' creates an observable of the error response
      })
    );
  }
}
