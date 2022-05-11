// eslint-disable-next-line import/no-cycle
import { apiHandler } from "@src/utilities/api-handler";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { IApiHandlerConfig } from "@interfaces/api-handler.interface";

import { ApiMethodTypes } from "@enums/api-handler.enum";
import { AuthActions } from "./enums/auth-actions.enum";

import {
  ISignupApiBody,
  ISignupApiResponse,
} from "./interfaces/signup-api.interface";

import {
  ILoginApiResponse,
  ILoginApiBody,
} from "./interfaces/login-api.interface";

import { ITokenRefreshApiResponse } from "./interfaces/token-refresh-api.interface";

import {
  IAuthSignupStartActionResponse,
  IAuthSignupSuccessActionResponse,
  IAuthSignupFailActionResponse,
  IAuthLoginStartActionResponse,
  IAuthLoginSuccessActionResponse,
  IAuthLoginFailActionResponse,
  IAuthLogoutStartActionResponse,
  IAuthLogoutSuccessActionResponse,
  IAuthLogoutFailActionResponse,
  IAuthTokenRefreshStartActionResponse,
  IAuthTokenRefreshSuccessActionResponse,
  IAuthTokenRefreshFailActionResponse,
  IAuthLoadCookieDetailsActionResponse,
} from "./interfaces/auth-action.interface";

const {
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_TOKEN_REFRESH_START,
  AUTH_TOKEN_REFRESH_SUCCESS,
  AUTH_TOKEN_REFRESH_FAIL,
  AUTH_LOAD_COOKIE_DETAIL,
} = AuthActions;

export function authSignupStart(): IAuthSignupStartActionResponse {
  return {
    type: AUTH_SIGNUP_START,
  };
}

export function authSignupSuccess(
  payload: IAuthSignupSuccessActionResponse["payload"],
): IAuthSignupSuccessActionResponse {
  return {
    type: AUTH_SIGNUP_SUCCESS,
    payload,
  };
}

export function authSignupFail(
  payload: IAuthSignupFailActionResponse["payload"],
): IAuthSignupFailActionResponse {
  return {
    type: AUTH_SIGNUP_FAIL,
    payload,
  };
}

export function authLoginStart(): IAuthLoginStartActionResponse {
  return {
    type: AUTH_LOGIN_START,
  };
}

export function authLoginSuccess(
  payload: IAuthLoginSuccessActionResponse["payload"],
): IAuthLoginSuccessActionResponse {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload,
  };
}

export function authLoginFail(
  payload: IAuthLoginFailActionResponse["payload"],
): IAuthLoginFailActionResponse {
  return {
    type: AUTH_LOGIN_FAIL,
    payload,
  };
}

export function authLogoutStart(): IAuthLogoutStartActionResponse {
  return {
    type: AUTH_LOGOUT_START,
  };
}

export function authLogoutSuccess(): IAuthLogoutSuccessActionResponse {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}

export function authLogoutFail(
  payload: IAuthLogoutFailActionResponse["payload"],
): IAuthLogoutFailActionResponse {
  return {
    type: AUTH_LOGOUT_FAIL,
    payload,
  };
}

export function authTokenRefreshStart(): IAuthTokenRefreshStartActionResponse {
  return {
    type: AUTH_TOKEN_REFRESH_START,
  };
}

export function authTokenRefreshSuccess(
  payload: IAuthTokenRefreshSuccessActionResponse["payload"],
): IAuthTokenRefreshSuccessActionResponse {
  return {
    type: AUTH_TOKEN_REFRESH_SUCCESS,
    payload,
  };
}

export function authTokenRefreshFail(): IAuthTokenRefreshFailActionResponse {
  return {
    type: AUTH_TOKEN_REFRESH_FAIL,
  };
}

export function authLoadCookieDetails(
  payload: IAuthLoadCookieDetailsActionResponse["payload"],
): IAuthLoadCookieDetailsActionResponse {
  return {
    type: AUTH_LOAD_COOKIE_DETAIL,
    payload,
  };
}

export const signup =
  (signupApiBody: ISignupApiBody): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<ISignupApiResponse, ISignupApiBody> = {
      method: ApiMethodTypes.POST,
      endpoint: "/auth/sign-up",
      onStartCb: () => dispatch(authSignupStart()),
      onSuccessCb: (data) =>
        dispatch(
          authSignupSuccess({
            ...data,
            expiresAt: new Date(
              Date.now() + data.expiresIn * 1000,
            ).toISOString(),
          }),
        ),
      onFailCb: (data) => dispatch(authSignupFail(data)),
      data: signupApiBody,
      isPublic: true,
    };
    await apiHandler<ISignupApiResponse, ISignupApiBody>(
      config,
      dispatch,
      getState,
    );
  };

export const login =
  (loginApiBody: ILoginApiBody): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<ILoginApiResponse, ILoginApiBody> = {
      method: ApiMethodTypes.POST,
      endpoint: "/auth/login",
      onStartCb: () => dispatch(authLoginStart()),
      onSuccessCb: (data) =>
        dispatch(
          authLoginSuccess({
            ...data,
            expiresAt: new Date(
              Date.now() + data.expiresIn * 1000,
            ).toISOString(),
          }),
        ),
      onFailCb: (data) => dispatch(authLoginFail(data)),
      data: loginApiBody,
      isPublic: true,
    };
    await apiHandler<ILoginApiResponse, ILoginApiBody>(
      config,
      dispatch,
      getState,
    );
  };

export const logout = (): IThunkFunction => async (dispatch, getState) => {
  const { refreshToken } = getState().auth;
  const config: IApiHandlerConfig = {
    method: ApiMethodTypes.POST,
    endpoint: "/auth/logout",
    onStartCb: () => dispatch(authLogoutStart()),
    onSuccessCb: () => dispatch(authLogoutSuccess()),
    onFailCb: (data) => dispatch(authLogoutFail(data)),
    headers: {
      refresh_token: refreshToken,
    },
  };
  await apiHandler(config, dispatch, getState);
};

export const tokenRefresh =
  (): IThunkFunction => async (dispatch, getState) => {
    const { refreshToken } = getState().auth;

    const config: IApiHandlerConfig<ITokenRefreshApiResponse> = {
      method: ApiMethodTypes.POST,
      endpoint: "/auth/token/refresh",
      onStartCb: () => dispatch(authTokenRefreshStart()),
      onSuccessCb: (data) => dispatch(authTokenRefreshSuccess(data)),
      onFailCb: () => dispatch(authTokenRefreshFail()),
      headers: {
        refresh_token: refreshToken,
      },
      isPublic: true,
    };
    await apiHandler<ITokenRefreshApiResponse>(config, dispatch, getState);
  };
