import React from "react";

import Loader from "@components/common/loader/loader";
import Link from "@components/common/link/link";

import {
  IButtonPropTypes,
  ITagButtonPropTypes,
  ITagLinkPropTypes,
} from "./button.interface";

import { ButtonTagTypes } from "./button.enum";

import styles from "./button.module.scss";

function Button({
  className = "",
  title,
  onClick,
  isLoading,
  isDisabled,
  href,
  type = ButtonTagTypes.Button,
}: IButtonPropTypes) {
  let Tag: string | typeof Link = "button";
  let dynamicProps = {};

  if (type === ButtonTagTypes.Button) {
    Tag = "button";
    dynamicProps = {
      type: ButtonTagTypes.Button,
      onClick,
    } as Pick<ITagButtonPropTypes, "onClick" | "href" | "type">;
  }

  if (type === ButtonTagTypes.LINK) {
    Tag = Link;
    dynamicProps = {
      href,
      onClick,
    } as Pick<ITagLinkPropTypes, "onClick" | "href" | "type">;
  }

  return (
    <Tag
      title=""
      href=""
      className={`${styles.btn} typo_body_2 ${
        isLoading ? `${styles["btn--lodng"]}` : ""
      } ${
        isDisabled || isLoading ? `${styles["btn--dsbld"]}` : ""
      } ${className}`}
      {...dynamicProps}
    >
      {isLoading && <Loader className={styles.loader} />}
      <span className={styles.title}>{title}</span>
    </Tag>
  );
}

export default Button;
