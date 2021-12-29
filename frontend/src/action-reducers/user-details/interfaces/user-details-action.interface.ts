import { IApiError } from "@interfaces/api-error.interface";

import { UserDetailsActionsTypes } from "@action-reducers/user-details/enums/user-details-actions-types.enum";

import { IUserDetailsApiResponse } from "./user-details-api-response.interface";

export interface IUserDetailsFetchStartActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_START;
}

export interface IUserDetailsFetchSuccessActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_SUCCESS;
  payload: IUserDetailsApiResponse;
}

export interface IUserDetailsFetchFailActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_FAIL;
  payload: IApiError;
}
