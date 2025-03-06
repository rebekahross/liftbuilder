import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UserCreationPartOne from "./UserCreationPartOne";
import UserCreationPartTwo from "./UserCreationPartTwo";
import UserCreationPartThree from "./UserCreationPartThree";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserCreationPartFour from "./UserCreationPartFour";
import UserCreationPartFive from "./UserCreationPartFive";
import UserCreationComplete from "./UserCreationComplete";

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
        <Route
          path="/user-creation-complete"
          element={<UserCreationComplete />}
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
