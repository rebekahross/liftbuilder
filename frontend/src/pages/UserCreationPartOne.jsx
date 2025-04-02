import React, { useState } from "react";
import UserCreationWrapper from "../components/UserCreationWrapper";
import UserCreationQuestion from "../components/UserCreationQuestion";

import styles from "./styles/userCreationPartOne.module.scss";

const UserCreationPartOne = () => {
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const handleGenderSelect = (selectedGender) => {
    console.log(selectedGender);
    setGender(selectedGender);

    localStorage.setItem("gender", selectedGender);
  };

  return (
    <UserCreationWrapper questionNumber={1} nextLink={"/user-creation-part-two"}>
      <UserCreationQuestion question={"What is your biological sex?"}>
        <div className={styles.buttonContainer}>
          {["Male", "Female", "Prefer not to say"].map((option) => (
            <button key={option} type="button" className={`${gender === option ? styles.selected : styles.genderButton}`} onClick={() => handleGenderSelect(option)}>
              {option}
            </button>
          ))}
        </div>
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartOne;
