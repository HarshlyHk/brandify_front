"use client";

import axios from "axios";
import API_URL from "./API_URL";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") { // Ensure this runs only in the browser
    const token = localStorage.getItem("drip_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;