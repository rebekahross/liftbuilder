import React, { useState } from "react";

import styles from "./styles/userCreationComplete.module.scss";

const UserCreationComplete = ({}) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerText}>Thank you!</h1>
          <div>Now that we've gotten to know you, let's build some lifts!</div>
        </div>
        <a className={styles.link} href="/user-creation-part-one">
          Back to questions
        </a>
      </div>
    </div>
  );
};

export default UserCreationComplete;
