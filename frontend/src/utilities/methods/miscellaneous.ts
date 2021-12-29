import axios, { AxiosInstance } from "axios";

import { IApiError } from "@interfaces/api-error.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";

export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function axiosInstance(baseURL: string): AxiosInstance {
  return axios.create({
    baseURL,
    timeout: 1000,
  });
}

export function getApiErrorMessage(error: ITryCatchError): IApiError {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  return ["Something went wrong."];
}
