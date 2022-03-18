import { InputTagTypes } from "./text-input.enum";

export interface ITextInputPropTypes {
  className?: string;
  label: string;
  value: string;
  id: string;
  type?: InputTagTypes;
  onChange: (value: string) => void;
}
