import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const refreshToken = Cookies.get("refresh_token");

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const res = await axios.post<{ access: string }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/refresh-token/`,
        { refresh: refreshToken },
      );

      Cookies.set("access_token", res.data.access);
      originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

      return api(originalRequest);
    } catch (refreshError) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      return Promise.reject(refreshError);
    }
  },
);
