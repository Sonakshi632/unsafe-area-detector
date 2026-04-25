import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
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
        <h2 style={{ marginBottom: "20px", color: "#fff" }}>Register 📝</h2>

        <input
          placeholder="Name"
          style={{ width: "100%", margin: "10px 0", padding: "10px", borderRadius: "8px", border: "none" }}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          style={{ width: "100%", margin: "10px 0", padding: "10px", borderRadius: "8px", border: "none" }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          style={{ width: "100%", margin: "10px 0", padding: "10px", borderRadius: "8px", border: "none" }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Register
        </button>

        <p style={{ color: "#aaa", marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#6366f1", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;