import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { ApiMethodTypes } from "@enums/api-handler.enum";
import {
  ICreateOrderFetchStart,
  ICreateOrderFetchSuccess,
  ICreateOrderFetchFail,
  ICreateOrderResetData,
} from "./interfaces/create-order-action.interface";
import { ICreateOrderApiResponse } from "./interfaces/create-order-api-response.interface";

import { CreateOrderActions } from "./enums/create-order-actions.enum";

const {
  CREATE_ORDER_FETCH_START,
  CREATE_ORDER_FETCH_SUCCESS,
  CREATE_ORDER_FETCH_FAIL,
  CREATE_ORDER_RESET_DATA,
} = CreateOrderActions;

export function createOrderFetchStart(): ICreateOrderFetchStart {
  return {
    type: CREATE_ORDER_FETCH_START,
  };
}

export function createOrderFetchSuccess(
  payload: ICreateOrderFetchSuccess["payload"],
): ICreateOrderFetchSuccess {
  return {
    type: CREATE_ORDER_FETCH_SUCCESS,
    payload,
  };
}

export function createOrderFetchFail(
  payload: ICreateOrderFetchFail["payload"],
): ICreateOrderFetchFail {
  return {
    type: CREATE_ORDER_FETCH_FAIL,
    payload,
  };
}

export function createOrderResetData(): ICreateOrderResetData {
  return {
    type: CREATE_ORDER_RESET_DATA,
  };
}

export const createOrder = (): IThunkFunction => async (dispatch, getState) => {
  const config: IApiHandlerConfig<ICreateOrderApiResponse> = {
    method: ApiMethodTypes.POST,
    endpoint: "/users/@me/order",
    onStartCb: () => dispatch(createOrderFetchStart()),
    onSuccessCb: (data) => dispatch(createOrderFetchSuccess(data)),
    onFailCb: (data) => dispatch(createOrderFetchFail(data)),
  };
  await apiHandler<ICreateOrderApiResponse>(config, dispatch, getState);
};
