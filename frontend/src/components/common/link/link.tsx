/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import NextLink from "next/link";

import { ILinkPropTypes } from "./link.interface";

function Link({ className = "", href, title, children }: ILinkPropTypes) {
  return (
    <NextLink href={href}>
      <a className={className}>
        {title} {children}
      </a>
    </NextLink>
  );
}

export default Link;
