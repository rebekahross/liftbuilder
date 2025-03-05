import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./loginPage.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <div className={styles.loginContainer}>
          <h1 className={styles.logoText}>LiftBuilder</h1>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <div>
            Don't have an account?{" "}
            <a className={styles.signupLink} href="/signup">
              Sign up!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
