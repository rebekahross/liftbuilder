import { useNavigate } from "react-router-dom";
import ArrowButton from "./ArrowButton.jsx";

import styles from "./styles/arrowContainer.module.scss";

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
      <ArrowButton
        showButton={prevLink ? true : false}
        arrowDirection={"left"}
        onClick={handlePrev}
      />
      <span>Question {questionNumber}</span>
      <ArrowButton
        onClick={handleNext}
        arrowDirection={isLastQuestion ? "check" : "right"}
      />
    </div>
  );
};

export default ArrowContainer;
