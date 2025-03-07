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
      console.log("jwt: ", jwt);
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
