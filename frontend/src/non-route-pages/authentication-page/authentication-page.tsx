import React from "react";

import SignUpSection from "@components/authentication-page/sign-up-section/sign-up-section";
import LoginSection from "@components/authentication-page/login-section/login-section";

import { IAuthennticationPagePropTypes } from "./authentication-page.interface";

import styles from "./authentication-page.module.scss";

function AuthenticationPage({ className = "" }: IAuthennticationPagePropTypes) {
  return (
    <div className={`${className}`}>
      <div className={styles.content}>
        <LoginSection className={styles.item} />
        <SignUpSection className={styles.item} />
      </div>
    </div>
  );
}

export default AuthenticationPage;
