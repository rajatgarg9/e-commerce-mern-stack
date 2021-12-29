import { IApiError } from "@interfaces/api-error.interface";

import {
  IUserDetailsFetchStartActionResponse,
  IUserDetailsFetchSuccessActionResponse,
  IUserDetailsFetchFailActionResponse,
} from "./user-details-action.interface";

export interface IUserDetailsReducerState {
  isLoading: boolean;
  errors: IApiError;
  id: string;
  email: string;
  name: string;
}

export type IUserDetailsReducerActionParam =
  | IUserDetailsFetchStartActionResponse
  | IUserDetailsFetchSuccessActionResponse
  | IUserDetailsFetchFailActionResponse;
