import { IApiError } from "@interfaces/api-error.interface";
import { ISingleProductAPIResponse } from "@action-reducers/single-product/interfaces/single-product-api-response.interface";

export interface ISingleProductReducerState extends ISingleProductAPIResponse {
  isLoading: boolean;
  errors: IApiError;
  isInitialLoadFetchedSuccessfully: boolean;
}
