import produce from "immer";

import { IAuthAllActions } from "./interfaces/auth-action.interface";
import { IAuthReducerState } from "./interfaces/auth-reducer-state.interface";

import { AuthActionTypes } from "./enums/auth-action-types.enum";

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

const defaultAuthReducer: IAuthReducerState = {
  isSignupInProgress: false,
  signupErrors: [],
  isLoginInProgress: false,
  loginErrors: [],
  isLogoutInProgress: false,
  logoutErrors: [],
  isTokenRefreshInProgress: false,
  accessToken: "",
  refreshToken: "",
  expiresIn: 0,
  tokenType: "",
};

const authReducer = (
  state = defaultAuthReducer,
  action: IAuthAllActions,
): IAuthReducerState =>
  produce(state, (draft: IAuthReducerState): IAuthReducerState => {
    switch (action?.type) {
      case AUTH_SIGNUP_START: {
        draft.isSignupInProgress = true;

        return draft;
      }
      case AUTH_SIGNUP_SUCCESS: {
        return {
          ...draft,
          isSignupInProgress: false,
          signupErrors: [],
          ...action?.payload,
        };
      }

      case AUTH_SIGNUP_FAIL: {
        draft.isSignupInProgress = false;
        draft.signupErrors = action?.payload;

        return draft;
      }

      case AUTH_LOGIN_START: {
        draft.isLoginInProgress = true;

        return draft;
      }
      case AUTH_LOGIN_SUCCESS: {
        return {
          ...draft,
          isLoginInProgress: false,
          loginErrors: [],
          ...action?.payload,
        };
      }

      case AUTH_LOGIN_FAIL: {
        draft.isLoginInProgress = false;
        draft.loginErrors = action?.payload;

        return draft;
      }

      case AUTH_LOGOUT_START: {
        draft.isLogoutInProgress = true;

        return draft;
      }
      case AUTH_LOGOUT_SUCCESS: {
        return {
          ...draft,
          ...defaultAuthReducer,
        };
      }

      case AUTH_LOGOUT_FAIL: {
        draft.isLogoutInProgress = false;
        draft.logoutErrors = action?.payload;

        return draft;
      }

      case AUTH_TOKEN_REFRESH_START: {
        draft.isTokenRefreshInProgress = true;

        return draft;
      }
      case AUTH_TOKEN_REFRESH_SUCCESS: {
        return {
          ...draft,
          isTokenRefreshInProgress: false,
          ...action?.payload,
        };
      }

      case AUTH_TOKEN_REFRESH_FAIL: {
        return {
          ...draft,
          ...defaultAuthReducer,
        };
      }

      case AUTH_ADD_COOKIE_DETAIL: {
        return {
          ...draft,
          ...action?.payload,
        };
      }

      default: {
        return draft;
      }
    }
  });

export default authReducer;
