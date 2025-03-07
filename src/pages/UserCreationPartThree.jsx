import React from "react";
import UserCreationWrapper from "../components/UserCreationWrapper";
import UserCreationQuestion from "../components/UserCreationQuestion";
import RangeSlider from "../components/RangeSlider";

import styles from "./styles/userCreationPartThree.module.scss";

const UserCreationPartThree = () => {
  return (
    <UserCreationWrapper
      questionNumber={3}
      nextLink="/user-creation-part-four"
      prevLink="/user-creation-part-two"
    >
      <UserCreationQuestion question={"What is your current fitness level?"}>
        <RangeSlider
          leftLabel={"Ultra beginner"}
          centerLabel={"Fitness enthusiast"}
          rightLabel={"Pro athlete"}
        />
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartThree;
