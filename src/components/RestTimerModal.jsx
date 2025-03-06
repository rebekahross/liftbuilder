import React, { useState, useEffect } from "react";

import styles from "./styles/restTimerModal.module.scss";
import Timer from "./icons/Timer";

const RestTimerModal = ({ startTime, onExit }) => {
  const [timeRemaining, setTimeRemaining] = useState(startTime * 60);
  const [printedTime, setPrintedTime] = useState("");
  const [minimalMode, setMinimalMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevElapsedTime) => prevElapsedTime - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onExit();
    }

    setPrintedTime(formatTime());
  }, [timeRemaining]);

  const formatTime = () => {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
    } else if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${seconds} sec`;
    }
  };

  const add15 = () => {
    setTimeRemaining(timeRemaining + 15);
  };

  const sub15 = () => {
    setTimeRemaining(timeRemaining - 15);
  };

  return (
    <div>
      {minimalMode ? (
        <div className={styles.minimalContainer} onClick={() => setMinimalMode(!minimalMode)}>
          <Timer />
          <p>{printedTime}</p>
        </div>
      ) : (
        <div className={styles.openContainer}>
          <div className={styles.header}>
            <h2>Rest Timer</h2>
            <button onClick={() => setMinimalMode(!minimalMode)}>X</button>
          </div>
          <div className={styles.mainBody}>
            <div className={styles.clock}>
              <h1>{printedTime}</h1>
              <p>Remaining</p>
            </div>
            <div className={styles.buttonsContainer}>
              <button onClick={add15}>+ 15 Seconds</button>
              <button onClick={sub15}>- 15 Seconds</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestTimerModal;
