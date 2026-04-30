import { useState } from "react";
import { API } from "./api";

export default function AddTask({ refresh }) {
  const [title, setTitle] = useState("");

  const createTask = async () => {
    try {
      await API.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Task created");
      setTitle("");
      refresh(); // reload tasks
    } catch {
      alert("Error creating task");
    }
  };

  return (
    <div>
      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>
    </div>
  );
}