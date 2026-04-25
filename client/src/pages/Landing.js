import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // केवल text animate होगा
    gsap.from(".hero-title", {
      y: 80,
      opacity: 0,
      duration: 1,
    });

    gsap.from(".hero-sub", {
      y: 40,
      opacity: 0,
      duration: 1,
      delay: 0.3,
    });

    // ❌ button pe animation hata diya (yehi bug tha)
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg,#020617,#0f172a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1
        className="hero-title"
        style={{
          fontSize: "60px",
          background: "linear-gradient(90deg,#22c55e,#3b82f6)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Unsafe Area Detector 🚀
      </h1>

      <p
        className="hero-sub"
        style={{
          marginTop: "20px",
          fontSize: "18px",
          color: "#94a3b8",
        }}
      >
        AI Powered Safety Mapping Platform
      </p>

      <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          background: "linear-gradient(90deg,#22c55e,#16a34a)",
          border: "none",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Landing;