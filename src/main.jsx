import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserCreationPartOne from "./pages/UserCreationPartOne";
import UserCreationPartTwo from "./pages/UserCreationPartTwo";
import UserCreationPartThree from "./pages/UserCreationPartThree";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserCreationPartFour from "./pages/UserCreationPartFour";
import WorkoutPage from "./pages/WorkoutPage";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user-creation-part-one" element={<UserCreationPartOne />} />
        <Route path="/user-creation-part-two" element={<UserCreationPartTwo />} />
        <Route path="/user-creation-part-three" element={<UserCreationPartThree />} />
        <Route path="/user-creation-part-four" element={<UserCreationPartFour />} />

        <Route path="/loadingWorkout" element={<LoadingPage />} />
        <Route path="/workout" element={<WorkoutPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
