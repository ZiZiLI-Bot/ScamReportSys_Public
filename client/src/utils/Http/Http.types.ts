import qs from "qs";

export type TParamAPI = {
  page?: string;
  limit?: string;
  sort?: string;
  sortBy?: string;
  [key: string]: any;
};

export type TPagination = {
  limit?: number;
  page?: number;
  sort?: string;
  sortBy?: string;
  total?: number;
};

export type TRes<T> = {
  data?: T;
  success?: boolean;
  statusCode?: number;
  message?: [string];
  error?: string;
  pagination?: TPagination;
};

export const buildUrl = (url: string, param?: TParamAPI) =>
  param ? `${process.env.NEXT_PUBLIC_BASE_URL + url}?${qs.stringify(param)}` : process.env.NEXT_PUBLIC_BASE_URL + url;
