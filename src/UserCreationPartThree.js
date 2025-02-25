import React, { useState } from "react";
import UserCreationWrapper from "./components/UserCreationWrapper";
import ArrowContainer from "./components/ArrowContainer";
import UserCreationQuestion from "./components/UserCreationQuestion";

import styles from "./userCreationPartOne.module.scss";

const UserCreationPartThree = () => {
  const [gender, setGender] = useState("");

  const handleGenderSelect = (selectedGender) => {
    console.log(selectedGender);
    setGender(selectedGender);
  };

  return (
    <UserCreationWrapper>
      <UserCreationQuestion question={"What is your current fitness level?"}>
        <div className={styles.buttonContainer}></div>
      </UserCreationQuestion>
      <ArrowContainer
        questionNumber={3}
        nextLink="/user-creation-part-four"
        prevLink="/user-creation-part-two"
      />
    </UserCreationWrapper>
  );
};

export default UserCreationPartThree;
