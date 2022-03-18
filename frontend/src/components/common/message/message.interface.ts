import { MessageVariation } from "./message.enum";

export interface IMessagePropTypes {
  className?: string;
  message: string | string[];
  variation?: MessageVariation;
}
