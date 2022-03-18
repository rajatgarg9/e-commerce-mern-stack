import React from "react";

import { ITextInputPropTypes } from "./text-input.interface";

import styles from "./text-input.module.scss";

function TextInput({
  className,
  label,
  value,
  id,
  onChange,
}: ITextInputPropTypes) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <div className={`${styles.textInputCmpt} ${className || ""}`}>
      <label htmlFor={id}>{label}</label>
      <input value={value} id={id} onChange={handleChange} />
    </div>
  );
}

export default TextInput;
