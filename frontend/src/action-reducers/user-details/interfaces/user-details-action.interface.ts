import { IApiError } from "@interfaces/api-error.interface";

import { UserDetailsActions } from "@src/action-reducers/user-details/enums/user-details-actions.enum";

import { IUserDetailsApiResponse } from "./user-details-api-response.interface";

export interface IUserDetailsFetchStartActionResponse {
  type: UserDetailsActions.USER_DETAILS_FETCH_START;
}

export interface IUserDetailsFetchSuccessActionResponse {
  type: UserDetailsActions.USER_DETAILS_FETCH_SUCCESS;
  payload: IUserDetailsApiResponse;
}

export interface IUserDetailsFetchFailActionResponse {
  type: UserDetailsActions.USER_DETAILS_FETCH_FAIL;
  payload: IApiError;
}

export interface IUserDetailsResetDataActionResponse {
  type: UserDetailsActions.USER_DETAILS_RESET_DATA;
}

export type IUserDetailsAllActions =
  | IUserDetailsFetchStartActionResponse
  | IUserDetailsFetchSuccessActionResponse
  | IUserDetailsFetchFailActionResponse
  | IUserDetailsResetDataActionResponse;
