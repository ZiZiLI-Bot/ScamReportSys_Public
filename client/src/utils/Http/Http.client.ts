import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

class CreateAxios {
  instance: AxiosInstance;
  constructor() {
    const initialAxios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers: {
        "Content-type": "application/json",
      },
    });
    initialAxios.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${getCookie("token")}`;
      return config;
    });
    initialAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance = initialAxios;
  }
}

export const CL_Http = new CreateAxios().instance;
