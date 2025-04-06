import styles from "./styles/navBar.module.scss";
import Profile from "../icons/Profile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

export default function NavBar() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleHomeButton = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const handleProfileButton = (e) => {
    e.preventDefault();

    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div className={styles.navBarMain}>
        <button className={styles.navTitle} onClick={(e) => handleHomeButton(e)}>
          LiftBuilder
        </button>
        <button className={styles.profileButton} onClick={(e) => handleProfileButton(e)}>
          <Profile height="2rem" width="2rem" />
        </button>
      </div>
      {modalOpen && (
          <ProfileModal
            onExit={() => {
              setModalOpen(!modalOpen);
            }}
          />
        )}
    </div>
  );
}
