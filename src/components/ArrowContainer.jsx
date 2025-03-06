import ArrowRight from "./icons/ArrowRight.jsx";
import ArrowLeft from "./icons/ArrowLeft.jsx";
import CheckMark from "./icons/CheckMark.jsx";
import { useNavigate } from "react-router-dom";

import styles from "./arrowContainer.module.scss";

const ArrowContainer = ({
  questionNumber,
  nextLink,
  prevLink,
  isLastQuestion = false,
}) => {
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
        <ArrowLeft className={styles.icon} />
      </button>
      <span>Question {questionNumber}</span>
      <button onClick={handleNext} className={styles.button}>
        {isLastQuestion ? (
          <CheckMark className={styles.icon} />
        ) : (
          <ArrowRight className={styles.icon} />
        )}
      </button>
    </div>
  );
};

export default ArrowContainer;
