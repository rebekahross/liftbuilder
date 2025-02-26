import React, { useState } from "react";
import UserCreationWrapper from "./components/UserCreationWrapper";
import ArrowContainer from "./components/ArrowContainer";
import UserCreationQuestion from "./components/UserCreationQuestion";

import styles from "./userCreationPartOne.module.scss";

const UserCreationPartOne = () => {
  const [gender, setGender] = useState("");

  const handleGenderSelect = (selectedGender) => {
    console.log(selectedGender);
    setGender(selectedGender);
  };

  return (
    <UserCreationWrapper>
      <UserCreationQuestion question={"What is your biological sex?"}>
        <div className={styles.buttonContainer}>
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <button
              key={option}
              type="button"
              className={`${
                gender === option ? styles.selected : styles.genderButton
              }`}
              onClick={() => handleGenderSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </UserCreationQuestion>
      <ArrowContainer questionNumber={1} nextLink="/user-creation-part-two" />
    </UserCreationWrapper>
  );
};

export default UserCreationPartOne;
