import { IApiError } from "src/interfaces";

import {
  IUserDetailsFetchStartActionResponse,
  IUserDetailsFetchSuccessActionResponse,
  IUserDetailsFetchFailActionResponse,
} from "./user-details-action.interface";

export interface IUserDetailsReducerState {
  isLoading: boolean;
  errors: IApiError;
  email: string;
  id: string;
  name: string;
}

export type IUserDetailsReducerActionParam =
  | IUserDetailsFetchStartActionResponse
  | IUserDetailsFetchSuccessActionResponse
  | IUserDetailsFetchFailActionResponse;
