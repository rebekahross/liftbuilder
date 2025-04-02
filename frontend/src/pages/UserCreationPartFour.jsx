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

  const handleBenchPressSelect = (selectedBenchPress) => {
    console.log("Bench Press:", selectedBenchPress);
    setBenchPress(selectedBenchPress);
    localStorage.setItem("benchPress", selectedBenchPress);
  };

  const handleSquatSelect = (selectedSquat) => {
    console.log("Squat:", selectedSquat);
    setSquat(selectedSquat);
    localStorage.setItem("squat", selectedSquat);
  };

  const handleMileTimeSelect = (selectedMileTime) => {
    console.log("Mile Time:", selectedMileTime);
    setMileTime(selectedMileTime);
    localStorage.setItem("mileTime", selectedMileTime);
  };

  const handleBicepsCurlSelect = (selectedBicepsCurl) => {
    console.log("Biceps Curl:", selectedBicepsCurl);
    setBicepsCurl(selectedBicepsCurl);
    localStorage.setItem("bicepsCurl", selectedBicepsCurl);
  };

  const handleCleanMaxSelect = (selectedCleanMax) => {
    console.log("Clean Max:", selectedCleanMax);
    setCleanMax(selectedCleanMax);
    localStorage.setItem("cleanMax", selectedCleanMax);
  };

  const handleCalfRaiseSelect = (selectedCalfRaise) => {
    console.log("Calf Raise:", selectedCalfRaise);
    setCalfRaise(selectedCalfRaise);
    localStorage.setItem("calfRaise", selectedCalfRaise);
  };

  return (
    <UserCreationWrapper prevLink={"/user-creation-part-three"} nextLink={"/user-creation-part-five"} questionNumber={4}>
      <UserCreationQuestion question={"What are some of your gym stats?"}>
        <div className={styles.gymStatsContainer}>
          <GymStats
            benchPress={benchPress}
            setBenchPress={handleBenchPressSelect}
            squat={squat}
            setSquat={handleSquatSelect}
            mileTime={mileTime}
            setMileTime={handleMileTimeSelect}
            bicepsCurl={bicepsCurl}
            setBicepsCurl={handleBicepsCurlSelect}
            cleanMax={cleanMax}
            setCleanMax={handleCleanMaxSelect}
            calfRaise={calfRaise}
            setCalfRaise={handleCalfRaiseSelect}
            isPounds={isPounds}
            setIsPounds={setIsPounds}
          />
        </div>
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartFour;
