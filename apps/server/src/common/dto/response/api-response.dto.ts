/**
 * Represents an API response.
 * It is automatically formatted by the responses interceptor, so no need to do anything
 */
class ApiResponse<T = undefined> {
  data: unknown;
  constructor(data?: T) {
    this.data = data;
  }
}

export { ApiResponse };
