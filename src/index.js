import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UserCreationPartOne from "./UserCreationPartOne";
import UserCreationPartTwo from "./UserCreationPartTwo";
import UserCreationPartThree from "./UserCreationPartThree";
import UserCreationPartFour from "./UserCreationPartFour";
import UserCreationPartFive from "./pages/UserCreationPartFive";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
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
        <Route
          path="/user-creation-part-five"
          element={<UserCreationPartFive />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
