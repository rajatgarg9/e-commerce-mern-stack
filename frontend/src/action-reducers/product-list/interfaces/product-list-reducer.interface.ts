import { IApiError } from "@interfaces/api-error.interface";
import { IProductListAPIResponse } from "@action-reducers/product-list/interfaces/product-list-api-response.interface";

export interface IProductListReducerState extends IProductListAPIResponse {
  isLoading: boolean;
  errors: IApiError;
  isInitialLoadFetchedSuccessfully: boolean;
  isLoadingMoreInProgress: boolean;
  loadMoreError: IApiError;
}
