import axios, { Canceler } from "axios";

import { getApiErrorMessage } from "@utilities/methods/miscellaneous";
import { IThunkFunction } from "@interfaces/thunk-function.interface";
import { ITryCatchError } from "@interfaces/try-catch-error.interface";
import { UserDetailsActionsTypes } from "./enums/user-details-actions-types.enum";

import {
  IUserDetailsFetchStartActionResponse,
  IUserDetailsFetchSuccessActionResponse,
  IUserDetailsFetchFailActionResponse,
} from "./interfaces/user-details-action.interface";

import { IUserDetailsApiResponse } from "./interfaces/user-details-api-response.interface";

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

let fetchUserDetailsApiCanceller: Canceler;

export const fetchUserDetails =
  (): IThunkFunction => async (dispatch, getState, api) => {
    try {
      if (fetchUserDetailsApiCanceller) {
        fetchUserDetailsApiCanceller("Operation canceled by the user.");
      }

      dispatch(userDetailsFetchStart());

      const { accessToken, tokenType } = getState().auth;

      const res = await api.get<IUserDetailsApiResponse>("/users/@me", {
        cancelToken: new axios.CancelToken(function executor(apiCanceller) {
          // An executor function receives a cancel function as a parameter
          fetchUserDetailsApiCanceller = apiCanceller;
        }),
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      });

      dispatch(userDetailsFetchSuccess(res.data));
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        dispatch(
          userDetailsFetchFail(getApiErrorMessage(error as ITryCatchError)),
        );
      }
    }
  };
