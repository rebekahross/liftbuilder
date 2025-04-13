import { useEffect } from 'react';
import styles from "./styles/loadingPage.module.scss";
import NavBar from '../components/NavBar';

export default function LoadingPage() {
  useEffect(() => {
    console.log('Starting workout generation');
  }, []);

  return (
    <div className={styles.mainPage}>
      <NavBar />
      <div className={styles.mainContainer}>
        <h1>Generating Workout</h1>
        <h4>Please Wait</h4>
        
        <div className={styles.spinner}>
          <div className={styles.spinnerDot}></div>
          <div className={styles.spinnerDot}></div>
          <div className={styles.spinnerDot}></div>
        </div>
      </div>
    </div>
  )
}