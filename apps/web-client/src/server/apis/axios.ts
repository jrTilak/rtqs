import axios, { type AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = axios.create({
  // baseURL: process.env.VITE_PUBLIC_SERVER_URL,
  baseURL: import.meta.env.VITE_PUBLIC_SERVER_URL,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
  console.log(
    `-> [${config.method}] ${config.url} - ${new Date().toISOString()}`
  );
  console.log("Request Data:", JSON.stringify(config.data, null, 2));
  return config;
});

AXIOS_INSTANCE.interceptors.response.use((response) => {
  console.log(
    `<- [${response.config.method}] ${
      response.config.url
    } - ${new Date().toISOString()} - Status: ${response.status}`
  );
  return response;
});

export const apiClient = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return AXIOS_INSTANCE.request({ ...config, ...options }).then(
    (res) => res.data
  );
};
