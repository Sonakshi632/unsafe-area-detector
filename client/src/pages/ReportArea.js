import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import MapComponents from "../components/MapComponents";

function ReportArea() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: {
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
    riskLevel: "low",
  });

  // 📍 LOCATION SELECT
  const handleLocationSelect = (loc) => {
    setForm({
      ...form,
      location: {
        ...form.location,
        coordinates: {
          lat: loc.lat,
          lng: loc.lng,
        },
      },
    });
  };

  // 🧠 AUTO ADDRESS FILL
  const handleAddressAutoFill = (address) => {
    setForm({
      ...form,
      location: {
        ...form.location,
        address: address,
      },
    });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/areas", form);
      alert("Area Reported ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>🚨 Report Unsafe Area</h2>

        <FloatingInput
          label="Title"
          value={form.title}
          onChange={(val) => setForm({ ...form, title: val })}
        />

        <FloatingInput
          label="Description"
          value={form.description}
          onChange={(val) => setForm({ ...form, description: val })}
        />

        <FloatingInput
          label="Category"
          value={form.category}
          onChange={(val) => setForm({ ...form, category: val })}
        />

        <FloatingInput
          label="Address"
          value={form.location.address}
          onChange={(val) =>
            setForm({
              ...form,
              location: { ...form.location, address: val },
            })
          }
        />

        {/* 🗺️ MAP */}
        <div style={{ marginBottom: "20px" }}>
          <MapComponents
            setLocation={handleLocationSelect}
            setAddress={handleAddressAutoFill}
          />
        </div>

        {form.location.coordinates.lat && (
          <p style={{ fontSize: "12px", color: "#aaa" }}>
            📍 Lat: {form.location.coordinates.lat} | Lng:{" "}
            {form.location.coordinates.lng}
          </p>
        )}

        <select
          value={form.riskLevel}
          onChange={(e) =>
            setForm({ ...form, riskLevel: e.target.value })
          }
          style={selectStyle}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={handleSubmit} style={btn}>
          Submit Report 🚀
        </button>
      </div>
    </div>
  );
}

/* Floating Input */
function FloatingInput({ label, value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={input}
      />
      <label
        style={{
          ...labelStyle,
          top: value ? "-10px" : "10px",
          fontSize: value ? "12px" : "14px",
          color: value ? "#22c55e" : "#aaa",
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* Styles */
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#020617,#0f172a)",
};

const card = {
  width: "420px",
  padding: "30px",
  borderRadius: "20px",
  backdropFilter: "blur(20px)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
};

const title = { textAlign: "center", marginBottom: "25px" };

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "transparent",
  color: "#fff",
};

const labelStyle = {
  position: "absolute",
  left: "10px",
  background: "#0f172a",
  padding: "0 5px",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
  background: "#1e293b",
  color: "#fff",
};

const btn = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
};

export default ReportArea;