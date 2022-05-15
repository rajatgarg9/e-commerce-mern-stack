import { IApiError } from "@interfaces/api-error.interface";
import { IGetOrdersApiResponse } from "./get-orders-api-response.interface";

export interface IGetOrdersReducerState {
  isLoading: boolean;
  errors: IApiError;
  isInitialLoadFetchedSuccessfully: boolean;
  list: IGetOrdersApiResponse;
}
