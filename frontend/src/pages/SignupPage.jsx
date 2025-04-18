import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";

import styles from "./styles/signupPage.module.scss";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data?.user.user.id != null) {
        localStorage.setItem('user', JSON.stringify(data.user.user.user_metadata))
        localStorage.setItem("authToken", data.user.session.access_token);
      }

      if (response.ok) {
        navigate("/user-creation-part-one");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup} className={styles.formWrapper}>
        <div className={styles.loginContainer}>
          <h1 className={styles.logoText}>LiftBuilder</h1>

          <div className={styles.inputField}>
            <InputField label={"First Name"} type={"text"} value={firstName} setValue={setFirstName} />
            <InputField label={"Last Name"} type={"text"} value={lastName} setValue={setLastName} />
            <InputField label={"Email"} type={"email"} value={email} setValue={setEmail} />
            <InputField label={"Password"} type={"password"} value={password} setValue={setPassword} />
            <InputField label={"Confirm Password"} type={"password"} value={confirmPassword} setValue={setConfirmPassword} />
          </div>
          <SubmitButton text={"Submit"} />
          <div>
            Already have an account? <a href="/login">Login!</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
