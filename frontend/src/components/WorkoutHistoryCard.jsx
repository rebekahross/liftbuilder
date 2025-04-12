import Dumbbell from "../icons/Dumbbell";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import { useState } from "react";
import { motion } from "framer-motion";
import formatElapsedTimeString from "./utilities/formatElapsedTimeString";
import RangeSlider from "./RangeSlider";
import styles from "./styles/workoutHistoryCard.module.scss";
import Edit from "../icons/Edit";
import { useNavigate } from "react-router-dom";

export default function WorkoutHistoryCard({ workoutData }) {
  let [isOpened, setOpened] = useState(false);
  const navigate = useNavigate();

  // Potential Feature - add a difficulty slider to each of the workout entries

  // Computed Values
  // Schema I'm expecting =
  // { title: string, date: string, yield: string, durationSeconds: number, difficultyPercentage: number,
  // setData: [{ id: string, title: string, fields: [string], sets: [field1: string, field2?: string, field3?: string] }] }
  const workoutDurationString = formatElapsedTimeString(
    workoutData.durationSeconds
  );

  return (
    <div className={styles.cardOutline}>
      <div className={styles.mainCard} onClick={() => setOpened(!isOpened)}>
        <div className={styles.dumbbellIcon}>
          <Dumbbell height={"2rem"} width={"2rem"} />
        </div>
        <div className={styles.overviewContent}>
          <h2>{workoutData.title}</h2>
          <div className={styles.quickContent}>
            <p>📅 {workoutData.date}</p>
            <p>💪 {workoutData.yield}</p>
            <p>🕒 {workoutDurationString}</p>
          </div>
        </div>
        <div className={styles.dropdownIndicator}>
          <button className={styles.editButton} onClick={() => navigate(`/workout/${workoutData.id}`)}>
            <Edit />
          </button>
          {isOpened ? (
            <ArrowUp height={"3rem"} width={"3rem"} />
          ) : (
            <ArrowDown height={"3rem"} width={"3rem"} />
          )}
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpened ? "auto" : 0,
          opacity: isOpened ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={styles.detailsCard}
      >
        <h2>Average Difficulty</h2>
        <div className={styles.rangeSliderContainer}>
          <RangeSlider
            step={12.5}
            isMutable={false}
            initialValue={workoutData.difficultyPercentage}
            className={styles.difficultyRange}
          />
        </div>
        <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: "2rem" }}>Workouts</h2>
        <div className={styles.workoutsGrid}>
          {workoutData.setData.map((workout) => {
            return (
              <div className={styles.gridEntry}>
                <div className={styles.entryHeader}>
                  <h3>{workout.title}</h3>
                  <h6>{workout.sets.length > 1 ? `${workout.sets.length} Sets` : `1 Set`}</h6>
                </div>
                <table>
                  <thead>
                    <tr>
                      {workout.fields.map((field) => {
                        return <th>{field}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {workout.sets.map((set) => {
                      return (
                        <tr>
                          <td>{set.field1}</td>
                          {workout.fields.length > 1 && <td>{set.field2}</td>}
                          {workout.fields.length > 2 && <td>{set.field3}</td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
