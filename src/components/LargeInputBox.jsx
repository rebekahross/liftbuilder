import React from "react";

import styles from "./largeInputBox.module.scss";

const LargeInputBox = ({ value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder={"Type here... "}
    />
  );
};

export default LargeInputBox;
