import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserCreationPartOne from "./pages/UserCreationPartOne";
import UserCreationPartTwo from "./pages/UserCreationPartTwo";
import UserCreationPartThree from "./pages/UserCreationPartThree";
import UserCreationPartFour from "./pages/UserCreationPartFour";
import UserCreationPartFive from "./pages/UserCreationPartFive";
import UserCreationComplete from "./pages/UserCreationComplete";
import WorkoutPage from "./pages/WorkoutPage";
import ManageProfilePage from "./pages/ManageProfilePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import WorkoutHistory from "./pages/WorkoutHistory";
import PreWorkoutForm from "./pages/PreWorkoutForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/pre-workout" element={<PreWorkoutForm />} />
        <Route path="/workout/:id" element={<WorkoutPage />} />
        <Route path="/workout-history" element={<WorkoutHistory />} />
        <Route path="/manage-profile" element={<ManageProfilePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
