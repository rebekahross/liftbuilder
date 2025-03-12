import React, { useState } from "react";
import SubmitButton from "../components/SubmitButton";

import styles from "./styles/userCreationComplete.module.scss";

const UserCreationComplete = ({}) => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.bodyContainer}>
          <h1 className={styles.headerText}>Thank you!</h1>
          <div className={styles.subtitleText}>
            Now that we've gotten to know you, let's build you some lifts!
          </div>
          <SubmitButton text={"Let's go!"} />
          <a className={styles.link} href="/user-creation-part-one">
            Back to questions
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCreationComplete;
