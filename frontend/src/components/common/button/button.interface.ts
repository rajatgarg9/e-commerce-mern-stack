import React from "react";

export interface IButtonPropTypes {
  className?: string;
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}
