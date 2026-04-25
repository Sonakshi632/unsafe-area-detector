import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function Dashboard() {
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  const fetchAreas = async () => {
    try {
      const res = await API.get("/areas");
      setAreas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIXED DELETE (TOKEN ADDED)
  const deleteArea = async (id) => {
    try {
      await API.delete(`/areas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchAreas();
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌ (check login/token)");
    }
  };

  useEffect(() => {
    fetchAreas();

    gsap.from(".card", {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "20px",
          background: "linear-gradient(90deg, #22c55e, #3b82f6)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Unsafe Area Detector 🚀
      </h1>

      <button
        onClick={() => navigate("/report")}
        style={{
          padding: "12px 25px",
          background: "linear-gradient(90deg,#22c55e,#16a34a)",
          border: "none",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        + Report Area
      </button>

      <div style={{ marginTop: "30px" }}>
        {areas.map((area) => (
          <div
            className="card"
            key={area._id}
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "20px",
              margin: "20px 0",
              borderRadius: "15px",
            }}
          >
            <h2>{area.title}</h2>
            <p>{area.description}</p>

            <p><b>Category:</b> {area.category}</p>
            <p><b>Location:</b> {area.location?.address}</p>
            <p><b>Risk:</b> {area.riskLevel}</p>

            <button
              onClick={() => deleteArea(area._id)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "#ef4444",
                border: "none",
                borderRadius: "6px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;