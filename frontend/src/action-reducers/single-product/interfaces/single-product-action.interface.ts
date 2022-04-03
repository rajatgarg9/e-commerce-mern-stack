import { IApiError } from "@interfaces/api-error.interface";
import { SingleProductActions } from "@action-reducers/single-product/enums/single-product-actions.enum";
import { ISingleProductAPIResponse } from "@action-reducers/single-product/interfaces/single-product-api-response.interface";

export interface ISingleProductFetchStart {
  type: SingleProductActions.SINGLE_PRODUCT_FETCH_START;
}

export interface ISingleProductFetchSuccess {
  type: SingleProductActions.SINGLE_PRODUCT_FETCH_SUCCESS;
  payload: ISingleProductAPIResponse;
}

export interface ISingleProductFetchFail {
  type: SingleProductActions.SINGLE_PRODUCT_FETCH_FAIL;
  payload: IApiError;
}

export interface ISingleProductReset {
  type: SingleProductActions.SINGLE_PRODUCT_RESET;
}

export type ISingleProductAllActions =
  | ISingleProductFetchStart
  | ISingleProductFetchSuccess
  | ISingleProductFetchFail
  | ISingleProductReset;
