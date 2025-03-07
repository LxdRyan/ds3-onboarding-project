import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If using cookies for authentication
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
