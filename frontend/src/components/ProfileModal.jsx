import styles from "./styles/profileModal.module.scss";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

export default function ProfileModal({ onExit }) {
  const navigate = useNavigate();

  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  let username;
  let isAuthenticated = false;
  if (userData?.sub != null) {
    isAuthenticated = true;
    username = userData.email ?? "";
  }

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleCreateAccount = () => {
    navigate("/signup");
  };
  const handleEditAccount = () => {
    navigate("/manage-profile");
  };
  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    onExit();
    navigate('/');
  }

  if (isAuthenticated) {
    return (
      <div className={styles.profileModalBox}>
        {username && <h4>User: {username}</h4>}
        <button className={styles.modalButton} onClick={() => handleEditAccount()}>
          Edit Account
        </button>
        <button className={styles.modalButton} onClick={() => handleSignOut()}>
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <motion.div
        className={styles.outsideDiv}
        onClick={() => onExit()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={styles.profileModalBox}>
          <button className={styles.modalButton} onClick={() => handleSignIn()}>
            Sign In
          </button>
          <button className={styles.modalButton} onClick={() => handleCreateAccount()}>
            Create An Account
          </button>
        </div>
      </motion.div>
    );
  }
}
