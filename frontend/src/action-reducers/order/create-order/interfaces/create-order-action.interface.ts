import { IApiError } from "@interfaces/api-error.interface";
import { CreateOrderActions } from "@action-reducers/order/create-order/enums/create-order-actions.enum";
import { ICreateOrderApiResponse } from "./create-order-api-response.interface";

export interface ICreateOrderFetchStart {
  type: CreateOrderActions.CREATE_ORDER_FETCH_START;
}

export interface ICreateOrderFetchSuccess {
  type: CreateOrderActions.CREATE_ORDER_FETCH_SUCCESS;
  payload: ICreateOrderApiResponse;
}

export interface ICreateOrderFetchFail {
  type: CreateOrderActions.CREATE_ORDER_FETCH_FAIL;
  payload: IApiError;
}

export interface ICreateOrderResetData {
  type: CreateOrderActions.CREATE_ORDER_RESET_DATA;
}

export type ICreateOrderAllActions =
  | ICreateOrderFetchStart
  | ICreateOrderFetchSuccess
  | ICreateOrderFetchFail
  | ICreateOrderResetData;
