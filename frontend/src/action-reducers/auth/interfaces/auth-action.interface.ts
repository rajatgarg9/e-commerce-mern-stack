import { IApiError } from "@interfaces/api-error.interface";

import { AuthActionTypes } from "@action-reducers/auth/enums/auth-action-types.enum";

import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export interface IAuthLoginStartActionResponse {
  type: AuthActionTypes.AUTH_LOGIN_START;
}

export interface IAuthLoginSuccessActionResponse {
  type: AuthActionTypes.AUTH_LOGIN_SUCCESS;
  payload: IAuthReducerMainData;
}

export interface IAuthLoginFailActionResponse {
  type: AuthActionTypes.AUTH_LOGIN_FAIL;
  payload: IApiError;
}

export interface IAuthSignupStartActionResponse {
  type: AuthActionTypes.AUTH_SIGNUP_START;
}

export interface IAuthSignupSuccessActionResponse {
  type: AuthActionTypes.AUTH_SIGNUP_SUCCESS;
  payload: IAuthReducerMainData;
}

export interface IAuthSignupFailActionResponse {
  type: AuthActionTypes.AUTH_SIGNUP_FAIL;
  payload: IApiError;
}

export interface IAuthLogoutStartActionResponse {
  type: AuthActionTypes.AUTH_LOGOUT_START;
}

export interface IAuthLogoutSuccessActionResponse {
  type: AuthActionTypes.AUTH_LOGOUT_SUCCESS;
}

export interface IAuthLogoutFailActionResponse {
  type: AuthActionTypes.AUTH_LOGOUT_FAIL;
  payload: IApiError;
}

export interface IAuthTokenRefreshStartActionResponse {
  type: AuthActionTypes.AUTH_TOKEN_REFRESH_START;
}

export interface IAuthTokenRefreshSuccessActionResponse {
  type: AuthActionTypes.AUTH_TOKEN_REFRESH_SUCCESS;
  payload: Omit<IAuthReducerMainData, "refreshToken">;
}

export interface IAuthTokenRefreshFailActionResponse {
  type: AuthActionTypes.AUTH_TOKEN_REFRESH_FAIL;
}

export interface IAuthLoadCookieDetailsActionResponse {
  type: AuthActionTypes.AUTH_LOAD_COOKIE_DETAIL;
  payload: IAuthReducerMainData;
}

export type IAuthAllActions =
  | IAuthSignupStartActionResponse
  | IAuthSignupSuccessActionResponse
  | IAuthSignupFailActionResponse
  | IAuthLoginStartActionResponse
  | IAuthLoginSuccessActionResponse
  | IAuthLoginFailActionResponse
  | IAuthLogoutStartActionResponse
  | IAuthLogoutSuccessActionResponse
  | IAuthLogoutFailActionResponse
  | IAuthTokenRefreshStartActionResponse
  | IAuthTokenRefreshSuccessActionResponse
  | IAuthTokenRefreshFailActionResponse
  | IAuthLoadCookieDetailsActionResponse;
