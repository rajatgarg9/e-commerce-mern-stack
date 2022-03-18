import React, { useState } from "react";

import TextInput from "@components/common/text-input/text-input";

import { ISignUpPropTypes } from "./sign-up-section.interface";

function SignUpSection({ className }: ISignUpPropTypes) {
  const [email, setEmail] = useState<string>("");
  return (
    <div className={`signupSec ${className || ""}`}>
      <TextInput
        id="signupSec__email"
        value={email}
        label="email"
        onChange={(value) => setEmail(value)}
      />
    </div>
  );
}

export default SignUpSection;
