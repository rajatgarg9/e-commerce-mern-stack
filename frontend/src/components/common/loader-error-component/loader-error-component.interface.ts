import { IApiError } from "@interfaces/api-error.interface";

export interface ILoaderErrorComponentPropTypes {
  className?: string;
  isLoading: boolean;
  errors: IApiError;
}
