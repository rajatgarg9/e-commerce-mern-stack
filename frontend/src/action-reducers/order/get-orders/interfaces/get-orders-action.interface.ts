import { IApiError } from "@interfaces/api-error.interface";
import { GetOrdersActions } from "@action-reducers/order/get-orders/enums/get-orders-actions.enum";
import { IGetOrdersApiResponse } from "./get-orders-api-response.interface";

export interface IGetOrdersFetchStart {
  type: GetOrdersActions.GET_ORDERS_FETCH_START;
}

export interface IGetOrdersFetchSuccess {
  type: GetOrdersActions.GET_ORDERS_FETCH_SUCCESS;
  payload: IGetOrdersApiResponse;
}

export interface IGetOrdersFetchFail {
  type: GetOrdersActions.GET_ORDERS_FETCH_FAIL;
  payload: IApiError;
}

export interface IGetOrdersResetData {
  type: GetOrdersActions.GET_ORDERS_RESET_DATA;
}

export type IGetOrdersAllActions =
  | IGetOrdersFetchStart
  | IGetOrdersFetchSuccess
  | IGetOrdersFetchFail
  | IGetOrdersResetData;
