import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles/submitButton.module.scss";

const SubmitButton = ({ href, text }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      type="submit"
      className={styles.blueButton}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
