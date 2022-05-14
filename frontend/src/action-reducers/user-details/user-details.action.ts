import { apiHandler } from "@src/utilities/api-handler";

import { IApiHandlerConfig } from "@interfaces/api-handler.interface";
import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ApiMethodTypes } from "@enums/api-handler.enum";
import {
  IUserDetailsFetchStartActionResponse,
  IUserDetailsFetchSuccessActionResponse,
  IUserDetailsFetchFailActionResponse,
  IUserDetailsResetDataActionResponse,
} from "./interfaces/user-details-action.interface";
import { IUserDetailsApiResponse } from "./interfaces/user-details-api-response.interface";

import { UserDetailsActions } from "./enums/user-details-actions.enum";

const {
  USER_DETAILS_FETCH_START,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAIL,
  USER_DETAILS_RESET_DATA,
} = UserDetailsActions;

export function userDetailsFetchStart(): IUserDetailsFetchStartActionResponse {
  return {
    type: USER_DETAILS_FETCH_START,
  };
}

export function userDetailsFetchSuccess(
  payload: IUserDetailsFetchSuccessActionResponse["payload"],
): IUserDetailsFetchSuccessActionResponse {
  return {
    type: USER_DETAILS_FETCH_SUCCESS,
    payload,
  };
}
export function userDetailsFetchFail(
  payload: IUserDetailsFetchFailActionResponse["payload"],
): IUserDetailsFetchFailActionResponse {
  return {
    type: USER_DETAILS_FETCH_FAIL,
    payload,
  };
}

export function userDetailsResetData(): IUserDetailsResetDataActionResponse {
  return {
    type: USER_DETAILS_RESET_DATA,
  };
}

export const fetchUserDetails =
  (isSilent?: boolean): IThunkFunction =>
  async (dispatch, getState) => {
    const config: IApiHandlerConfig<IUserDetailsApiResponse> = {
      method: ApiMethodTypes.GET,
      endpoint: `/users/@me`,
      onStartCb: isSilent ? undefined : () => dispatch(userDetailsFetchStart()),
      onSuccessCb: (data) => dispatch(userDetailsFetchSuccess(data)),
      onFailCb: (data) => dispatch(userDetailsFetchFail(data)),
    };
    await apiHandler<IUserDetailsApiResponse>(config, dispatch, getState);
  };
