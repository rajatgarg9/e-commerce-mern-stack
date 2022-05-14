import { IApiError } from "@interfaces/api-error.interface";
import { ICartApiResponse } from "./cart-api-response.interface";

export interface ICartReducerState extends ICartApiResponse {
  isLoading: boolean;
  errors: IApiError;
  isUpdateInProgress: boolean;
  updateErrors: IApiError;
}
