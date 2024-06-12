import { AxiosError } from "axios";

export default function handleAxiosError(error: any): never {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    throw new Error(
      `Request failed with status code ${axiosError.response.status}`
    );
  } else if (axiosError.request) {
    throw new Error("No response received from server");
  } else {
    throw new Error(`Request failed with message: ${axiosError.message}`);
  }
}
