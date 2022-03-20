import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "@action-reducers/auth/auth.action";
import { IRootReducerState } from "@action-reducers/root.reducer";
import { IHeaderPropTypes } from "./header.interface";

import styles from "./header.module.scss";

function Header({ className = "" }: IHeaderPropTypes) {
  const email = useSelector(
    (state: IRootReducerState) => state.userDetails.email,
  );
  const name = useSelector(
    (state: IRootReducerState) => state.userDetails.name,
  );
  const dispatch = useDispatch();
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.contentWrap}>
        <span className={`${styles.logo} typo_heading_1`}>Buy</span>

        <div className={styles.rightInfoSec}>
          <div className={styles.userInfoSec}>
            <span className={styles.avatar} />
            <div className={styles.nameNEmailWrap}>
              <span>{name}</span>
              <span>{email}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
