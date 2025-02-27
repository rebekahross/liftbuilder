import { restTimeOptions } from "../models/dropdownOptions";
import SelectDropdown from "./SelectDropdown";
import RangeSlider from "./RangeSlider";
import GreenCheck from "./icons/GreenCheck";
import ThreeDots from "./icons/ThreeDots";
import { useState } from "react";

import styles from "./styles/workoutCard.module.scss";

export default function WorkoutCard({ setData }) {
  const [restTime, setRestTime] = useState(setData.initRestTime);
  const [setCompletion, setSetCompletion] = useState(setData.sets.map(s => s.setComplete));

  const handleSetComplete = (setNum) => {
    setSetCompletion(prevCompletions => {
      const newList = [...prevCompletions];
      newList[setNum] = !newList[setNum];
      return newList
    })
  }
 
  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainSetsDiv}>
        <div className={styles.header}>
          <div className={styles.sideBySide}>
            <button className={styles.moreButton}><ThreeDots /></button>
            <h2>{setData.title}</h2>
          </div>
          <div className={styles.sideBySide}>
            <p>Rest Time</p>
            <SelectDropdown
              options={restTimeOptions}
              value={restTime}
              onChange={(e) => {
                setRestTime(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.setBody}>
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Previous Value</th>
                <th>{setData.fields[0]}</th>
                {setData.fields.length >= 2 && <th>{setData.fields[1]}</th>}
                {setData.fields.length >= 3 && <th>{setData.fields[2]}</th>}
              </tr>
            </thead>
            <tbody>
              {setData.sets.map((set, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button className={styles.setNumberButton} onClick={(e) => {handleSetComplete(index)}}>
                        {setCompletion[index] ? <GreenCheck /> : index + 1}
                      </button>
                    </td>
                    <td>{set.prev}</td>
                    <td>{set.field1}</td>
                    {setData.fields.length >= 2 && <td>{set.field2}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className={styles.addSetButton}>+ Add Set</button>
        </div>
      </div>
      <div className={styles.difficultyDiv}>
        <h4>Set Difficulty</h4>
        <RangeSlider leftLabel="Too Easy" rightLabel="Impossible/DNF" />
      </div>
    </div>
  );
}
