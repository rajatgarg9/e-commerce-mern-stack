import { IApiError } from "@interfaces/api-error.interface";

export interface IErrorPopupProps {
  onPopupClose: () => void;
  message: IApiError;
}
