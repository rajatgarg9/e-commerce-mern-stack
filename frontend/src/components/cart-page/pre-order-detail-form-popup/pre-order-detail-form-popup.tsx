import { useState } from "react";
import Popup from "@components/common/popup/popup";
import Button from "@components/common/button/button";
import PopupCloseButton from "@components/common/popup-close-button/popup-close-button";
import TextInput from "@components/common/text-input/text-input";

import { InputTagTypes } from "@components/common/text-input/text-input.enum";
import { IPreOrderDetailFormPopup } from "./pre-order-detail-form-popup.interface";

import styles from "./pre-order-detail-form-popup.module.scss";

function PreOrderDetailFormPopup({
  onPopupClose,
  onSubmit,
}: IPreOrderDetailFormPopup) {
  const [address, setAddress] = useState<string>("");
  const [paymentCardNumber, setPaymentCardNumber] = useState<number | "">("");
  return (
    <Popup onPopupClose={onPopupClose}>
      <div className={styles.preOdrDtalCrd}>
        <form autoComplete="on" className={styles.form}>
          <div>
            <div className={styles.textInputWrapItem}>
              <TextInput
                id=""
                label="Address"
                value={address}
                onChange={(value) => setAddress(value)}
                className={styles.textInput}
              />
            </div>
            <div className={styles.textInputWrapItem}>
              <TextInput
                type={InputTagTypes.NUMBER}
                id=""
                label="Payment Card Number"
                value={paymentCardNumber}
                onChange={(value) => setPaymentCardNumber(Number(value))}
                className={styles.textInput}
              />
            </div>
          </div>

          <div className={styles.btnWrap}>
            <Button
              title="Place order"
              onClick={() =>
                onSubmit({
                  address,
                  paymentCardNumber: Number(paymentCardNumber),
                })
              }
              isDisabled={!address || !paymentCardNumber}
            />
          </div>
        </form>
        {onPopupClose && <PopupCloseButton onClick={onPopupClose} />}
      </div>
    </Popup>
  );
}

export default PreOrderDetailFormPopup;
