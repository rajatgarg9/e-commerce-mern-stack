import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@components/common/text-input/text-input";
import Button from "@components/common/button/button";
import Message from "@components/common/message/message";

import {
  InputTagTypes,
  AutoCompleteValues,
} from "@components/common/text-input/text-input.enum";

import { login } from "@action-reducers/auth/auth.action";

import { IRootReducerState } from "@action-reducers/root.reducer";
import { ILoginPropTypes } from "./login-section.interface";

import styles from "./login-section.module.scss";

function LoginSection({ className = "" }: ILoginPropTypes): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isLoginInProgress = useSelector(
    (state: IRootReducerState) => state.auth.isLoginInProgress,
  );
  const loginErrors = useSelector(
    (state: IRootReducerState) => state.auth.loginErrors,
  );

  const dispatch = useDispatch();

  const handleLoginButton = useCallback(() => {
    const data = {
      email,
      password,
    };
    dispatch(login(data));
  }, [email, password, dispatch]);

  const hasError = loginErrors?.length > 0;

  return (
    <div className={`${styles.loginSec} ${className}`}>
      <h2 className={`${styles.heading} typo_heading_2`}>Login</h2>
      <form autoComplete="on">
        <div className={styles.inputWrap}>
          <TextInput
            className={styles.inputElement}
            id="loginSec__email"
            value={email}
            label="email"
            onChange={(value) => setEmail(value)}
            type={InputTagTypes.EMAIL}
          />
        </div>
        <div className={styles.inputWrap}>
          <TextInput
            className={styles.inputElement}
            id="loginSec__paswrd"
            value={password}
            label="password"
            onChange={(value) => setPassword(value)}
            type={InputTagTypes.PASSWORD}
            autoComplete={AutoCompleteValues.OFF}
          />
        </div>

        <div className={styles.btnWrap}>
          <Button
            title="Login"
            isLoading={isLoginInProgress}
            onClick={handleLoginButton}
            isDisabled={!email || !password}
          />
        </div>
      </form>

      {hasError && (
        <Message message={loginErrors} className={styles.errorMsg} />
      )}
    </div>
  );
}

export default LoginSection;
