import React from "react";

import SignUpSection from "@components/authentication-page/sign-up-section/sign-up-section";

import { IAuthennticationPagePropTypes } from "./authentication-page.interface";

function AuthenticationPage({ className = "" }: IAuthennticationPagePropTypes) {
  return (
    <div className={className}>
      <SignUpSection />
    </div>
  );
}

export default AuthenticationPage;
