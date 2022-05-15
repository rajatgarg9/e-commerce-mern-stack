import Popup from "@components/common/popup/popup";

import PopupCloseButton from "@components/common/popup-close-button/popup-close-button";
import Message from "@components/common/message/message";
import { IErrorPopupProps } from "./error-popup.interface";

import styles from "./error-popup.module.scss";

function ErrorPopup({ onPopupClose, message }: IErrorPopupProps) {
  return (
    <Popup onPopupClose={onPopupClose}>
      <div className={styles.errorPopupCard}>
        <Message message={message} />

        <PopupCloseButton onClick={onPopupClose} />
      </div>
    </Popup>
  );
}

export default ErrorPopup;
