import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constant";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
