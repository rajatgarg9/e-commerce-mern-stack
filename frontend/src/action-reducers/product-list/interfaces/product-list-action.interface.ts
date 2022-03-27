import { IApiError } from "@interfaces/api-error.interface";
import { ProductListActions } from "@action-reducers/product-list/enums/product-list-actions.enum";
import { IProductListAPIResponse } from "@action-reducers/product-list/interfaces/product-list-api-response.interface";

export interface IProductListFetchStart {
  type: ProductListActions.PRODUCT_LIST_FETCH_START;
}

export interface IProductListFetchSuccess {
  type: ProductListActions.PRODUCT_LIST_FETCH_SUCCESS;
  payload: IProductListAPIResponse;
}

export interface IProductListFetchFail {
  type: ProductListActions.PRODUCT_LIST_FETCH_FAIL;
  payload: IApiError;
}

export interface IProductListReset {
  type: ProductListActions.PRODUCT_LIST_RESET;
}

export type IProductListAllActions =
  | IProductListFetchStart
  | IProductListFetchSuccess
  | IProductListFetchFail
  | IProductListReset;
