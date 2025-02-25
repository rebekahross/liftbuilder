import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./components/icons/ArrowRight";

import styles from "./userCreationPartOne.module.scss";

const UserCreationPartOne = () => {
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (gender) {
      navigate("/user-creation-part-two");
    } else {
      alert("Please choose a gender");
    }
  };

  const handleGenderSelect = (selectedGender) => {
    console.log(selectedGender);
    setGender(selectedGender);
  };

  return (
    <div>
      <form onSubmit={handleNext} className={styles.formWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <h1 className={styles.headerText}>
              Welcome{firstName && `, ${firstName}`}!
            </h1>
            <div>Get ready to achieve your fitness goals!</div>
            <div>First, let's get to know you...</div>
          </div>
          <div className={styles.infoSection}>
            <div className={styles.questionText}>
              What is your biological sex?
            </div>

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

            <div className={styles.nextContainer}>
              <span>Question 1</span>
              <button type="submit" className={styles.nextButton}>
                <ArrowRight className={styles.arrow} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreationPartOne;
