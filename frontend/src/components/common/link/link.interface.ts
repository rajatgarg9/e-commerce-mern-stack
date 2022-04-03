export interface ILinkCommonPropTypes {
  className?: string;
  href: string;
  title?: string;
  children?: React.ReactNode;
}

export interface ILinkBothRequiredPropTypes extends ILinkCommonPropTypes {
  title: string;
  children: React.ReactNode;
}

export interface ILinkTitleRequiredPropTypes extends ILinkCommonPropTypes {
  title: string;
  children?: React.ReactNode;
}

export interface ILinkChildrenRequiredPropTypes extends ILinkCommonPropTypes {
  title?: string;
  children: React.ReactNode;
}

export type ILinkPropTypes =
  | ILinkBothRequiredPropTypes
  | ILinkTitleRequiredPropTypes
  | ILinkChildrenRequiredPropTypes;
