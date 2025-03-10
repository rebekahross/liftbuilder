import React from "react";
import { Range } from "react-range";

import styles from "./styles/rangeSlider.module.scss";

const RangeSlider = ({ leftLabel, centerLabel, rightLabel, step = 25 }) => {
  const [values, setValues] = React.useState([50]);
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <Range
          label="Select your value"
          step={step}
          min={0}
          max={100}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div {...props} className={styles.sliderLine}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} key={props.key} className={styles.sliderThumb} />
          )}
        />
      </div>
      <div className={styles.sliderLabels}>
        <div>{leftLabel}</div>
        <div>{centerLabel}</div>
        <div>{rightLabel}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
