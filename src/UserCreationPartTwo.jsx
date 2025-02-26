import React, { useState } from "react";
import SelectDropdown from "./components/SelectDropdown";
import { heightOptions, weightOptions } from "./dropdownOptions";
import UserCreationWrapper from "./components/UserCreationWrapper";
import UserCreationQuestion from "./components/UserCreationQuestion";

import styles from "./userCreationPartTwo.module.scss";

const UserCreationPartTwo = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <UserCreationWrapper
      prevLink={"/user-creation-part-one"}
      nextLink={"/user-creation-part-three"}
      questionNumber={2}
    >
      <UserCreationQuestion question={"What is your height and weight?"}>
        <div className={styles.selectContainers}>
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
        </div>
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartTwo;
