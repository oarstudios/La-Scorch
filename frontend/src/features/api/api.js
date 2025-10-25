// src/features/api/api.js
import axios from "axios";

export const BASE_URL = "http://localhost:4001/api/";

export const IMG_BASE_URL = "http://localhost:4001";
// Axios instance with credentials
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});
