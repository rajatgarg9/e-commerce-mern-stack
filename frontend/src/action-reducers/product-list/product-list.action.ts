import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import {
  IProductListFetchStart,
  IProductListFetchSuccess,
  IProductListFetchFail,
  IProductListLoadMoreStart,
  IProductListLoadMoreSuccess,
  IProductListLoadMoreFail,
  IProductListReset,
} from "@action-reducers/product-list/interfaces/product-list-action.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { IProductListAPIResponse } from "@action-reducers/product-list/interfaces/product-list-api-response.interface";

import { ApiMethodTypes } from "@enums/api-handler.enum";
import { ProductListActions } from "./enums/product-list-actions.enum";

const {
  PRODUCT_LIST_FETCH_START,
  PRODUCT_LIST_FETCH_SUCCESS,
  PRODUCT_LIST_FETCH_FAIL,
  PRODUCT_LIST_LOAD_MORE_START,
  PRODUCT_LIST_LOAD_MORE_SUCCESS,
  PRODUCT_LIST_LOAD_MORE_FAIL,
  PRODUCT_LIST_RESET,
} = ProductListActions;

export function productListFetchStart(): IProductListFetchStart {
  return {
    type: PRODUCT_LIST_FETCH_START,
  };
}

export function productListFetchSuccess(
  payload: IProductListFetchSuccess["payload"],
): IProductListFetchSuccess {
  return {
    type: PRODUCT_LIST_FETCH_SUCCESS,
    payload,
  };
}

export function productListFetchFail(
  payload: IProductListFetchFail["payload"],
): IProductListFetchFail {
  return {
    type: PRODUCT_LIST_FETCH_FAIL,
    payload,
  };
}

export function productListLoadMoreStart(): IProductListLoadMoreStart {
  return {
    type: PRODUCT_LIST_LOAD_MORE_START,
  };
}

export function productListLoadMoreSuccess(
  payload: IProductListLoadMoreSuccess["payload"],
): IProductListLoadMoreSuccess {
  return {
    type: PRODUCT_LIST_LOAD_MORE_SUCCESS,
    payload,
  };
}

export function productListLoadMoreFail(
  payload: IProductListLoadMoreFail["payload"],
): IProductListLoadMoreFail {
  return {
    type: PRODUCT_LIST_LOAD_MORE_FAIL,
    payload,
  };
}

export function productListReset(): IProductListReset {
  return {
    type: PRODUCT_LIST_RESET,
  };
}

export const fetchProductList =
  (): IThunkFunction => async (dispatch, getState) => {
    const config: IApiHandlerConfig<IProductListAPIResponse> = {
      method: ApiMethodTypes.GET,
      endpoint: "/products",
      onStartCb: () => dispatch(productListFetchStart()),
      onSuccessCb: (data) => dispatch(productListFetchSuccess(data)),
      onFailCb: (data) => dispatch(productListFetchFail(data)),
    };
    await apiHandler<IProductListAPIResponse>(config, dispatch, getState);
  };

export const loadMoreProductList =
  (): IThunkFunction => async (dispatch, getState) => {
    const { products, pagination: { currentPage = 0 } = {} } =
      getState().productList;

    function onSuccessCb(data: IProductListAPIResponse) {
      dispatch(
        productListLoadMoreSuccess({
          ...data,
          products: [...products, ...data.products],
        }),
      );
    }
    const config: IApiHandlerConfig<IProductListAPIResponse> = {
      method: ApiMethodTypes.GET,
      endpoint: "/products",
      onStartCb: () => dispatch(productListLoadMoreStart()),
      onSuccessCb,
      onFailCb: (data) => dispatch(productListLoadMoreFail(data)),
      params: {
        page: currentPage + 1,
      },
    };
    await apiHandler<IProductListAPIResponse>(config, dispatch, getState);
  };
