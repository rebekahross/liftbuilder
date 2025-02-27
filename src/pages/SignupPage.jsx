import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./styles/signupPage.module.scss";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      firstName === "firstName" &&
      lastName === "lastName" &&
      email === "admin@example.com" &&
      password === "password" &&
      confirmPassword === "password"
    ) {
      navigate("/user-creation-part-one");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup} className={styles.formWrapper}>
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
