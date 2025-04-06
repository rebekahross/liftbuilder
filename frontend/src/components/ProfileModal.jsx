import styles from "./styles/profileModal.module.scss";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

export default function ProfileModal({ onExit }) {
  const navigate = useNavigate();
  // TODO: Set these variables from some auth state
  const isAuthenticated = false;
  const username = "jessicaDaCoolest";

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleCreateAccount = () => {
    navigate("/signup");
  };

  if (isAuthenticated) {
    return (
      <div className={styles.profileModalBox}>
        <h4>User: {username}</h4>
        <button className={styles.modalButton}>Edit Account</button>
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
