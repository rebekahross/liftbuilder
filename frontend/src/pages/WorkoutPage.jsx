"use client";
import WorkoutCard from "../components/WorkoutCard";
import RestTimerModal from "../components/RestTimerModal";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import formatElapsedTimeString from "../components/utilities/formatElapsedTimeString";
import LoadingPage from "./LoadingPage";

import styles from "./styles/workoutPage.module.scss";

export default function WorkoutPage() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(true);
  const [workoutSets, setWorkoutSets] = useState([]);
  const [removingIndices, setRemovingIndices] = useState([]);
  const [restTimerTime, setRestTimerTime] = useState(0);
  const [title, setTitle] = useState("Base Workout");
  const [workoutDescription, setWorkoutDescription] = useState();
  const [workoutLoading, setWorkoutLoading] = useState(false);
  const { id } = useParams();
  const jwtToken = localStorage.getItem("authToken");


  const navigate = useNavigate();

  const handleRegenerate = async () => {
    setWorkoutLoading(true);

    // TODO: actually send this off to the backend for the llm to generate an update to the existing workout id...
    const timer = ms => new Promise(res => setTimeout(res, ms));
    await timer(2000);

    loadWorkoutData();

    setWorkoutLoading(false);
  };

  const handleRest = (restTime) => {
    setRestTimerTime(restTime);
  };

  const handleFinishWorkout = () => {
    setIsWorkoutActive(false);
    
    fetch(`http://localhost:5001/api/workouts/${id}/complete`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }).then(response => {
      if (response.ok) {
        navigate('/');
      } else {
        response.text().then(text => {
          console.log(text);
        })
      }
    })
  }

  const loadWorkoutData = () => {
    if (id != null) {
      fetch(`http://localhost:5001/api/workouts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setTitle(data.title);
            setWorkoutDescription(data.description);
            setWorkoutSets(data.setData);
          });
        } else {
          response.text().then((data) => setWorkoutDescription(data));
        }
      });
    } else {
      const dummyData = [
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
      ];
      setTitle('Testing Workout')
      setWorkoutDescription("This is in testing mode...");
      setWorkoutSets(dummyData);
    }
  }

  useEffect(() => {
    loadWorkoutData();
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
    <div>
      {workoutLoading ? (
        <LoadingPage />
      ) : (
        <div className={styles.mainDiv}>
          <NavBar />
          {restTimerTime != 0 && (
            <RestTimerModal
              startTime={restTimerTime}
              onExit={() => {
                setRestTimerTime(0);
              }}
            />
          )}
          <div className={styles.overviewPanel}>
            <h1>{title}</h1>
            <p className={styles.llmResponse}>{workoutDescription}</p>
            <h4>Would you like to adjust anything in this plan?</h4>
            <div className={styles.inputWithSubmitButton}>
              <textarea type="text" className={styles.mediumTextInput} placeholder="Add your comments here" />
              <button className={styles.regenerateButton} onClick={() => handleRegenerate()}>
                Regenerate
              </button>
            </div>
          </div>
          <hr />
          <div className={styles.totalDurationPanel}>
            <div className={styles.basicFlex}>
              <h3 className={styles.durationTitle}>Workout Duration</h3>
              {!isWorkoutActive && elapsedTime === 0 && (
                <button className={styles.pauseButton} onClick={() => setIsWorkoutActive(true)}>
                  Start Workout
                </button>
              )}
              {isWorkoutActive && (
                <button className={styles.pauseButton} onClick={() => setIsWorkoutActive(false)}>
                  Pause
                </button>
              )}
              {!isWorkoutActive && elapsedTime > 0 && (
                <>
                  <button className={styles.pauseButton} onClick={() => setIsWorkoutActive(true)}>
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
                className={`${styles.workoutCardContainer} ${isRemoving ? styles.removing : ""}`}
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
                handleFinishWorkout()
              }}
            >
              Finish Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
