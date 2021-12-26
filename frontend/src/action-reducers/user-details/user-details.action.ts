import { UserDetailsActionsTypes } from "./enums";

import {
  IUserDetailsFetchStartActionResponse,
  IUserDetailsFetchSuccessActionResponse,
  IUserDetailsFetchFailActionResponse,
} from "./interfaces";

const {
  USER_DETAILS_FETCH_START,
  USER_DETAILS_FETCH_SUCCESS,
  USER_DETAILS_FETCH_FAIL,
} = UserDetailsActionsTypes;

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
