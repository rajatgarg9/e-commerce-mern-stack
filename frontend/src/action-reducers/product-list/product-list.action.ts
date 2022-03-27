import axios, { Canceler } from "axios";

import { getApiErrorMessage } from "@utilities/methods/miscellaneous";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";
import {
  IProductListFetchStart,
  IProductListFetchSuccess,
  IProductListFetchFail,
  IProductListReset,
} from "@action-reducers/product-list/interfaces/product-list-action.interface";

import { IProductListAPIResponse } from "@action-reducers/product-list/interfaces/product-list-api-response.interface";

import { ProductListActions } from "./enums/product-list-actions.enum";

const {
  PRODUCT_LIST_FETCH_START,
  PRODUCT_LIST_FETCH_SUCCESS,
  PRODUCT_LIST_FETCH_FAIL,
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

export function productListReset(): IProductListReset {
  return {
    type: PRODUCT_LIST_RESET,
  };
}

let fetchProductListCanceller: Canceler;

export const fetchProductList =
  (): IThunkFunction => async (dispatch, getState, api) => {
    try {
      if (fetchProductListCanceller) {
        fetchProductListCanceller("Operation canceled by the user.");
      }

      dispatch(productListFetchStart());

      const res = await api.get<IProductListAPIResponse>("/products", {
        cancelToken: new axios.CancelToken(function executor(apiCanceller) {
          // An executor function receives a cancel function as a parameter
          fetchProductListCanceller = apiCanceller;
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
