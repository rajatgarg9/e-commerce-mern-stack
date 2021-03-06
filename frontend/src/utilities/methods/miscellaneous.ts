import axios, { AxiosInstance } from "axios";

import { IApiError } from "@interfaces/api-error.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";

import { ApiErrorCodes } from "@enums/api-handler.enum";

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
  if (error?.response?.data?.messages) {
    return error.response.data.messages;
  }

  return "Something went wrong.";
}

export function getApiErrorStatus(error: ITryCatchError): ApiErrorCodes {
  return error?.response?.status;
}

export function getDaysFromSeconds(milliseconds: number): number {
  return milliseconds / (60 * 60 * 24);
}
