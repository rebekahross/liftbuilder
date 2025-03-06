import React, { useState } from "react";
import ToggleSwitch from "../components/ToggleSwitch";
import UserCreationWrapper from "../components/UserCreationWrapper";
import UserCreationQuestion from "../components/UserCreationQuestion";
import InputField from "../components/InputField";

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
        <div className={styles.gymStats}>
          <InputField
            label={"Bench press 1RM"}
            value={benchPress}
            setValue={setBenchPress}
            type={"number"}
          />
          <InputField
            label={"Back squat 1RM"}
            value={squat}
            setValue={setSquat}
            type={"number"}
          />
          <InputField
            label={"Mile time"}
            value={mileTime}
            setValue={setMileTime}
            type={"text"}
            placeholder={"MM:SS.sss"}
          />
          <InputField
            label={"1-arm bicep curl 1RM"}
            value={bicepsCurl}
            setValue={setBicepsCurl}
            type={"number"}
          />
          <InputField
            label={"Power clean 1RM"}
            value={cleanMax}
            setValue={setCleanMax}
            type={"number"}
          />
          <InputField
            label={"Calf raise 1RM"}
            value={calfRaise}
            setValue={setCalfRaise}
            type={"number"}
          />
        </div>
        <ToggleSwitch
          isToggled={isPounds}
          setIsToggled={setIsPounds}
          leftText={"Kilograms"}
          rightText={"Pounds"}
        />
      </UserCreationQuestion>
    </UserCreationWrapper>
  );
};

export default UserCreationPartFour;
