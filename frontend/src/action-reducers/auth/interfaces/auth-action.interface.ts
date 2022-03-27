import { IApiError } from "@interfaces/api-error.interface";

import { AuthActions } from "@src/action-reducers/auth/enums/auth-actions.enum";

import { IAuthReducerMainData } from "./auth-reducer-state.interface";

export interface IAuthLoginStartActionResponse {
  type: AuthActions.AUTH_LOGIN_START;
}

export interface IAuthLoginSuccessActionResponse {
  type: AuthActions.AUTH_LOGIN_SUCCESS;
  payload: IAuthReducerMainData;
}

export interface IAuthLoginFailActionResponse {
  type: AuthActions.AUTH_LOGIN_FAIL;
  payload: IApiError;
}

export interface IAuthSignupStartActionResponse {
  type: AuthActions.AUTH_SIGNUP_START;
}

export interface IAuthSignupSuccessActionResponse {
  type: AuthActions.AUTH_SIGNUP_SUCCESS;
  payload: IAuthReducerMainData;
}

export interface IAuthSignupFailActionResponse {
  type: AuthActions.AUTH_SIGNUP_FAIL;
  payload: IApiError;
}

export interface IAuthLogoutStartActionResponse {
  type: AuthActions.AUTH_LOGOUT_START;
}

export interface IAuthLogoutSuccessActionResponse {
  type: AuthActions.AUTH_LOGOUT_SUCCESS;
}

export interface IAuthLogoutFailActionResponse {
  type: AuthActions.AUTH_LOGOUT_FAIL;
  payload: IApiError;
}

export interface IAuthTokenRefreshStartActionResponse {
  type: AuthActions.AUTH_TOKEN_REFRESH_START;
}

export interface IAuthTokenRefreshSuccessActionResponse {
  type: AuthActions.AUTH_TOKEN_REFRESH_SUCCESS;
  payload: Omit<IAuthReducerMainData, "refreshToken">;
}

export interface IAuthTokenRefreshFailActionResponse {
  type: AuthActions.AUTH_TOKEN_REFRESH_FAIL;
}

export interface IAuthLoadCookieDetailsActionResponse {
  type: AuthActions.AUTH_LOAD_COOKIE_DETAIL;
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
