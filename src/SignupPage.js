import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./signupPage.module.scss";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password") {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <div className={styles.loginContainer}>
          <h1 className={styles.logoText}>LiftBuilder</h1>
          <div>
            <input
              type="name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <div>
            <input
              type="name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
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
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <div>
            Already have an account?{" "}
            <a className={styles.signupLink} href="/login">
              Login!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
