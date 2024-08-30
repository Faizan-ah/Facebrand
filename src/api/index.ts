import { getDataFromLocalStorage } from "@/lib/utils";
import axios, { isAxiosError } from "axios";

const isDevelopment = import.meta.env.MODE === "development";
let baseURL = "http://localhost:8080/api/v1";

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = "http://localhost:8080/api/v1";
}

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

// Response interceptor for handling data and errors
// api.interceptors.response.use(
//   (response) => {
//     if (response.data.error) {
//       return Promise.reject(new Error(response.data.error));
//     }
//     return response.data.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export { api, authApi, isAxiosError };
