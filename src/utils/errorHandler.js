import { toast } from "react-toastify";

export const handleError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    const errorMessage = getErrorMessage(error.response.data.message);
    toast.error(errorMessage);
  } else {
    toast.error("An unexpected error occurred.");
  }
};

const getErrorMessage = (errorCode) => {
  const errorMessages = {
    MISSING_FIELDS_ADD_NAME_CITY_AVATAR:
      "Please provide name, city, and avatar.",
    AVATAR_ERR_REQUIRED: "Avatar is required.",
    UPLOAD_ERROR: "There was an error uploading the file.",
    INVALID_FILE_FORMAT: "Invalid file format. Only JPG and PNG are allowed.",
    FILE_SIZE_EXCEEDED: "File size exceeded. Maximum size is 5MB.",
    NAME_ERR_STR: "Name must be a string.",
    NAME_ERR_MIN: "Name is too short. Minimum length is 1 character.",
    NAME_ERR_MAX: "Name is too long. Maximum length is 30 characters.",
    NAME_ERR_REQUIRED: "Name is required.",
    CITY_ERR_STR: "City must be a string.",
    CITY_ERR_MIN: "City is too short. Minimum length is 1 character.",
    CITY_ERR_MAX: "City is too long. Maximum length is 30 characters.",
    CITY_ERR_REQUIRED: "City is required.",
  };

  return errorMessages[errorCode] || "An unexpected error occurred.";
};
