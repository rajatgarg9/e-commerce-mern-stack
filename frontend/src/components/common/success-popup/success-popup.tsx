import Popup from "@components/common/popup/popup";

import PopupCloseButton from "@components/common/popup-close-button/popup-close-button";
import Message from "@components/common/message/message";
import Button from "@components/common/button/button";

import { MessageVariation } from "@components/common/message/message.enum";

import { ISuccessPopupProps } from "./success-popup.interface";

import styles from "./success-popup.module.scss";

function SuccessPopup({
  onPopupClose,
  message,
  actionButton,
}: ISuccessPopupProps) {
  return (
    <Popup onPopupClose={onPopupClose}>
      <div className={styles.successPopupCard}>
        <Message message={message} variation={MessageVariation.SUCCESS} />

        {actionButton?.title && (
          <div className={styles.btnWrap}>
            <Button {...actionButton} />
          </div>
        )}
        {onPopupClose && <PopupCloseButton onClick={onPopupClose} />}
      </div>
    </Popup>
  );
}

export default SuccessPopup;
