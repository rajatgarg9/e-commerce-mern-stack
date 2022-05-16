import { InputTagTypes, AutoCompleteValues } from "./text-input.enum";

export interface ITextInputCommonPropTypes {
  className?: string;
  label: string;
  id: string;
  onChange: (value: string) => void;
  autoComplete?: AutoCompleteValues;
}

export interface ITextInputNumberPropTypes extends ITextInputCommonPropTypes {
  value: number | "";
  type?: InputTagTypes.NUMBER;
}

export interface ITextInputNonNumberPropTypes
  extends ITextInputCommonPropTypes {
  value: string;
  type?: Exclude<InputTagTypes, InputTagTypes.NUMBER>;
}

export type ITextInputPropTypes =
  | ITextInputNumberPropTypes
  | ITextInputNonNumberPropTypes;
