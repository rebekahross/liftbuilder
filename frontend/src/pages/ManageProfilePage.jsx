import React, { useState } from "react";
import InputField from "../components/InputField";
import SelectDropdown from "../components/SelectDropdown";
import {
  heightOptions,
  weightOptions,
  genderOptions,
} from "../models/dropdownOptions";
import RangeSlider from "../components/RangeSlider";
import LargeInputBox from "../components/LargeInputBox";
import NavBar from "../components/NavBar";
import ArrowButton from "../components/ArrowButton";
import { useNavigate } from "react-router-dom";
import GymStats from "../components/GymStats";
import SubmitButton from "../components/SubmitButton";

import styles from "./styles/manageProfilePage.module.scss";

const ManageProfilePage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [textInput, setTextInput] = useState("");
  const [benchPress, setBenchPress] = useState();
  const [squat, setSquat] = useState();
  const [mileTime, setMileTime] = useState();
  const [bicepsCurl, setBicepsCurl] = useState();
  const [cleanMax, setCleanMax] = useState();
  const [calfRaise, setCalfRaise] = useState();
  const [isPounds, setIsPounds] = useState(true);

  const navigate = useNavigate();

  const handlePrev = (e) => {
    e.preventDefault();
    console.log("hello");
    navigate("/");
  };

  return (
    <div className={styles.contentWrapper}>
      <NavBar />
      <div className={styles.contentContainer}>
        <div className={styles.bodyContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.arrowContainer}>
              <ArrowButton arrowDirection={"left"} onClick={handlePrev} />
            </div>
            <h1 className={styles.headerText}>Edit My Profile</h1>
          </div>
          <div className={styles.profileInfoLabelSection}>Profile Info</div>
          <div className={styles.manageProfileColumns}>
            <InputField
              label={"Email"}
              value={username}
              setValue={setUsername}
              type={"text"}
            />
            <InputField
              label={"Password"}
              value={password}
              setValue={setPassword}
              type={"password"}
            />
            <InputField
              label={"First Name"}
              value={firstName}
              setValue={setFirstName}
              type={"text"}
            />
            <InputField
              label={"Last Name"}
              value={lastName}
              setValue={setLastName}
              type={"text"}
            />
          </div>
          <div className={styles.contactBodyInfo}>
            <SelectDropdown
              label={"Biological gender"}
              options={genderOptions}
              value={gender}
              setValue={setGender}
              placeholder={"Select Gender"}
            />
            <SelectDropdown
              label={"Height"}
              options={heightOptions}
              value={height}
              setValue={setHeight}
              placeholder={"Select Height"}
            />
            <SelectDropdown
              label={"Weight"}
              options={weightOptions}
              value={weight}
              setValue={setWeight}
              placeholder={"Select Weight"}
            />
          </div>
          <div className={styles.profileInfoLabelSection}>Fitness Goals</div>
          <div className={styles.rangeSliderContainer}>
            <RangeSlider
              leftLabel={"Ultra beginner"}
              centerLabel={"Fitness enthusiast"}
              rightLabel={"Pro athlete"}
            />
          </div>
          <div className={styles.fitnessGoals}>
            <LargeInputBox
              value={textInput}
              setValue={setTextInput}
              subtitle={
                "Be as descriptive as you can so we can tailor your workouts to your needs. For example, are you training for strength, endurance, hypertrophy, or a combination of these?"
              }
            />
          </div>
          <div className={styles.profileInfoLabelSection}>Gym Stats</div>
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
          <div className={styles.saveButtonContainer}>
            <button className={styles.cancelButton} type={"reset"}>
              Cancel
            </button>
            <SubmitButton type={"submit"} text={"Save changes"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfilePage;
