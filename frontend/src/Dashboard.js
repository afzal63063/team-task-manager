import React, { useEffect, useState } from "react";
import API from "./api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const role = localStorage.getItem("role");

  // 🔄 Fetch all data
  const fetchAll = async () => {
    try {
      const p = await API.get("/projects");
      setProjects(p.data);

      const t = await API.get("/tasks");
      setTasks(t.data);

      const u = await API.get("/auth/users");
      setUsers(u.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ➕ Add Project
  const addProject = async () => {
    try {
      if (!projectName.trim()) return alert("Enter project name");

      await API.post("/projects", { name: projectName });

      setProjectName("");
      fetchAll();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error adding project");
    }
  };

  // ➕ Add Task
  const addTask = async () => {
    try {
      if (!title.trim()) return alert("Enter task");
      if (!selectedProject) return alert("Select project");
      if (!assignedTo) return alert("Assign user");

      await API.post("/tasks", {
        title,
        assignedTo,
        dueDate,
        project: selectedProject,
      });

      setTitle("");
      setAssignedTo("");
      setDueDate("");
      setSelectedProject("");

      fetchAll();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error adding task");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "30px",
        background: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginTop: "40px",
      }}
    >
      {/* LOGOUT */}
      <button
        onClick={logout}
        style={{
          float: "right",
          background: "red",
          color: "white",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>Team Task Manager</h1>

      {/* ADMIN ONLY */}
      {role === "Admin" && (
        <>
          <h3>Create Project</h3>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
          />
          <button onClick={addProject}>Add</button>
        </>
      )}

      {/* PROJECT LIST */}
      <h3>Projects</h3>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((p) => (
          <div key={p._id} style={{ marginBottom: "5px" }}>
            • {p.name}
          </div>
        ))
      )}

      {/* TASK CREATE */}
      <h3>Create Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <br /><br />

      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
      <br /><br />

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>
      <br /><br />

      <button onClick={addTask}>Add Task</button>

      {/* TASK LIST */}
      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((t) => (
          <div key={t._id} style={{ marginBottom: "5px" }}>
            • {t.title} - {t.status}
          </div>
        ))
      )}
    </div>
  );
}