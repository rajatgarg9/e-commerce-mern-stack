import { IApiError } from "@interfaces/api-error.interface";
import { IButtonPropTypes } from "@components/common/button/button.interface";

export interface ISuccessPopupProps {
  onPopupClose?: () => void;
  message: IApiError;
  actionButton?: IButtonPropTypes;
}
