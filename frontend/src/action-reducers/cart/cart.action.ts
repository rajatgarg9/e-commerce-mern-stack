import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { ApiMethodTypes } from "@enums/api-handler.enum";

import {
  ICartFetchStart,
  ICartFetchSuccess,
  ICartFetchFail,
  ICartUpdateStart,
  ICartUpdateSuccess,
  ICartUpdateFail,
  ICartClearUpdateError,
  ICartResetData,
} from "./interfaces/cart-action.interface";
import { IAddProductToCartData } from "./interfaces/cart-thunk.interface";

import { ICartApiResponse } from "./interfaces/cart-api-response.interface";

import { CartActions } from "./enums/cart-actions.enum";

const {
  CART_FETCH_START,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAIL,
  CART_FETCH_UPDATE_START,
  CART_FETCH_UPDATE_SUCCESS,
  CART_FETCH_UPDATE_FAIL,
  CART_CLEAR_UPDATE_ERRORS,
  CART_RESET_DATA,
} = CartActions;

export function cartFetchStart(): ICartFetchStart {
  return {
    type: CART_FETCH_START,
  };
}

export function cartFetchSuccess(
  payload: ICartFetchSuccess["payload"],
): ICartFetchSuccess {
  return {
    type: CART_FETCH_SUCCESS,
    payload,
  };
}

export function cartFetchFail(
  payload: ICartFetchFail["payload"],
): ICartFetchFail {
  return {
    type: CART_FETCH_FAIL,
    payload,
  };
}

export function cartUpdateStart(): ICartUpdateStart {
  return {
    type: CART_FETCH_UPDATE_START,
  };
}

export function cartUpdateSuccess(
  payload: ICartUpdateSuccess["payload"],
): ICartUpdateSuccess {
  return {
    type: CART_FETCH_UPDATE_SUCCESS,
    payload,
  };
}

export function cartUpdateFail(
  payload: ICartUpdateFail["payload"],
): ICartUpdateFail {
  return {
    type: CART_FETCH_UPDATE_FAIL,
    payload,
  };
}

export function cartClearUpdateError(): ICartClearUpdateError {
  return {
    type: CART_CLEAR_UPDATE_ERRORS,
  };
}

export function cartResetData(): ICartResetData {
  return {
    type: CART_RESET_DATA,
  };
}

export const fetchCart = (): IThunkFunction => async (dispatch, getState) => {
  const config: IApiHandlerConfig<ICartApiResponse> = {
    method: ApiMethodTypes.GET,
    endpoint: "/users/@me/cart",
    onStartCb: () => dispatch(cartFetchStart()),
    onSuccessCb: (data) => dispatch(cartFetchSuccess(data)),
    onFailCb: (data) => dispatch(cartFetchFail(data)),
  };
  await apiHandler<ICartApiResponse>(config, dispatch, getState);
};

export const addProductToCart =
  (productId: string, payload: IAddProductToCartData): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<ICartApiResponse, IAddProductToCartData> = {
      method: ApiMethodTypes.POST,
      endpoint: `/users/@me/cart/${productId}`,
      onStartCb: () => dispatch(cartUpdateStart()),
      onSuccessCb: (data) => dispatch(cartUpdateSuccess(data)),
      onFailCb: (data) => dispatch(cartUpdateFail(data)),
      data: payload,
    };
    await apiHandler<ICartApiResponse, IAddProductToCartData>(
      config,
      dispatch,
      getState,
    );
  };

export const emptyCart = (): IThunkFunction => async (dispatch, getState) => {
  const config: IApiHandlerConfig<ICartApiResponse> = {
    method: ApiMethodTypes.PUT,
    endpoint: `/users/@me/cart/empty`,
    onStartCb: () => dispatch(cartUpdateStart()),
    onSuccessCb: (data) => dispatch(cartUpdateSuccess(data)),
    onFailCb: (data) => dispatch(cartUpdateFail(data)),
  };
  await apiHandler<ICartApiResponse>(config, dispatch, getState);
};
