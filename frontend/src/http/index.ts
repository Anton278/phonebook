import { AuthResponse } from "@/types/AuthResponse";
import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "Development"
    ? "http://localhost:5000"
    : "https://phonebook-86ho.onrender.com";

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          BASE_URL + "/auth/refresh",
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {}
    }
    return Promise.reject(error);
  }
);

export default api;
