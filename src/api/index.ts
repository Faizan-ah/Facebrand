import { TOKEN_KEY, USER_KEY } from "@/lib/constants";
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "@/lib/utils";
import { routeNames } from "@/routes/routeNames";
import axios, { isAxiosError } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL
});

const authApi = axios.create({
  baseURL
});

// Request interceptor to add headers
authApi.interceptors.request.use(
  (config) => {
    const token = getDataFromLocalStorage("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and errors
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error) && (error.response?.status === 403 || error.response?.status === 401)) {
      removeDataFromLocalStorage(TOKEN_KEY);
      removeDataFromLocalStorage(USER_KEY);

      window.location.href = routeNames.public.login;
    }

    return Promise.reject(error);
  }
);

export { api, authApi, isAxiosError };
