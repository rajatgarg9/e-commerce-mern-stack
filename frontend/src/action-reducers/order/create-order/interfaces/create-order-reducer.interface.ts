import { IApiError } from "@interfaces/api-error.interface";
import { ICreateOrderApiResponse } from "./create-order-api-response.interface";

export interface ICreateOrderReducerState extends ICreateOrderApiResponse {
  isLoading: boolean;
  errors: IApiError;
  isInitialLoadFetchedSuccessfully: boolean;
}
