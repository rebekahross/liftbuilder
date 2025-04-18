import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";

import styles from "./styles/loginPage.module.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("logging in");

    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("data", data);
    if (data?.user.user.id != null) {
      localStorage.setItem("authToken", data.user.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user.user.user_metadata));
    }

    if (response.ok) {
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <div className={styles.loginContainer}>
          <h1 className={styles.logoText}>LiftBuilder</h1>
          <div className={styles.inputField}>
            <InputField label={"Email"} type={"email"} value={email} setValue={setEmail} />
            <InputField label={"Password"} type={"password"} value={password} setValue={setPassword} />
          </div>
          <SubmitButton text={"Login"} />
          <div>
            Don't have an account? <a href="/signup">Sign up!</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
