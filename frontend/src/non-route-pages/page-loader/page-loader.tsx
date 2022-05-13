import React from "react";

import Loader from "@components/common/loader/loader";

import { LoaderSizes } from "@components/common/loader/loader.enum";

import { IPageCommonProps } from "@interfaces/page-common-props.interface";

import styles from "./page-loader.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PageLoader(_props: IPageCommonProps) {
  return (
    <div className={styles.pgLodr}>
      <Loader size={LoaderSizes["100X100"]} />
    </div>
  );
}

export default PageLoader;
