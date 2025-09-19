import { toast } from "react-toastify";

export const handleApiError = (error) => {
  let message = "Something went wrong. Please try again later.";

  if (error.response) {
    message = error.response.data?.message || "Server error!";
  } else if (error.request) {
    message = "Network error. Please check your connection.";
  } else {
    message = error.message;
  }
  toast.error(message);
  console.error("API Error:", error);
};
