import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const baseURL =
  (import.meta.env.VITE_PUBLIC_SERVER_URL as string).replace(/\/$/, "") +
  "/api";

export const AXIOS_INSTANCE = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});

/**
 * Orval mutator: run a request with the shared axios instance and return response data.
 */
export async function apiClient<T = unknown>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  const response: AxiosResponse<T> = await AXIOS_INSTANCE.request<T>({
    ...config,
    ...options,
  });
  return response.data;
}
