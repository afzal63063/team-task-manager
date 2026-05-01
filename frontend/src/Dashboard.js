import React from "react";

function Dashboard() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>{role}</p>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;