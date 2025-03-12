import React from "react";

import styles from "./styles/submitButton.module.scss";

const SubmitButton = ({ text }) => {
  return (
    <button type="submit" className={styles.blueButton}>
      {text}
    </button>
  );
};

export default SubmitButton;
