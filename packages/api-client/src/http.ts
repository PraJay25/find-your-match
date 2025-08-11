import axios from "axios";

export const http = axios.create({
  baseURL:
    (typeof process !== "undefined" && process.env.EXPO_PUBLIC_API_URL) ||
    (typeof process !== "undefined" && process.env.API_URL) ||
    "http://localhost:3000",
  timeout: 15000
});

http.interceptors.request.use((config) => {
  const token = (globalThis as any)?.__authToken__ as string | undefined;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data ?? err)
);

