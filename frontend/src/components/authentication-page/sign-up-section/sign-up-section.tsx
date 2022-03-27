import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@components/common/text-input/text-input";
import Button from "@components/common/button/button";
import Message from "@components/common/message/message";

import {
  InputTagTypes,
  AutoCompleteValues,
} from "@components/common/text-input/text-input.enum";

import { signup } from "@action-reducers/auth/auth.action";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { ISignUpPropTypes } from "./sign-up-section.interface";

import styles from "./sign-up-section.module.scss";

function SignUpSection({ className = "" }: ISignUpPropTypes): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isSignupInProgress = useSelector(
    (state: IRootReducerState) => state.auth.isSignupInProgress,
  );
  const signupErrors = useSelector(
    (state: IRootReducerState) => state.auth.signupErrors,
  );

  const dispatch = useDispatch();

  const handleSignUpButton = useCallback(() => {
    const data = {
      name,
      email,
      password,
    };
    dispatch(signup(data));
  }, [name, email, password, dispatch]);

  const hasError = signupErrors?.length > 0;

  return (
    <div className={`${styles.signupSec} ${className}`}>
      <h2 className={`${styles.heading} typo_heading_2`}>Sign Up</h2>
      <form autoComplete="on">
        <div className={styles.inputWrap}>
          <TextInput
            className={styles.inputElement}
            id="signupSec__name"
            value={name}
            label="name"
            onChange={(value) => setName(value)}
          />
        </div>
        <div className={styles.inputWrap}>
          <TextInput
            className={styles.inputElement}
            id="signupSec__email"
            value={email}
            label="email"
            onChange={(value) => setEmail(value)}
            type={InputTagTypes.EMAIL}
          />
        </div>
        <div className={styles.inputWrap}>
          <TextInput
            className={styles.inputElement}
            id="signupSec__paswrd"
            value={password}
            label="password"
            onChange={(value) => setPassword(value)}
            type={InputTagTypes.PASSWORD}
            autoComplete={AutoCompleteValues.OFF}
          />
        </div>

        <div className={styles.btnWrap}>
          <Button
            title="Sign Up"
            isLoading={isSignupInProgress}
            onClick={handleSignUpButton}
            isDisabled={!name || !email || !password}
          />
        </div>
      </form>

      {hasError && (
        <Message message={signupErrors} className={styles.errorMsg} />
      )}
    </div>
  );
}

export default SignUpSection;
