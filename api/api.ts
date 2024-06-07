import { BASE_URL } from "@/constants/constants";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
