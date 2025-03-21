import React, { useState } from "react";
import GymStats from "../components/GymStats";
import UserCreationWrapper from "../components/UserCreationWrapper";
import UserCreationQuestion from "../components/UserCreationQuestion";

import styles from "./styles/userCreationPartFour.module.scss";

const UserCreationPartFour = () => {
  const [benchPress, setBenchPress] = useState();
  const [squat, setSquat] = useState();
  const [mileTime, setMileTime] = useState();
  const [bicepsCurl, setBicepsCurl] = useState();
  const [cleanMax, setCleanMax] = useState();
  const [calfRaise, setCalfRaise] = useState();
  const [isPounds, setIsPounds] = useState(true);

  return (
    <UserCreationWrapper
      prevLink={"/user-creation-part-three"}
      nextLink={"/user-creation-part-five"}
      questionNumber={4}
    >
      <UserCreationQuestion question={"What are some of your gym stats?"}>
        <div className={styles.gymStatsContainer}>
          <GymStats
            benchPress={benchPress}
            setBenchPress={setBenchPress}
            squat={squat}
            setSquat={setSquat}
            mileTime={mileTime}
            setMileTime={setMileTime}
            bicepsCurl={bicepsCurl}
            setBicepsCurl={setBicepsCurl}
            cleanMax={cleanMax}
            setCleanMax={setCleanMax}
            calfRaise={calfRaise}
            setCalfRaise={setCalfRaise}
            isPounds={isPounds}
            setIsPounds={setIsPounds}
          />
        </div>
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartFour;
