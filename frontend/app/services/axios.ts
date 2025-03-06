import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/", // Change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If using cookies for authentication
});

export default axiosInstance;
