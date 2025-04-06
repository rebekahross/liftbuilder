import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

import styles from "./styles/homePage.module.scss";

export default function HomePage({}) {
  const navigate = useNavigate();
  const isAuthenticated = true;

  const handleBuildLift = () => {
    navigate("/pre-workout");
  };

  const userFirstName = "Rebekah";

  return (
    <div className={styles.mainPage}>
      <NavBar />
      <div className={styles.mainContainer}>
        <h1>{isAuthenticated ? `Hello ${userFirstName}!` : "Welcome To LiftBuilder!"}</h1>
        <h4>What would you like to do?</h4>
        <div className={styles.buttonsContainer}>
          <button className={styles.bigBadButton} onClick={() => handleBuildLift()}>
            Build a Lift
          </button>
          {isAuthenticated ? (
            <div>
              <button className={styles.smallerButton} onClick={() => navigate("/workout-history")}>
                See Workout History
              </button>
              <button className={styles.smallerButton} onClick={() => navigate("/manage-profile")}>
                Edit My Profile
              </button>
            </div>
          ) : (
            <button className={styles.smallerButton} onClick={() => navigate("/signup")}>
              {" "}
              Create An Account{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
