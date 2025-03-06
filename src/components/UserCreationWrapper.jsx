import React, { useState } from "react";
import ArrowContainer from "./ArrowContainer";

import styles from "./styles/userCreationWrapper.module.scss";

const UserCreationWrapper = ({
  prevLink,
  nextLink,
  questionNumber,
  isLastQuestion,
  children,
}) => {
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
        <div className={styles.bodyContainer}>
          <div className={styles.childrenContainer}>{children}</div>
          <ArrowContainer
            prevLink={prevLink}
            nextLink={nextLink}
            questionNumber={questionNumber}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCreationWrapper;
