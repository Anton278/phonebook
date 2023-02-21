import axios from "axios";

export const BASE_URL = "https://ec00-178-212-242-26.eu.ngrok.io";

const api = axios.create({
  // withCredentials: true, ?
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default api;
