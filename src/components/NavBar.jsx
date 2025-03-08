import styles from "./styles/navBar.module.scss";
import Profile from "./icons/Profile";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleHomeButton = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const handleProfileButton = (e) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <div className={styles.navBarMain}>
      <button className={styles.navTitle} onClick={(e) => handleHomeButton(e)}>
        LiftBuilder
      </button>
      <button className={styles.profileButton} onClick={(e) => handleProfileButton(e)}>
        <Profile height="2rem" width="2rem" />
      </button>
    </div>
  );
}
