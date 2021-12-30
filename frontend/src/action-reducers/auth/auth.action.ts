import axios, { Canceler } from "axios";

import { getApiErrorMessage } from "@utilities/methods/miscellaneous";

import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";

import { AuthActionTypes } from "./enums/auth-action-types.enum";

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
  IAuthAddCookieDetailsActionResponse,
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
  AUTH_ADD_COOKIE_DETAIL,
} = AuthActionTypes;

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

export function authAddCookieDetails(
  payload: IAuthAddCookieDetailsActionResponse["payload"],
): IAuthAddCookieDetailsActionResponse {
  return {
    type: AUTH_ADD_COOKIE_DETAIL,
    payload,
  };
}

let signupApiCanceller: Canceler;

export const signup =
  (signupApiBody: ISignupApiBody): IThunkFunction =>
  async (dispatch, getState, api) => {
    try {
      if (signupApiCanceller) {
        signupApiCanceller("Operation canceled by the user.");
      }

      dispatch(authSignupStart());

      const res = await api.post<ISignupApiResponse>(
        "/auth/sign-up",
        { ...signupApiBody },
        {
          cancelToken: new axios.CancelToken(function executor(apiCanceller) {
            // An executor function receives a cancel function as a parameter
            signupApiCanceller = apiCanceller;
          }),
        },
      );

      dispatch(authSignupSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(authSignupFail(getApiErrorMessage(error as ITryCatchError)));
      }
    }
  };

let loginApiCanceller: Canceler;

export const login =
  (loginApiBody: ILoginApiBody): IThunkFunction =>
  async (dispatch, getState, api) => {
    try {
      if (loginApiCanceller) {
        loginApiCanceller("Operation canceled by the user.");
      }

      dispatch(authLoginStart());

      const res = await api.post<ILoginApiResponse>(
        "/auth/login",
        { ...loginApiBody },
        {
          cancelToken: new axios.CancelToken(function executor(apiCanceller) {
            // An executor function receives a cancel function as a parameter
            loginApiCanceller = apiCanceller;
          }),
        },
      );

      dispatch(authLoginSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(authLoginFail(getApiErrorMessage(error as ITryCatchError)));
      }
    }
  };

let logoutApiCanceller: Canceler;

export const logout = (): IThunkFunction => async (dispatch, getState, api) => {
  try {
    if (logoutApiCanceller) {
      logoutApiCanceller("Operation canceled by the user.");
    }

    dispatch(authLogoutStart());

    const { refreshToken, accessToken, tokenType } = getState().auth;

    await api.post(
      "/auth/logout",
      {},
      {
        cancelToken: new axios.CancelToken(function executor(apiCanceller) {
          // An executor function receives a cancel function as a parameter
          logoutApiCanceller = apiCanceller;
        }),
        headers: {
          authorization: `${tokenType} ${accessToken}`,
          refresh_token: refreshToken,
        },
      },
    );

    dispatch(authLogoutSuccess());
  } catch (error: unknown) {
    if (!axios.isCancel(error)) {
      dispatch(authLogoutFail(getApiErrorMessage(error as ITryCatchError)));
    }
  }
};

let tokenRefreshApiCanceller: Canceler;

export const tokenRefresh =
  (): IThunkFunction => async (dispatch, getState, api) => {
    try {
      if (tokenRefreshApiCanceller) {
        tokenRefreshApiCanceller("Operation canceled by the user.");
      }

      dispatch(authTokenRefreshStart());

      const { refreshToken } = getState().auth;

      const res = await api.post<ITokenRefreshApiResponse>(
        "/auth/token/refresh",
        {},
        {
          cancelToken: new axios.CancelToken(function executor(apiCanceller) {
            // An executor function receives a cancel function as a parameter
            tokenRefreshApiCanceller = apiCanceller;
          }),
          headers: {
            refresh_token: refreshToken,
          },
        },
      );

      dispatch(authTokenRefreshSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(authTokenRefreshFail());
      }
    }
  };
