import { IApiError } from "@interfaces/api-error.interface";

export interface IUserDetailsReducerMainData {
  id: string;
  email: string;
  name: string;
}

export interface IUserDetailsReducerState extends IUserDetailsReducerMainData {
  isLoading: boolean;
  errors: IApiError;
}
