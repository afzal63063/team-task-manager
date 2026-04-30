import React, { useEffect, useState } from "react";
import API from "./api";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  
  const fetchAll = async () => {
    try {
      const p = await API.get("/projects", {
        headers: { Authorization: token }
      });
      setProjects(p.data);

      const t = await API.get("/tasks", {
        headers: { Authorization: token }
      });
      setTasks(t.data);

      const u = await API.get("/auth/users", {
        headers: { Authorization: token }
      });
      setUsers(u.data);
    } catch (err) {
      console.log(err);
    }
  };

 useEffect(() => {
  fetchAll();
}, [fetchAll]);

  
  const addProject = async () => {
    if (!projectName) return alert("Enter project name");

    await API.post(
      "/projects",
      { name: projectName },
      { headers: { Authorization: token } }
    );

    setProjectName("");
    fetchAll();
  };

  
  const addTask = async () => {
    try {
      if (!title) return alert("Enter task");

      await API.post(
        "/tasks",
        {
          title,
          assignedTo,
          dueDate,
          project: selectedProject
        },
        { headers: { Authorization: token } }
      );

      setTitle("");
      setAssignedTo("");
      setDueDate("");
      setSelectedProject("");

      fetchAll();
    } catch (err) {
      alert("Error adding task");
      console.log(err);
    }
  };

  
  const updateStatus = async (id, status) => {
    await API.put(
      `/tasks/${id}`,
      { status },
      { headers: { Authorization: token } }
    );
    fetchAll();
  };

  
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: token }
      });
      fetchAll();
    } catch (err) {
      alert("Delete failed (check backend route)");
      console.log(err);
    }
  };
  const deleteProject = async (id) => {
  try {
    await API.delete(`/projects/${id}`, {
      headers: { Authorization: token }
    });
    fetchAll();
  } catch (err) {
    alert("Project delete failed");
    console.log(err);
  }
};

  
  const overdue = tasks.filter(
    t =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "Done"
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Team Task Manager</h1>

      <div style={styles.stats}>
        <span>Total Tasks: {tasks.length}</span>
        <span>Overdue: {overdue.length}</span>
      </div>

      {/* CREATE PROJECT */}
      <div style={styles.card}>
        <h3>Create Project</h3>
        <input
          placeholder="Project name"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addProject} style={styles.button}>
          Add
        </button>
      </div>

      {/* CREATE TASK */}
      <div style={styles.card}>
        <h3>Create Task</h3>

        <input
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={styles.input}
        />

        <select
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={assignedTo}
          onChange={e => setAssignedTo(e.target.value)}
          style={styles.input}
        >
          <option value="">Assign User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={addTask} style={styles.button}>
          Add Task
        </button>
      </div>

      {/* PROJECT LIST */}
      {projects.map(p => (
  <div key={p._id} style={styles.taskCard}>
    <span>{p.name}</span>

    <button
      onClick={() => deleteProject(p._id)}
      style={styles.delete}
    >
      Delete
    </button>
  </div>
))}

      {/* TASK LIST */}
      <div style={styles.card}>
        <h3>Tasks</h3>

        {tasks.map(t => (
          <div key={t._id} style={styles.taskCard}>
            <div>
              <strong>{t.title}</strong><br/>

              <span style={styles.sub}>
                Project: {t.project?.name || "None"}
              </span><br/>

              <span style={styles.sub}>
                Assigned: {t.assignedTo?.name || "Unassigned"}
              </span><br/>

              <span style={styles.sub}>
                Due: {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString()
                  : "No date"}
              </span>
            </div>

            <div>
              <select
                value={t.status}
                onChange={e => updateStatus(t._id, e.target.value)}
                style={styles.select}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button
                onClick={() => deleteTask(t._id)}
                style={styles.delete}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ CLEAN PROFESSIONAL UI
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px"
  },
  header: {
    background: "linear-gradient(45deg,#1976d2,#42a5f5)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    padding: "15px",
    background: "#f5f5f5",
    borderRadius: "10px"
  },
  card: {
    background: "#f9f9f9",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 15px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px"
  },
  sub: {
    fontSize: "13px",
    color: "#555"
  },
  delete: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginLeft: "10px"
  },
  select: {
    padding: "5px"
  }
};