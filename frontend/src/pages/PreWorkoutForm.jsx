import { useState } from "react";
import ArrowLeft from "../icons/ArrowLeft";
import LoadingPage from "./LoadingPage";
import NavBar from "../components/NavBar";
import SelectDropdown from "../components/SelectDropdown";

import reusedStyles from "./styles/workoutHistory.module.scss";
import styles from "./styles/preWorkoutForm.module.scss";
import { workoutTimeOptionsList } from "../models/dropdownOptions";
import { useNavigate } from "react-router-dom";

export default function PreWorkoutForm({ startLoading }) {
  const navigate = useNavigate();

  const [workoutLoading, setWorkoutLoading] = useState(startLoading ?? false);
  const [workOnToday, setWorkOnToday] = useState('');
  const [avoid, setAvoid] = useState('');
  const [workoutTime, setWorkoutTime] = useState(1); // NOTE: this will return in hours, so 30 minutes = 0.5

  const submitWorkout = async () => {
    setWorkoutLoading(true);

    const jwt = localStorage.getItem('authToken');

    // TODO: Call an endpoint that will generate a new workout given the parameters workOnToday and avoid

    const result = await fetch('http://localhost:5001/api/workouts/active', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })

    if (result.ok) {
      const bodyJson = await result.json();
      if (bodyJson?.id) {
        navigate(`/workout/${bodyJson.id}`)
      }
    } else {
      const body = await result.text();
      console.log(body)
    }

  }

  return (
    <div>
      <NavBar />
      {workoutLoading ? (
        <LoadingPage />
      ) : (
        <div className={reusedStyles.mainDiv}>
          <div className={`${reusedStyles.mainInnerBox} ${styles.extraInnerBox}`}>
            <div className={reusedStyles.boxHeader}>
              <button className={reusedStyles.backButton} onClick={() => navigate("/")}>
                <ArrowLeft />
              </button>
              <h1>Let's Get Building!</h1>
            </div>
            <form className={styles.preWorkoutForm}>
              <label>
                <h2>What would you like to work on today?</h2>
                <textarea className={styles.inputBox} value={workOnToday} onChange={(event) => setWorkOnToday(event.target.value)}></textarea>
              </label>

              <label>
                <h2>Would you like to avoid any muscle groups or movements?</h2>
                <textarea className={styles.inputBox} value={avoid} onChange={(event) => setAvoid(event.target.value)}></textarea>
              </label>

              <label>
                <h2>How long would you like your workout to be?</h2>
                <SelectDropdown options={workoutTimeOptionsList} value={workoutTime} onChange={(event) => {setWorkoutTime(event.target.value)}}/>
              </label>

              <button
                className={styles.bigButton}
                onClick={() => {
                  submitWorkout()
                }}
              >
                Let's Go!
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
