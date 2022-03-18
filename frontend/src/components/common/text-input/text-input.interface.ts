export interface ITextInputPropTypes {
  className?: string;
  label: string;
  value: string;
  id: string;
  onChange: (value: string) => void;
}
