import React from "react";

import styles from "./styles/largeInputBox.module.scss";

const LargeInputBox = ({ title, subtitle, value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.inputBoxContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
      <textarea
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={"Type here... "}
      />
    </div>
  );
};

export default LargeInputBox;
