import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { TParamAPI, buildUrl } from "./Http.types";

export const SV_HttpGet = async <T>(url: string, params?: TParamAPI | undefined, cacheTags?: string[]): Promise<T> => {
  return fetch(buildUrl(url, params), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token", { cookies })}`,
    },
    cache: "force-cache",
    next: {
      tags: cacheTags,
    },
  }).then((res) => res.json());
};

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
      config.headers.Authorization = `Bearer ${getCookie("token", { cookies })}`;
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

export const SV_Http = new CreateAxios().instance;
