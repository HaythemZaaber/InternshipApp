import { useSelector } from "react-redux";
// import { getToken } from "./auth";
import axios from "axios";

// Function to get the authentication token from wherever it is stored

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API's base URL
  timeout: 5000, // Set a timeout for requests (optional)
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // var accessToken = getToken();
    const token = useSelector((state) => state.auth.token);
    console.log("token: ", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
