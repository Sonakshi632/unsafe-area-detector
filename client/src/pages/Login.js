import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const handleLogin = async () => {
  const res = await API.post("/auth/login", form);

  // ✅ ADD THIS LINE (MOST IMPORTANT)
  localStorage.setItem("token", res.data.token);

  navigate("/dashboard");
};

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f172a,#020617)"
    }}>
      <div style={{
        backdropFilter: "blur(15px)",
        background: "rgba(255,255,255,0.05)",
        padding: "40px",
        borderRadius: "20px",
        width: "320px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Login 🔐</h2>

        <input
          placeholder="Email"
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          style={{ width: "100%", margin: "10px 0", padding: "10px" }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg,#22c55e,#16a34a)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;