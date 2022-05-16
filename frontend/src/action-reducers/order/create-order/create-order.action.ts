import { apiHandler } from "@src/utilities/api-handler";

import {
  IThunkFunction,
  IThunkCallbackParameter,
} from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { ApiMethodTypes } from "@enums/api-handler.enum";
import { ICreateOrderFormParam } from "./interfaces/create-order-thunk.interface";
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

export const createOrder =
  (
    formDetails: ICreateOrderFormParam,
    { onSuccessCallback, onFailCallback }: IThunkCallbackParameter,
  ): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<
      ICreateOrderApiResponse,
      ICreateOrderFormParam
    > = {
      method: ApiMethodTypes.POST,
      endpoint: "/users/@me/order",
      onStartCb: () => dispatch(createOrderFetchStart()),
      data: formDetails,
      onSuccessCb: (data) => {
        dispatch(createOrderFetchSuccess(data));

        if (onSuccessCallback) {
          onSuccessCallback();
        }
      },
      onFailCb: (data) => {
        dispatch(createOrderFetchFail(data));
        if (onFailCallback) {
          onFailCallback();
        }
      },
    };
    await apiHandler<ICreateOrderApiResponse, ICreateOrderFormParam>(
      config,
      dispatch,
      getState,
    );
  };
