import axios from "axios";

const api = axios.create({
  // This automatically switches between live and local URLs
  baseURL: import.meta.env.PROD 
    ? "https://hrms-portal-audixindia.onrender.com/api" 
    : "http://localhost:5000/api",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;