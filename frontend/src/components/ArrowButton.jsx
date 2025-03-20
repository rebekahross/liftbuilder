import ArrowRight from "../icons/ArrowRight.jsx";
import ArrowLeft from "../icons/ArrowLeft.jsx";
import CheckMark from "../icons/CheckMark.jsx";

import styles from "./styles/arrowButton.module.scss";

const ArrowButton = ({ onClick, arrowDirection, showButton = true }) => {
  return (
    <button
      onClick={onClick}
      className={`${showButton ? styles.button : styles.noPrev}`}
    >
      {arrowDirection === "right" ? (
        <ArrowRight className={styles.icon} />
      ) : arrowDirection === "left" ? (
        <ArrowLeft className={styles.icon} />
      ) : (
        <CheckMark className={styles.icon} />
      )}
    </button>
  );
};

export default ArrowButton;
