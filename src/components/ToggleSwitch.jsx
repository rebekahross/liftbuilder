import styles from "./styles/toggleSwitch.module.scss";

const ToggleSwitch = ({ isToggled, setIsToggled, leftText, rightText }) => {
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={styles.toggleContainer}>
      {leftText && <div className={styles.toggleText}>{leftText}</div>}
      <label className={styles.switch}>
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className={styles.slider}></span>
      </label>
      {rightText && <div className={styles.toggleText}>{rightText}</div>}
    </div>
  );
};

export default ToggleSwitch;
