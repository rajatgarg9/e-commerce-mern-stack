import React from "react";

import { IMessagePropTypes } from "./message.interface";

import { MessageVariation } from "./message.enum";

import styles from "./message.module.scss";

function Message({
  className = "",
  message,
  variation = MessageVariation.ERROR,
}: IMessagePropTypes) {
  return (
    <p
      className={`${
        styles[`msg--variation-${variation}`]
      } typo_body_3 ${className}`}
    >
      {message?.toString()}
    </p>
  );
}

export default Message;
