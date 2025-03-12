"use client";
import WorkoutCard from "../components/WorkoutCard";
import RestTimerModal from "../components/RestTimerModal";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles/workoutPage.module.scss";
import formatElapsedTimeString from "../components/utilities/formatElapsedTimeString";
import formatCurrentDayTimeString from "../components/utilities/formatCurrentDayTimeString";


export default function WorkoutPage() {
  const [currentDateString, setCurrentDateString] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(true);
  const [workoutSets, setWorkoutSets] = useState([]);
  const [removingIndices, setRemovingIndices] = useState([]);
  const [restTimerTime, setRestTimerTime] = useState(0);

  const navigate = useNavigate()

  const handleRegenerate = () => {
    navigate('/loadingWorkout')
  }

  const handleRest = (restTime) => {
    setRestTimerTime(restTime)
  }

  useEffect(() => {
    setCurrentDateString(formatCurrentDayTimeString());

    // TODO: Dynamically wire these up

    setWorkoutSets([
      {
        title: "Treadmill Warm-Up",
        initRestTime: 0,
        fields: ["Time", "Distance Traveled"],
        sets: [
          {
            setComplete: false,
            prev: "15:00 x 1.2 miles",
            field1: "15:00",
            field2: "1.5 miles",
          },
        ],
      },
      {
        title: "Romanian Deadlifts (RDL)",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "12",
            field2: "105 Lbs",
          },
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "10",
            field2: "105 Lbs",
          },
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "10",
            field2: "105 Lbs",
          },
          {
            setComplete: false,
            prev: "12 x 95 Lbs",
            field1: "10",
            field2: "105 Lbs",
          },
        ],
      },
      {
        title: "Calf Raises",
        initRestTime: 1,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "20 x Bodyweight",
            field1: "20",
            field2: "Bodyweight + 25 Lbs",
          },
          {
            setComplete: false,
            prev: "20 x Bodyweight",
            field1: "18",
            field2: "Bodyweight + 25 Lbs",
          },
          {
            setComplete: false,
            prev: "20 x Bodyweight",
            field1: "18",
            field2: "Bodyweight + 25 Lbs",
          },
        ],
      },
      {
        title: "Barbell Squats",
        initRestTime: 2,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "10",
            field2: "155 Lbs",
          },
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "8",
            field2: "155 Lbs",
          },
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "8",
            field2: "155 Lbs",
          },
          {
            setComplete: false,
            prev: "10 x 135 Lbs",
            field1: "8",
            field2: "155 Lbs",
          },
        ],
      },
      {
        title: "Elliptical Machine",
        initRestTime: 0,
        fields: ["Time", "Distance Traveled"],
        sets: [
          {
            setComplete: false,
            prev: "15:00 x 1.5 miles",
            field1: "15:00",
            field2: "1.8 miles",
          },
        ],
      },
      {
        title: "Hip Abductor Extensions",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "15 x 70 Lbs",
            field1: "15",
            field2: "75 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 70 Lbs",
            field1: "12",
            field2: "75 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 70 Lbs",
            field1: "12",
            field2: "75 Lbs",
          },
        ],
      },
      {
        title: "Wall Sits",
        initRestTime: 1.5,
        fields: ["Time"],
        sets: [
          {
            setComplete: false,
            prev: "0:45",
            field1: "1:00",
          },
          {
            setComplete: false,
            prev: "0:45",
            field1: "0:50",
          },
        ],
      },
      {
        title: "Hip Adductor Extensions",
        initRestTime: 1.5,
        fields: ["Reps", "Weight"],
        sets: [
          {
            setComplete: false,
            prev: "15 x 60 Lbs",
            field1: "15",
            field2: "65 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 60 Lbs",
            field1: "12",
            field2: "65 Lbs",
          },
          {
            setComplete: false,
            prev: "15 x 60 Lbs",
            field1: "12",
            field2: "65 Lbs",
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    let interval;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  return (
    <div className={styles.mainDiv}>
      <NavBar />
      {(restTimerTime != 0) && (<RestTimerModal startTime={restTimerTime} onExit={() => {setRestTimerTime(0)}}/>)}
      <div className={styles.overviewPanel}>
        <h1>{currentDateString} Workout Plan</h1>
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
          <button className={styles.regenerateButton} onClick={() => handleRegenerate()}>Regenerate</button>
        </div>
      </div>
      <hr />
      <div className={styles.totalDurationPanel}>
        <div className={styles.basicFlex}>
          <h3 className={styles.durationTitle}>Workout Duration</h3>
          {!isWorkoutActive && elapsedTime === 0 && (
            <button
              className={styles.pauseButton}
              onClick={() => setIsWorkoutActive(true)}
            >
              Start Workout
            </button>
          )}
          {isWorkoutActive && (
            <button
              className={styles.pauseButton}
              onClick={() => setIsWorkoutActive(false)}
            >
              Pause
            </button>
          )}
          {!isWorkoutActive && elapsedTime > 0 && (
            <>
              <button
                className={styles.pauseButton}
                onClick={() => setIsWorkoutActive(true)}
              >
                Resume
              </button>
              <button className={styles.pauseButton} onClick={() => setElapsedTime(0)}>
                Reset
              </button>
            </>
          )}
        </div>
        <a className={styles.workoutTime}>{formatElapsedTimeString(elapsedTime)}</a>
      </div>
      {workoutSets.map((item, index) => {
        const isRemoving = removingIndices.includes(index);
        return (
          <div
            key={`${item.title}${index}`}
            className={`${styles.workoutCardContainer} ${
              isRemoving ? styles.removing : ""
            }`}
          >
            <WorkoutCard
              setData={item}
              onRemove={(e) => {
                // First mark this index as removing (for animation)
                setRemovingIndices((prev) => [...prev, index]);

                // Then actually remove it after the animation completes
                setTimeout(() => {
                  setWorkoutSets((previous) => previous.filter((_, i) => i !== index));
                  setRemovingIndices((prev) => prev.filter((i) => i !== index));
                }, 500);
              }}
              onSubmitRest={(restTime) => handleRest(restTime)}
            />
          </div>
        );
      })}
      <div className={styles.bottomButtons}>
        <button className={styles.addWorkoutButton}>+ Add New Workout</button>
        <button
          className={styles.finishButton}
          onClick={() => {
            setIsWorkoutActive(false);
            // Add any other finish workout logic here
            navigate('/')
          }}
        >
          Finish Workout
        </button>
      </div>
    </div>
  );
}
