import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { ApiMethodTypes } from "@enums/api-handler.enum";
import {
  IGetOrdersFetchStart,
  IGetOrdersFetchSuccess,
  IGetOrdersFetchFail,
  IGetOrdersResetData,
} from "./interfaces/get-orders-action.interface";
import { IGetOrdersApiResponse } from "./interfaces/get-orders-api-response.interface";

import { GetOrdersActions } from "./enums/get-orders-actions.enum";

const {
  GET_ORDERS_FETCH_START,
  GET_ORDERS_FETCH_SUCCESS,
  GET_ORDERS_FETCH_FAIL,
  GET_ORDERS_RESET_DATA,
} = GetOrdersActions;

export function getOrdersFetchStart(): IGetOrdersFetchStart {
  return {
    type: GET_ORDERS_FETCH_START,
  };
}

export function getOrdersFetchSuccess(
  payload: IGetOrdersFetchSuccess["payload"],
): IGetOrdersFetchSuccess {
  return {
    type: GET_ORDERS_FETCH_SUCCESS,
    payload,
  };
}

export function getOrdersFetchFail(
  payload: IGetOrdersFetchFail["payload"],
): IGetOrdersFetchFail {
  return {
    type: GET_ORDERS_FETCH_FAIL,
    payload,
  };
}

export function getOrdersResetData(): IGetOrdersResetData {
  return {
    type: GET_ORDERS_RESET_DATA,
  };
}

export const fetchOrderList =
  (): IThunkFunction => async (dispatch, getState) => {
    const config: IApiHandlerConfig<IGetOrdersApiResponse> = {
      method: ApiMethodTypes.GET,
      endpoint: "/users/@me/orders",
      onStartCb: () => dispatch(getOrdersFetchStart()),
      onSuccessCb: (data) => dispatch(getOrdersFetchSuccess(data)),
      onFailCb: (data) => dispatch(getOrdersFetchFail(data)),
    };
    await apiHandler<IGetOrdersApiResponse>(config, dispatch, getState);
  };
