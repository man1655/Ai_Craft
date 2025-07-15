// src/utils/axiosInstance.js
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // send cookies on cross-origin requests
});

export default axiosInstance;
