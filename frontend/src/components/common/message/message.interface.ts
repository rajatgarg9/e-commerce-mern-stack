import { IApiError } from "@interfaces/api-error.interface";
import { MessageVariation } from "./message.enum";

export interface IMessagePropTypes {
  className?: string;
  message: IApiError;
  variation?: MessageVariation;
}
