import axios from "axios";
import { clearAuthCookies, getCookie } from "./cookie";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // set other default headers here if needed
  },
});

export const setHttpToken = (token: string | null = null) => {
  const authToken = token || getCookie("token");
  http.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
};

setHttpToken();

export const httpNoAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // set other default headers here if needed
  },
});

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (window.location.pathname != "/login") {
      if (error?.response?.status == 401) {
        clearAuthCookies();
        window.location.href = "/login";
      }
    }
  }
);
