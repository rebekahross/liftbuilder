import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import styles from "./styles/homePage.module.scss";

export default function HomePage({ userFirstName }) {
  const navigate = useNavigate();

  const handleBuildLift = () => {
    console.log("sign of life");
    navigate("/loading-workout");
  };

  return (
    <div className={styles.mainPage}>
      <NavBar />
      <div className={styles.mainContainer}>
        <h1>Hello Rebekah!</h1>
        <h4>What would you like to do?</h4>
        <button
          className={styles.bigBadButton}
          onClick={() => handleBuildLift()}
        >
          Build a Lift
        </button>
        <button className={styles.smallerButton} onClick={() => navigate('/workout-history')}>See Workout History</button>
        <button className={styles.smallerButton}>Edit My Profile</button>
      </div>
    </div>
  );
}
