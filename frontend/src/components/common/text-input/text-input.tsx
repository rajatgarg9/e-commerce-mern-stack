import React from "react";

import { ITextInputPropTypes } from "./text-input.interface";
import { InputTagTypes, AutoCompleteValues } from "./text-input.enum";

import styles from "./text-input.module.scss";

function TextInput({
  className = "",
  label,
  value,
  id,
  type = InputTagTypes.TEXT,
  onChange,
  autoComplete = AutoCompleteValues.ON,
}: ITextInputPropTypes) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <div className={`${styles.textInputCmpt} ${className}`}>
      <label htmlFor={id} className={`typo_body_2 ${styles.label}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        onChange={handleChange}
        className={`typo_body_1 ${styles.inputElmnt}`}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default TextInput;
