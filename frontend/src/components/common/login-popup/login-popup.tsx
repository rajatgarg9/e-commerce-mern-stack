import Popup from "@components/common/popup/popup";

import PopupCloseButton from "@components/common/popup-close-button/popup-close-button";
import SignUpSection from "@components/authentication-page/sign-up-section/sign-up-section";
import LoginSection from "@components/authentication-page/login-section/login-section";

import { ILoginPopupProps } from "./login-popup.interface";

import styles from "./login-popup.module.scss";

function LoginPopup({ onPopupClose }: ILoginPopupProps) {
  return (
    <Popup onPopupClose={onPopupClose}>
      <div className={styles.loginPopupCard}>
        <div className={styles.content}>
          <LoginSection className={styles.item} />
          <SignUpSection className={styles.item} />
        </div>

        <PopupCloseButton onClick={onPopupClose} />
      </div>
    </Popup>
  );
}

export default LoginPopup;
