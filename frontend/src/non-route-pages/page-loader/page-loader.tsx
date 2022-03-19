import React from "react";

import Loader from "@components/common/loader/loader";

import { LoaderSizes } from "@components/common/loader/loader.enum";

import styles from "./page-loader.module.scss";

function PageLoader() {
  return (
    <div className={styles.pgLodr}>
      <Loader size={LoaderSizes["100X100"]} />
    </div>
  );
}

export default PageLoader;
