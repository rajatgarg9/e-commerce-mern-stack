import axios, { AxiosInstance } from "axios";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { getBaseApiUrl } from "@utilities/methods/getEnvironmentVariables";
import {
  getApiErrorMessage,
  getApiErrorStatus,
} from "@utilities/methods/miscellaneous";

// eslint-disable-next-line import/no-cycle
import {
  tokenRefresh,
  authLogoutSuccess,
} from "@action-reducers/auth/auth.action";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";

import { ApiMethodTypes, ApiErrorCodes } from "@enums/api-handler.enum";

const controller = <{ [key: string]: AbortController }>{};

export async function apiHandler<R = void, D = void>(
  config: IApiHandlerConfig<R, D>,
  dispatch: ThunkDispatch<IRootReducerState, AxiosInstance, AnyAction>,
  getState: () => IRootReducerState,
) {
  const {
    method,
    endpoint,
    baseURL,
    headers,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    params,
    data,
    onStartCb,
    onSuccessCb,
    onFailCb,
    isPublic,
    cancelEndpointKey,
  } = config || {};
  try {
    if (onStartCb) {
      onStartCb();
    }

    const controllerKey = `${cancelEndpointKey || endpoint}-${method}`;
    if (controller[controllerKey]) {
      controller[controllerKey].abort();
    }

    controller[controllerKey] = new AbortController();

    const { expiresAt, refreshToken } = getState().auth;

    const expiresAtInSec = new Date(expiresAt).getTime();

    if (!isPublic && refreshToken && expiresAtInSec <= Date.now()) {
      await dispatch(tokenRefresh());
    }

    const { accessToken, tokenType } = getState().auth;

    const customHeaders = <{ authorization: string }>{};
    if (!isPublic) {
      customHeaders.authorization = `${tokenType} ${accessToken}`;
    }

    const res = await axios({
      method: method || ApiMethodTypes.GET,
      url: endpoint,
      baseURL: baseURL || `${getBaseApiUrl()}/api/v1`,
      timeout: 2000,
      headers: {
        ...customHeaders,
        ...headers,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      params,
      data,
      signal: controller[controllerKey].signal,
    });

    delete controller[controllerKey];

    if (onSuccessCb) {
      onSuccessCb(res.data as R);
    }
  } catch (error: unknown) {
    if (!axios.isCancel(error)) {
      const status = getApiErrorStatus(error as ITryCatchError);

      if (status === ApiErrorCodes.UNAUTHORIZED) {
        dispatch(authLogoutSuccess());
      }
      if (onFailCb) {
        onFailCb(getApiErrorMessage(error as ITryCatchError));
      }
    }
  }
}
