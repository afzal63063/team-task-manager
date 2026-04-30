import React, { useEffect, useState, useCallback } from "react";
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

  // s FETCH DATA
  const fetchAll = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  //  ADD PROJECT
  const addProject = async () => {
  try {
    if (!projectName.trim()) {
      return alert("Enter project name");
    }

    const res = await API.post("/projects", {
      name: projectName,   // ⚠ must match backend
    });

    console.log("SUCCESS:", res.data);

    alert("Project added successfully");

    setProjectName("");
    fetchAll();

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    alert(err.response?.data?.message || "Error adding project");
  }
};

  //  ADD TASK
  const addTask = async () => {
    try {
      if (!title) return alert("Enter task");

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
      alert("Error adding task");
    }
  };

  //  UPDATE TASK STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchAll();
  };

  //  DELETE TASK
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchAll();
  };

  //  DELETE PROJECT
  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchAll();
  };

  //  UI STARTS HERE
  return (
    <div style={{ padding: "40px" }}>
      <h1>Team Task Manager</h1>

      {/* CREATE PROJECT */}
      <h3>Create Project</h3>
      <input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={addProject}>Add</button>

      {/* PROJECT LIST */}
      <h3>Projects</h3>
      {projects.map((p) => (
        <div key={p._id} style={{ margin: "10px 0" }}>
          {p.name}
          <button
            onClick={() => deleteProject(p._id)}
            style={{ marginLeft: "10px", background: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* CREATE TASK */}
      <h3>Create Task</h3>

      <input
        placeholder="Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </select>

      <button onClick={addTask}>Add Task</button>

      {/* TASK LIST */}
      <h3>Tasks</h3>

      {tasks.map((t) => (
        <div key={t._id} style={{ margin: "10px 0" }}>
          <strong>{t.title}</strong> - {t.status}

          <select
            value={t.status}
            onChange={(e) => updateStatus(t._id, e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}