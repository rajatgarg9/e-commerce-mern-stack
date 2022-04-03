import axios, { Canceler } from "axios";

import { getApiErrorMessage } from "@utilities/methods/miscellaneous";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";
import {
  ISingleProductFetchStart,
  ISingleProductFetchSuccess,
  ISingleProductFetchFail,
  ISingleProductReset,
} from "@action-reducers/single-product/interfaces/single-product-action.interface";

import { ISingleProductAPIResponse } from "@action-reducers/single-product/interfaces/single-product-api-response.interface";

import { SingleProductActions } from "./enums/single-product-actions.enum";

const {
  SINGLE_PRODUCT_FETCH_START,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  SINGLE_PRODUCT_RESET,
} = SingleProductActions;

export function singleProductFetchStart(): ISingleProductFetchStart {
  return {
    type: SINGLE_PRODUCT_FETCH_START,
  };
}

export function singleProductFetchSuccess(
  payload: ISingleProductFetchSuccess["payload"],
): ISingleProductFetchSuccess {
  return {
    type: SINGLE_PRODUCT_FETCH_SUCCESS,
    payload,
  };
}

export function singleProductFetchFail(
  payload: ISingleProductFetchFail["payload"],
): ISingleProductFetchFail {
  return {
    type: SINGLE_PRODUCT_FETCH_FAIL,
    payload,
  };
}

export function singleProductReset(): ISingleProductReset {
  return {
    type: SINGLE_PRODUCT_RESET,
  };
}

let fetchSingleProductApiCanceller: Canceler;

export const fetchSingleProduct =
  (productId: string): IThunkFunction =>
  async (dispatch, getState, api) => {
    try {
      if (fetchSingleProductApiCanceller) {
        fetchSingleProductApiCanceller("Operation canceled by the user.");
      }

      dispatch(singleProductFetchStart());

      const res = await api.get<ISingleProductAPIResponse>(
        `/products/${productId}`,
        {
          cancelToken: new axios.CancelToken(function executor(apiCanceller) {
            // An executor function receives a cancel function as a parameter
            fetchSingleProductApiCanceller = apiCanceller;
          }),
        },
      );

      dispatch(singleProductFetchSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(
          singleProductFetchFail(getApiErrorMessage(error as ITryCatchError)),
        );
      }
    }
  };
