import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "./components/SelectDropdown";
import { heightOptions, weightOptions } from "./dropdownOptions";
import UserCreationWrapper from "./components/UserCreationWrapper";
import ArrowContainer from "./components/ArrowContainer";
import UserCreationQuestion from "./components/UserCreationQuestion";

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
    <UserCreationWrapper>
      <UserCreationQuestion question={"What is your height and weight?"}>
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
      </UserCreationQuestion>

      <ArrowContainer
        prevLink={"/user-creation-part-one"}
        nextLink={"/user-creation-part-three"}
        questionNumber={2}
      />
    </UserCreationWrapper>
  );
};

export default UserCreationPartTwo;
