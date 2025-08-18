// src/utils/axiosInstance.js
import { VITE_APP_URL } from "@/config/config";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: VITE_APP_URL,
  withCredentials: true, // send cookies on cross-origin requests
});

export default axiosInstance;
