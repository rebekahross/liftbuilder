import React, { useState } from "react";
import UserCreationWrapper from "./components/UserCreationWrapper";
import UserCreationQuestion from "./components/UserCreationQuestion";

import styles from "./userCreationPartFive.module.scss";
import LargeInputBox from "./components/LargeInputBox";

const UserCreationPartFive = () => {
  const [textInput, setTextInput] = useState("");
  return (
    <UserCreationWrapper
      prevLink={"/user-creation-part-four"}
      nextLink={"/user-creation-complete"}
      isLastQuestion={true}
      questionNumber={5}
    >
      <UserCreationQuestion
        question={"Please describe your overall fitness goals."}
      >
        <div className={styles.descriptionText}>
          Be as descriptive as you can so we can tailor your workouts to your
          needs. For example, are you training for strength, endurance,
          hypertrophy, or a combination of these?
        </div>
        <LargeInputBox value={textInput} setValue={setTextInput} />
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartFive;
