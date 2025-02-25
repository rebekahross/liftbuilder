import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowRight from "./components/icons/ArrowRight";
import SelectDropdown from "./components/SelectDropdown";
import { heightOptions, weightOptions } from "./dropdownOptions";

import styles from "./userCreationPartTwo.module.scss";

const UserCreationPartTwo = () => {
  const [firstName, setFirstName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (gender) {
      navigate("/user-creation-part-two");
    } else {
      alert("Please submit ");
    }
  };

  return (
    <div>
      <form onSubmit={handleNext} className={styles.formWrapper}>
        <div className={styles.contentContainer}>
          <div>
            <h1 className={styles.headerText}>
              Welcome{firstName && `, ${firstName}`}!
            </h1>
            <div>Get ready to achieve your fitness goals!</div>
            <div>First, let's get to know you...</div>
          </div>
          <div>What is your height and weight?</div>

          <SelectDropdown
            label={"Height"}
            options={heightOptions}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <SelectDropdown
            label={"Weight"}
            options={weightOptions}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <div className={styles.nextContainer}>
            <span>Question 2</span>
            <button type="submit" className={styles.nextButton}>
              <ArrowRight className={styles.arrow} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreationPartTwo;
