import axios from "axios";

export const BASE_URL = "https://75df-178-212-242-26.eu.ngrok.io";

const api = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export default api;
