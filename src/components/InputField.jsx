import React from "react";

import styles from "./inputField.module.scss";

const InputField = ({ label, value, setValue, type, placeholder = "" }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label>{label}</label>}
      <input
        type={type}
        className={styles.input}
        value={value}
        onChange={onChange}
        min={0}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
