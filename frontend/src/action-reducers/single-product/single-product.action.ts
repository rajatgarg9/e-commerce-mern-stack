import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";

import {
  ISingleProductFetchStart,
  ISingleProductFetchSuccess,
  ISingleProductFetchFail,
  ISingleProductUpdateStart,
  ISingleProductUpdateSuccess,
  ISingleProductUpdateFail,
  ISingleProductReset,
} from "@action-reducers/single-product/interfaces/single-product-action.interface";

import { ISingleProductAPIResponse } from "@action-reducers/single-product/interfaces/single-product-api-response.interface";

import { ApiMethodTypes } from "@enums/api-handler.enum";
import { SingleProductActions } from "./enums/single-product-actions.enum";
import { IPatchProductData } from "./interfaces/single-product-thunk.interface";

const {
  SINGLE_PRODUCT_FETCH_START,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  SINGLE_PRODUCT_UPDATE_START,
  SINGLE_PRODUCT_UPDATE_SUCCESS,
  SINGLE_PRODUCT_UPDATE_FAIL,
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

export function singleProductUpdateStart(): ISingleProductUpdateStart {
  return {
    type: SINGLE_PRODUCT_UPDATE_START,
  };
}

export function singleProductUpdateSuccess(
  payload: ISingleProductUpdateSuccess["payload"],
): ISingleProductUpdateSuccess {
  return {
    type: SINGLE_PRODUCT_UPDATE_SUCCESS,
    payload,
  };
}

export function singleProductUpdateFail(
  payload: ISingleProductUpdateFail["payload"],
): ISingleProductUpdateFail {
  return {
    type: SINGLE_PRODUCT_UPDATE_FAIL,
    payload,
  };
}

export function singleProductReset(): ISingleProductReset {
  return {
    type: SINGLE_PRODUCT_RESET,
  };
}

export const fetchSingleProduct =
  (productId: string): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<ISingleProductAPIResponse> = {
      method: ApiMethodTypes.GET,
      endpoint: `/products/${productId}`,
      cancelEndpointKey: "/products/id",
      onStartCb: () => dispatch(singleProductFetchStart()),
      onSuccessCb: (data) => dispatch(singleProductFetchSuccess(data)),
      onFailCb: (data) => dispatch(singleProductFetchFail(data)),
    };
    await apiHandler<ISingleProductAPIResponse>(config, dispatch, getState);
  };

export const patchSingleProduct =
  (productId: string, payloadData: IPatchProductData): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<
      ISingleProductAPIResponse,
      IPatchProductData
    > = {
      method: ApiMethodTypes.PATCH,
      endpoint: `/products/${productId}`,
      cancelEndpointKey: "/products/id",
      onStartCb: () => dispatch(singleProductUpdateStart()),
      onSuccessCb: (data) => dispatch(singleProductUpdateSuccess(data)),
      onFailCb: (data) => dispatch(singleProductUpdateFail(data)),
      data: payloadData,
    };
    await apiHandler<ISingleProductAPIResponse, IPatchProductData>(
      config,
      dispatch,
      getState,
    );
  };

export const createSingleProduct =
  (payloadData: ISingleProductAPIResponse): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<
      ISingleProductAPIResponse,
      ISingleProductAPIResponse
    > = {
      method: ApiMethodTypes.POST,
      endpoint: `products/product`,
      onStartCb: () => dispatch(singleProductUpdateStart()),
      onSuccessCb: (data) => dispatch(singleProductUpdateSuccess(data)),
      onFailCb: (data) => dispatch(singleProductUpdateFail(data)),
      data: payloadData,
    };
    await apiHandler<ISingleProductAPIResponse, ISingleProductAPIResponse>(
      config,
      dispatch,
      getState,
    );
  };
