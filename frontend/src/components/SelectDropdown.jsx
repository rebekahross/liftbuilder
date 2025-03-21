import React from "react";

import styles from "./styles/selectDropdown.module.scss";

const SelectDropdown = ({ placeholder, label, options, value, onChange }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}
      <select className={styles.selector} value={value} onChange={onChange}>
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
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
