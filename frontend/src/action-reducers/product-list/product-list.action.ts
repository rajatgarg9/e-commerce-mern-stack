import axios, { Canceler } from "axios";

import { getApiErrorMessage } from "@utilities/methods/miscellaneous";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";
import {
  IProductListFetchStart,
  IProductListFetchSuccess,
  IProductListFetchFail,
  IProductListLoadMoreStart,
  IProductListLoadMoreSuccess,
  IProductListLoadMoreFail,
  IProductListReset,
} from "@action-reducers/product-list/interfaces/product-list-action.interface";

import { IProductListAPIResponse } from "@action-reducers/product-list/interfaces/product-list-api-response.interface";

import { apiHandler } from "@src/utilities/api-handler";

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

let fetchProductListApiCanceller: Canceler;

export const fetchProductList =
  (): IThunkFunction => async (dispatch, getState, api) => {
    try {
      if (fetchProductListApiCanceller) {
        fetchProductListApiCanceller("Operation canceled by the user.");
      }

      dispatch(productListFetchStart());

      const res = await api.get<IProductListAPIResponse>("/products", {
        cancelToken: new axios.CancelToken(function executor(apiCanceller) {
          // An executor function receives a cancel function as a parameter
          fetchProductListApiCanceller = apiCanceller;
        }),
      });

      dispatch(productListFetchSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(
          productListFetchFail(getApiErrorMessage(error as ITryCatchError)),
        );
      }
    }
  };

let loadMoreProductListApiCanceller: Canceler;

export const loadMoreProductList =
  (): IThunkFunction => async (dispatch, getState, api) => {
    try {
      if (loadMoreProductListApiCanceller) {
        loadMoreProductListApiCanceller("Operation canceled by the user.");
      }

      dispatch(productListLoadMoreStart());

      const { products, pagination: { currentPage = 0 } = {} } =
        getState().productList;

      const res = await api.get<IProductListAPIResponse>("/products", {
        cancelToken: new axios.CancelToken(function executor(apiCanceller) {
          // An executor function receives a cancel function as a parameter
          loadMoreProductListApiCanceller = apiCanceller;
        }),
        params: {
          page: currentPage + 1,
        },
      });
      const newData: IProductListAPIResponse = {
        ...res.data,
        products: [...products, ...res.data.products],
      };

      dispatch(productListLoadMoreSuccess(newData));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(
          productListLoadMoreFail(getApiErrorMessage(error as ITryCatchError)),
        );
      }
    }
  };
