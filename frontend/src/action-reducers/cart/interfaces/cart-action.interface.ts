import { IApiError } from "@interfaces/api-error.interface";
import { CartActions } from "@action-reducers/cart/enums/cart-actions.enum";
import { ICartApiResponse } from "./cart-api-response.interface";

export interface ICartFetchStart {
  type: CartActions.CART_FETCH_START;
}

export interface ICartFetchSuccess {
  type: CartActions.CART_FETCH_SUCCESS;
  payload: ICartApiResponse;
}

export interface ICartFetchFail {
  type: CartActions.CART_FETCH_FAIL;
  payload: IApiError;
}

export interface ICartUpdateStart {
  type: CartActions.CART_FETCH_UPDATE_START;
}

export interface ICartUpdateSuccess {
  type: CartActions.CART_FETCH_UPDATE_SUCCESS;
  payload: ICartApiResponse;
}

export interface ICartUpdateFail {
  type: CartActions.CART_FETCH_UPDATE_FAIL;
  payload: IApiError;
}

export interface ICartResetData {
  type: CartActions.CART_RESET_DATA;
}

export interface ICartClearUpdateError {
  type: CartActions.CART_CLEAR_UPDATE_ERRORS;
}

export type ICartAllActions =
  | ICartFetchStart
  | ICartFetchSuccess
  | ICartFetchFail
  | ICartUpdateStart
  | ICartUpdateSuccess
  | ICartUpdateFail
  | ICartResetData
  | ICartClearUpdateError;
