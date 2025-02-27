import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UserCreationPartOne from "./UserCreationPartOne";
import UserCreationPartTwo from "./UserCreationPartTwo";
import UserCreationPartThree from "./UserCreationPartThree";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserCreationPartFour from "./UserCreationPartFour";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* TODO: Set this to the Home Component for logged in users once it's built */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/user-creation-part-one"
          element={<UserCreationPartOne />}
        />
        <Route
          path="/user-creation-part-two"
          element={<UserCreationPartTwo />}
        />
        <Route
          path="/user-creation-part-three"
          element={<UserCreationPartThree />}
        />
        <Route
          path="/user-creation-part-four"
          element={<UserCreationPartFour />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
