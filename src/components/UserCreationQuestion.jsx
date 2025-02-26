import React, { useState } from "react";

import styles from "./userCreationQuestion.module.scss";

const UserCreationQuestion = ({ question, children }) => {
  return (
    <div className={styles.infoSection}>
      <div className={styles.questionText}>{question}</div>
      <div className={styles.childrenContainer}>{children}</div>
    </div>
  );
};

export default UserCreationQuestion;
