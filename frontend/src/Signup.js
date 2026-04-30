import { API } from "./api";

const handleSignup = async () => {
  try {
    const res = await API.post("/auth/signup", {
      name,
      email,
      password
    });

    alert("Signup successful");
    console.log(res.data);

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};