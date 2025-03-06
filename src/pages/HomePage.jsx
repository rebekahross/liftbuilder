import NavBar from "../components/NavBar";
import styles from "./styles/homePage.module.scss";
import { useNavigate } from "react-router-dom";


export default function HomePage ({ userFirstName }) {
  const navigate = useNavigate();

  const handleBuildLift = () => {
    console.log('sign of life')
    navigate('/loadingWorkout')
  }

  return (
    <div className={styles.mainPage}>
      <NavBar />
      <div className={styles.mainContainer}>
        <h1>Hello Rebekah!</h1>
        <h4>What would you like to do?</h4>
        <button className={styles.bigBadButton} onClick={() => handleBuildLift()}>Build a Lift</button>
        <button className={styles.smallerButton}>See Workout History</button>
        <button className={styles.smallerButton}>Edit My Profile</button>
      </div>
    </div>
  )
}