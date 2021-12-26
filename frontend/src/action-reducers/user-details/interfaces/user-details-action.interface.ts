import { IApiError } from "src/interfaces";

import { UserDetailsActionsTypes } from "src/action-reducers/user-details/enums";

export interface IUserDetailsFetchStartActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_START;
}

export interface IUserDetailsFetchSuccessActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_SUCCESS;
  payload: { id: string; name: string };
}

export interface IUserDetailsFetchFailActionResponse {
  type: UserDetailsActionsTypes.USER_DETAILS_FETCH_FAIL;
  payload: IApiError;
}
