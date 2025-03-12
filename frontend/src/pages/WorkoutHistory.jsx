import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ArrowLeft from "../icons/ArrowLeft";
import WorkoutHistoryCard from "../components/WorkoutHistoryCard";

import styles from "./styles/workoutHistory.module.scss";

export default function WorkoutHistory ({ }) {
  const [historyData, setHistoryData] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    setHistoryData([{}, {}])
  }, [])

  return (
    <div className={styles.mainDiv}>
      <NavBar />
      
      <div className={styles.mainInnerBox}>
        <div className={styles.boxHeader}>
          <button className={styles.backButton} onClick={() => navigate('/')}><ArrowLeft /></button>
          <h1>My Workout History</h1>
        </div>
        <div className={styles.workoutHistoryCards}>
          {historyData.map((card) => {
            return <WorkoutHistoryCard />
          })}
        </div>
      </div>

    </div>
  )
}