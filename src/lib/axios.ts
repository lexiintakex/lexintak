import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const backendMessage = response.data?.message || response.data?.msg || null;

    if (response.status === 200 && backendMessage) {
      toast.success(backendMessage);
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error;

    const showError = (defaultMsg: string) => {
      toast.error(backendMessage || defaultMsg);
    };

    switch (status) {
      case 400:
        showError("Bad request. Please check your input.");
        break;
      case 401:
        // Handle unauthorized - token expired or invalid
        showError("Session expired. Please login again.");

        // Clear invalid token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");

          // Dispatch storage event to notify other tabs
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "token",
              oldValue: localStorage.getItem("token"),
              newValue: null,
            })
          );
        }
        break;
      case 403:
        showError("Forbidden. Access denied.");
        break;
      case 404:
        showError("Not found. Please check the endpoint.");
        break;
      case 409:
        toast.info(backendMessage || "Conflict: Application already exists.");
        break;
      case 500:
        showError("Server error. Please try again later.");
        break;
      default:
        showError("Something went wrong.");
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
