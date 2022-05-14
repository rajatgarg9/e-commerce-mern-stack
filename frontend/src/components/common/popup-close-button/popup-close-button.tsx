import { IPopupCloseButton } from "./popup-close-button.interface";

import styles from "./popup-close-button.module.scss";

function PopupCloseButton({ className = "", onClick }: IPopupCloseButton) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.closeBtn} ${className}`}
    >
      X
    </button>
  );
}

export default PopupCloseButton;
