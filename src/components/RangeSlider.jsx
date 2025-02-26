import React from "react";

import styles from "./selectDropdown.module.scss";

const RangeSlider = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.sliderContainer}>
      <input type="range" min="0" max="10" />
    </div>
  );
};

export default RangeSlider;
