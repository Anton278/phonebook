import axios from "axios";

export const BASE_URL = "http://localhost:5000";

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export default api;
