import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "@components/common/link/link";
import Image from "next/image";
import Button from "@components/common/button/button";
import LoginPopup from "@components/common/login-popup/login-popup";

import { logout } from "@action-reducers/auth/auth.action";
import { IRootReducerState } from "@action-reducers/root.reducer";

import { IHeaderPropTypes } from "./header.interface";

import styles from "./header.module.scss";

function Header({ className = "" }: IHeaderPropTypes) {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const name = useSelector(
    (state: IRootReducerState) => state.userDetails.name,
  );
  const accessToken = useSelector(
    (state: IRootReducerState) => state.auth.accessToken,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      setIsLoginPopupOpen(false);
    }
  }, [accessToken]);
  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <div className={styles.contentWrap}>
          <span className={`${styles.logo} typo_heading_1`}>
            <Link href="/">Buy</Link>
          </span>

          <div className={styles.rightInfoSec}>
            {accessToken && (
              <>
                <div className={styles.userInfoSec}>
                  <span className={styles.avatarWrap}>
                    <Image
                      src="/images/avatar-placeholder.jpeg"
                      alt="avatar"
                      layout="fill"
                    />
                  </span>

                  <span className={`${styles.name} typo_body_3`}>{name}</span>
                </div>
                <Button
                  onClick={() => {
                    window.location.reload();
                    dispatch(logout());
                  }}
                  className={styles.logoutBtn}
                >
                  Logout
                </Button>
              </>
            )}
            {!accessToken && (
              <Button onClick={() => setIsLoginPopupOpen(true)}>Login</Button>
            )}
          </div>
        </div>
      </header>
      {isLoginPopupOpen && (
        <LoginPopup onPopupClose={() => setIsLoginPopupOpen(false)} />
      )}
    </>
  );
}

export default Header;
