import React, { useState } from "react";

import styles from "./userCreationWrapper.module.scss";

const UserCreationWrapper = ({ children }) => {
  const [firstName, setFirstName] = useState("");

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerText}>
            Welcome{firstName && `, ${firstName}`}!
          </h1>
          <div>Get ready to achieve your fitness goals!</div>
          <div>First, let's get to know you...</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserCreationWrapper;
