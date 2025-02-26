import React from "react";

import styles from "./selectDropdown.module.scss";

const SelectDropdown = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label>{label}</label>}
      <select className={styles.selector} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
