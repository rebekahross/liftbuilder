import InputField from "./InputField";
import ToggleSwitch from "./ToggleSwitch";

import styles from "./styles/gymStats.module.scss";

const GymStats = ({
  benchPress,
  setBenchPress,
  squat,
  setSquat,
  mileTime,
  setMileTime,
  bicepsCurl,
  setBicepsCurl,
  cleanMax,
  setCleanMax,
  calfRaise,
  setCalfRaise,
  isPounds,
  setIsPounds,
}) => {
  return (
    <div className={styles.gymStatsContainer}>
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
      <div className={styles.toggleContainer}>
        <ToggleSwitch
          isToggled={isPounds}
          setIsToggled={setIsPounds}
          leftText={"kg"}
          rightText={"lb"}
        />
      </div>
    </div>
  );
};

export default GymStats;
