import axios, { AxiosResponse, AxiosError } from "axios";
import handleAxiosError from "./axiosError";
import { BASE_URL } from "@/constants/constants";

axios.defaults.headers.common["Content-Type"] = "application/json";

interface FetchDataOptions<T> {
  param: string;
  method?: "get" | "post" | "put";
  requestData?: any;
  token?: string;
}

export default async function fetchData<T>({
  param,
  method = "get",
  requestData = {},
  token,
}: FetchDataOptions<T>): Promise<T> {
  const url = `${BASE_URL}${param}`;

  try {
    let response: AxiosResponse<T>;

    if (token) {
      if (method === "get") {
        response = await axios.get<T>(url, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await axios[method]<T>(url, requestData, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      response = await axios[method]<T>(url, requestData);
    }
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(handleAxiosError(axiosError));
  }
}
