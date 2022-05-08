import { IApiError } from "@interfaces/api-error.interface";

export interface IAuthReducerMainData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  expiresAt: string;
}

export interface IAuthReducerState extends IAuthReducerMainData {
  isSignupInProgress: boolean;
  signupErrors: IApiError;
  isLoginInProgress: boolean;
  loginErrors: IApiError;
  isLogoutInProgress: boolean;
  logoutErrors: IApiError;
  isTokenRefreshInProgress: boolean;
}
