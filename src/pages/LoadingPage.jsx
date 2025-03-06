import { useEffect } from 'react';
import styles from "./styles/loadingPage.module.scss";
import { useNavigate } from 'react-router-dom';

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Starting workout generation');
    
    // Simulate navigation after loading completes
    const timeoutId = setTimeout(() => {
      navigate('/workout');
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.mainPage}>
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