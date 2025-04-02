import React, { useEffect } from "react";
import SubmitButton from "../components/SubmitButton";

import styles from "./styles/userCreationComplete.module.scss";

const UserCreationComplete = ({}) => {
  // Function to be called when the page loads

  //In StrictMode React, the handlePageLoad function is sometimes called twice. This prevents that.
  let hasRun = false;

  const handlePageLoad = async () => {
    if (hasRun) {
      return;
    }
    hasRun = true;
    try {
      const token = localStorage.getItem("authToken");
      const gender = localStorage.getItem("gender");
      const height = localStorage.getItem("height");
      const weight = localStorage.getItem("weight");
      const fitnessLevel = localStorage.getItem("fitnessLevel");
      const benchPress = localStorage.getItem("benchPress");
      const squat = localStorage.getItem("squat");
      const mileTime = localStorage.getItem("mileTime");
      const bicepsCurl = localStorage.getItem("bicepsCurl");
      const cleanMax = localStorage.getItem("cleanMax");
      const calfRaise = localStorage.getItem("calfRaise");
      const goals = localStorage.getItem("goals");

      const response = await fetch("http://localhost:5001/api/profile/metrics", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          height: height,
          weight: weight,
          sex: gender,
          fitness_level: fitnessLevel,
          bench_max: benchPress,
          squat_max: squat,
          mile_time: mileTime,
          bicep_curl_max: bicepsCurl,
          power_clean_max: cleanMax,
          calf_raise_max: calfRaise,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  // useEffect to call the function on page load
  useEffect(() => {
    handlePageLoad();
  }, []); // Empty dependency array means this effect runs only once, when the page loads

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.bodyContainer}>
          <h1 className={styles.headerText}>Thank you!</h1>
          <div className={styles.subtitleText}>Now that we've gotten to know you, let's build you some lifts!</div>
          <SubmitButton href={"/"} text={"Let's go!"} />
          <a className={styles.link} href={"/user-creation-part-one"}>
            Back to questions
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCreationComplete;
