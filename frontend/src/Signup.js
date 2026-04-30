import { useState } from "react";
import { API } from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const nav = useNavigate();

  const signup = async () => {
    try {
      await API.post("/auth/signup", data);
      alert("Signup successful");
      nav("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Signup</h2>

        <input placeholder="Name"
          onChange={e => setData({ ...data, name: e.target.value })}
          style={styles.input}
        />

        <input placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
          style={styles.input}
        />

        <input type="password" placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
          style={styles.input}
        />

        <button onClick={signup} style={styles.button}>
          Signup
        </button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }
};