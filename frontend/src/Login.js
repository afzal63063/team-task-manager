import { API } from "./api";

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    alert("Login successful");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Login failed");
  }
};