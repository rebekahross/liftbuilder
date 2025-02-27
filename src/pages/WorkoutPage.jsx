import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./styles/workoutPage.module.scss";
import WorkoutCard from "../components/WorkoutCard";

export default function WorkoutPage() {
  const [currentTimeString, setCurrentTimeString] = useState("");
  const [workoutSets, setWorkoutSets] = useState([]);

  const generateCurrentTimeString = () => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentHourNumber = dayjs().hour();
    const currentDayNumber = dayjs().day();

    let timeOfDayString;
    switch (true) {
      case currentHourNumber < 6:
        timeOfDayString = "Night";
        break;
      case currentHourNumber < 12:
        timeOfDayString = "Morning";
        break;
      case currentHourNumber < 18:
        timeOfDayString = "Afternoon";
        break;
      default:
        timeOfDayString = "Evening";
        break;
    }

    setCurrentTimeString(`${weekdays[currentDayNumber]} ${timeOfDayString}`);
  };

  useEffect(() => {
    generateCurrentTimeString();

    // TODO: Dynamically wire these up

    setWorkoutSets([
      {
        title: "Treadmill",
        initRestTime: 0,
        fields: ["Time", "Distance Traveled"],
        sets: [
          {
            setComplete: false,
            prev: "15:00 x 1.5 miles",
            field1: "22:00",
            field2: "2.50 miles",
          },
        ],
      },
      {
        title: "RDL (Romainian Deadlift)",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: true,
            prev: "15 x 95 Lbs",
            field1: "15",
            field2: "100 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 95 Lbs",
            field1: "15",
            field2: "100 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 95 Lbs",
            field1: "15",
            field2: "100 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 95 Lbs",
            field1: "10",
            field2: "100 Lbs",
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.overviewPanel}>
        <h1>{currentTimeString} Workout Plan</h1>
        <p className={styles.llmResponse}>
          This is some base text to see how it all looks. TODO: fix this. Today's workout
          will be a combination of cardio work and strength training, with particular
          focus on your legs and hips. We'll start off with a 15-minute warm up on the
          treadmill, followed by some Romanian Deadlifts. From there we'll do some Calf
          Raises, then work the quad muscles with some Barbell Squats. Make sure you use a
          pad for your shoulders, and consider using a waist strap to keep your back
          straight. After the Squats, we'll do some work on the Elliptical Machine to
          lengthen your quads and mobilize your hips. We'll then do a compound set of Hip
          Abductor Extensions and Wall Sits, followed by our final set of Hip Adductor
          Extensions.{" "}
        </p>
        <h4>Would you like to adjust anything in this plan?</h4>
        <div className={styles.inputWithSubmitButton}>
          <textarea
            type="text"
            className={styles.mediumTextInput}
            placeholder="Add your comments here"
          />
          <button className={styles.regenerateButton}>Regenerate</button>
        </div>
      </div>
      <hr />
      <div className={styles.totalDurationPanel}>
        <div className={styles.basicFlex}>
          <h3 className={styles.durationTitle}>Workout Duration</h3>
          <button className={styles.pauseButton}>Pause</button>
        </div>
        <a className={styles.workoutTime}>1 Hour 5 Minutes 24 Seconds</a>
      </div>
      {workoutSets.map((item, index) => {
        return <WorkoutCard setData={item} key={`${index}`}/>;
      })}
      <div className={styles.bottomButtons}>
        <button className={styles.addWorkoutButton}>+ Add New Workout</button>
        <button className={styles.finishButton}>Finish Workout</button>
      </div>
    </div>
  );
}
