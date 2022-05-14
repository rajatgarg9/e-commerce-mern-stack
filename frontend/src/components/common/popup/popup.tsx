import React, { useEffect, useRef } from "react";
import { KeyboardEvets } from "@enums/keyboard-events.enum";

import { IPopupProps } from "./popup.interface";

import styles from "./popup.module.scss";

function Popup({ children, onPopupClose }: IPopupProps) {
  const popupRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    document?.body?.classList?.add("utility__popupBody");

    return () => {
      document?.body?.classList?.remove("utility__popupBody");
    };
  }, []);

  function handlePopupClose(
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>,
  ) {
    const eventCode = (event as React.KeyboardEvent<HTMLDivElement>).keyCode;

    if (
      (eventCode === KeyboardEvets.ENTER || typeof eventCode !== "number") &&
      (popupRef?.current === event.target ||
        contentRef?.current === event.target)
    ) {
      onPopupClose();
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={popupRef as React.RefObject<HTMLDivElement>}
      className={styles.popupMainCmpt}
      role="alert"
      onClick={handlePopupClose}
      onKeyDown={handlePopupClose}
    >
      <div
        className={styles.content}
        ref={contentRef as React.RefObject<HTMLDivElement>}
      >
        {children}
      </div>
    </div>
  );
}

export default Popup;
