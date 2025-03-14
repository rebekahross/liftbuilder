import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ArrowLeft from "../icons/ArrowLeft";
import WorkoutHistoryCard from "../components/WorkoutHistoryCard";

import styles from "./styles/workoutHistory.module.scss";

export default function WorkoutHistory({}) {
  const [historyData, setHistoryData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = {
      title: "Saturday Morning Workout",
      date: "Mar 8, 2025",
      yield: "42000 Lbs",
      durationSeconds: 3750,
      difficultyPercentage: 75,
      setData: [
        {
          title: "Treadmill Warm-Up",
          fields: ["Time", "Distance Traveled"],
          sets: [
            {
              field1: "15:00",
              field2: "1.5 miles",
            },
          ],
        },
        {
          title: "Romanian Deadlifts (RDL)",
          fields: ["Reps", "Weight"],
          sets: [
            {
              field1: "12",
              field2: "105 Lbs",
            },
            {
              field1: "10",
              field2: "105 Lbs",
            },
            {
              field1: "10",
              field2: "105 Lbs",
            },
            {
              field1: "10",
              field2: "105 Lbs",
            },
          ],
        },
        {
          title: "Calf Raises",
          fields: ["Reps", "Weight"],
          sets: [
            {
              field1: "20",
              field2: "Bodyweight + 25 Lbs",
            },
            {
              field1: "18",
              field2: "Bodyweight + 25 Lbs",
            },
            {
              field1: "18",
              field2: "Bodyweight + 25 Lbs",
            },
          ],
        },
        {
          title: "Barbell Squats",
          fields: ["Reps", "Weight"],
          sets: [
            {
              field1: "10",
              field2: "155 Lbs",
            },
            {
              field1: "8",
              field2: "155 Lbs",
            },
            {
              field1: "8",
              field2: "155 Lbs",
            },
            {
              field1: "8",
              field2: "155 Lbs",
            },
          ],
        },
        {
          title: "Elliptical Machine",
          fields: ["Time", "Distance Traveled"],
          sets: [
            {
              field1: "15:00",
              field2: "1.8 miles",
            },
          ],
        },
        {
          title: "Hip Abductor Extensions",
          fields: ["Reps", "Weight"],
          sets: [
            {
              field1: "15",
              field2: "75 Lbs",
            },
            {
              field1: "12",
              field2: "75 Lbs",
            },
            {
              field1: "12",
              field2: "75 Lbs",
            },
          ],
        },
        {
          title: "Wall Sits",
          fields: ["Time"],
          sets: [
            {
              field1: "1:00",
            },
            {
              field1: "0:50",
            },
          ],
        },
        {
          title: "Hip Adductor Extensions",
          fields: ["Reps", "Weight"],
          sets: [
            {
              field1: "15",
              field2: "65 Lbs",
            },
            {
              field1: "12",
              field2: "65 Lbs",
            },
            {
              field1: "12",
              field2: "65 Lbs",
            },
          ],
        },
      ],
    };

    setHistoryData([dummyData]);
  }, []);

  return (
    <div className={styles.mainDiv}>
      <NavBar />

      <div className={styles.mainInnerBox}>
        <div className={styles.boxHeader}>
          <button className={styles.backButton} onClick={() => navigate("/")}>
            <ArrowLeft />
          </button>
          <h1>My Workout History</h1>
        </div>
        <div className={styles.workoutHistoryCards}>
          {historyData.map((card) => {
            return <WorkoutHistoryCard key={card.id} workoutData={card} />;
          })}

          {(historyData.length == 0) && <h3>Nothing Here Yet, Go Build a Workout!</h3>}
        </div>
      </div>
    </div>
  );
}
