/**
 * Represents an API response.
 * It is automatically formatted by the responses interceptor, so no need to do anything
 */
class ApiResponse {
  data: unknown;
  constructor(data: unknown) {
    this.data = data;
  }
}

export { ApiResponse };
