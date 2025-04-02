import React from "react";
import { Range } from "react-range";

import styles from "./styles/rangeSlider.module.scss";

const RangeSlider = ({ leftLabel, centerLabel, rightLabel, step = 25, isMutable = true, initialValue = 50, className = {}, onChange }) => {
  const [values, setValues] = React.useState([initialValue]);
  const handleChange = (newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange(newValues[0]);
    }
  };
  return (
    <div className={`${styles.sliderContainer} ${className}`}>
      <div className={styles.slider}>
        <Range
          label="Select your value"
          step={step}
          min={0}
          max={100}
          values={values}
          onChange={isMutable ? handleChange : () => {}}
          renderTrack={({ props, children }) => (
            <div {...props} className={styles.sliderLine}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => <div {...props} key={props.key} className={styles.sliderThumb} />}
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
