// toastNotifications.js

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 
 * @param {string} message - Съобщение, което ще се покаже
 */
export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right", 
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true, 
    pauseOnHover: true,
    draggable: true, 
    progress: undefined,
    style: { backgroundColor: "#d4edda", color: "#155724" },
  });
};

/**
 * 
 * @param {string} message - 
 */
export const toastError = (message) => {
  toast.error(message, {
    position: "top-right", 
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: "rgba(0, 0, 0, 0.7)", color: "#721c24" }, 
  });
};

/**
 * 
 * @param {string} message - 
 */
export const toastInfo = (message) => {
  toast.info(message, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    style: { backgroundColor: "#d1ecf1", color: "#0c5460" },
  });
};
