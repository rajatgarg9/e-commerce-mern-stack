import React from "react";

import Loader from "@components/common/loader/loader";
import Message from "@components/common/message/message";

import { LoaderSizes } from "@components/common/loader/loader.enum";

import { ILoaderErrorComponentPropTypes } from "./loader-error-component.interface";

import styles from "./loader-error-component.module.scss";

function LoaderErrorComponent({
  isLoading,
  errors,
  className = "",
}: ILoaderErrorComponentPropTypes) {
  const hasError = errors && errors.length > 0;

  if (!hasError && !isLoading) {
    return null;
  }

  return (
    <div className={`${styles.lodrErrCmpt} ${className}`}>
      {isLoading && <Loader size={LoaderSizes["100X100"]} />}
      {!isLoading && hasError && <Message message={errors} />}
    </div>
  );
}

export default LoaderErrorComponent;
