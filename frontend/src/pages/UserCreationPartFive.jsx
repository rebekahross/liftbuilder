import React, { useState } from "react";
import UserCreationWrapper from "../components/UserCreationWrapper";
import UserCreationQuestion from "../components/UserCreationQuestion";
import LargeInputBox from "../components/LargeInputBox";

import styles from "./styles/userCreationPartFive.module.scss";

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
        <div>
          <LargeInputBox
            value={textInput}
            setValue={setTextInput}
            subtitle={
              "Be as descriptive as you can so we can tailor your workouts to your needs. For example, are you training for strength, endurance, hypertrophy, or a combination of these?"
            }
          />
        </div>
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartFive;
