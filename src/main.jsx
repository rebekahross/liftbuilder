import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserCreationPartOne from "./pages/UserCreationPartOne";
import UserCreationPartTwo from "./pages/UserCreationPartTwo";
import UserCreationPartThree from "./pages/UserCreationPartThree";
import UserCreationPartFour from "./pages/UserCreationPartFour";
import UserCreationPartFive from "./pages/UserCreationPartFive";
import UserCreationComplete from "./pages/UserCreationComplete";
import WorkoutPage from "./pages/WorkoutPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* TODO: Set this to the Home Component for logged in users once it's built */}
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
        <Route
          path="/user-creation-complete"
          element={<UserCreationComplete />}
        />
        <Route path="/workout" element={<WorkoutPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
