import React from "react";

import { ILoaderPropTypes } from "./loader.interface";
import { LoaderSizes } from "./loader.enum";

import styles from "./loader.module.scss";

function Loader({
  className = "",
  size = LoaderSizes["25X25"],
}: ILoaderPropTypes) {
  return (
    <span
      className={`${styles.lodr} ${styles[`lodr--size-${size}`]} ${className}`}
    >
      <span className={styles.circle} />
    </span>
  );
}

export default Loader;
