import ArrowRight from "./icons/ArrowRight.jsx";
import ArrowLeft from "./icons/ArrowLeft.jsx";
import { useNavigate } from "react-router-dom";

import styles from "./arrowContainer.module.scss";

const ArrowContainer = ({ questionNumber, nextLink, prevLink }) => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate(nextLink);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    navigate(prevLink);
  };

  return (
    <div className={styles.nextContainer}>
      <button
        onClick={handlePrev}
        className={`${prevLink ? styles.button : styles.noPrev}`}
      >
        <ArrowLeft className={styles.arrow} />
      </button>
      <span>Question {questionNumber}</span>
      <button onClick={handleNext} className={styles.button}>
        <ArrowRight className={styles.arrow} />
      </button>
    </div>
  );
};

export default ArrowContainer;
