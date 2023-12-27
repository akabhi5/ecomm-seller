import axios from "axios";
import { getCookie } from "./cookie";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // set other default headers here if needed
  },
});

const token = getCookie("token");
http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
