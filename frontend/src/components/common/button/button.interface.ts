import React from "react";

import { ILinkPropTypes } from "@components/common/link/link.interface";

import { ButtonTagTypes } from "./button.enum";

export interface IButtonCommonPropTypes {
  className?: string;
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface ITagButtonPropTypes extends IButtonCommonPropTypes {
  type?: ButtonTagTypes.Button;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: never;
}

export interface ITagLinkPropTypes
  extends Omit<ILinkPropTypes, "className" | "title">,
    IButtonCommonPropTypes {
  type: ButtonTagTypes.LINK;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type IButtonPropTypes = ITagLinkPropTypes | ITagButtonPropTypes;
