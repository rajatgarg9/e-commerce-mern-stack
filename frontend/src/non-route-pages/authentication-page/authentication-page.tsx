import React from "react";

import SignUpSection from "@components/authentication-page/sign-up-section/sign-up-section";

import { IAuthennticationPagePropTypes } from "./authentication-page.interface";

import style from "./authentication-page.module.scss";

function AuthenticationPage({ className }: IAuthennticationPagePropTypes) {
  return (
    <div className={`${className || ""} ${style.test}`}>
      <SignUpSection />
    </div>
  );
}

export default AuthenticationPage;
