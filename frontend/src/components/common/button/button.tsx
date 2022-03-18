import React from "react";

import Loader from "@components/common/loader/loader";

import { IButtonPropTypes } from "./button.interface";

import styles from "./button.module.scss";

function Button({
  className = "",
  title,
  onClick,
  isLoading,
  isDisabled,
}: IButtonPropTypes) {
  return (
    <button
      type="button"
      className={`${styles.btn} typo_body_2 ${
        isLoading ? `${styles["btn--lodng"]}` : ""
      } ${
        isDisabled || isLoading ? `${styles["btn--dsbld"]}` : ""
      } ${className}`}
      onClick={onClick}
    >
      {isLoading && <Loader className={styles.loader} />}
      <span className={styles.title}>{title}</span>
    </button>
  );
}

export default Button;
