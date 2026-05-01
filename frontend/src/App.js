import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const isAuth = localStorage.getItem("token");

  const wrapperStyle = {
    maxWidth: "600px",
    margin: "auto",
    padding: "30px",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginTop: "50px",
  };

  return (
    <Router>
      <div style={wrapperStyle}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;