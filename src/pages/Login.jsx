import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/dashboard");
    }
  };

  return (
    <div style={loginBg}>
      {/* 🔮 High-End Ambient Glowing Mesh Background Layers */}
      <div style={blobLeft}></div>
      <div style={blobRight}></div>

      {/* 🛡️ Modern Glassmorphism Core Welcome Card Container */}
      <div style={loginCard}>
        <div style={logoIcon}>⚡</div>
        <h2 style={loginHeading}>Welcome to MockMate</h2>
        <p style={loginSubheading}>
          Your intelligent practice platform and interview companion.
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={labelStyle}>Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={inputStyle} 
            />
          </div>

          <button type="submit" style={btnStyle}>
            Get Started Now →
          </button>
        </form>
      </div>
    </div>
  );
}

// Layout Tokens
const loginBg = {
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  width: "100vw", 
  height: "100vh", 
  backgroundColor: "#F8FAFC",
  backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
  fontFamily: "'Inter', sans-serif",
  position: "relative",
  overflow: "hidden"
};

// 🌟 Ambient Background Blobs to match Dashboard look
const blobLeft = {
  position: "absolute",
  width: "550px",
  height: "550px",
  top: "-150px",
  left: "-100px",
  background: "radial-gradient(circle, rgba(165, 180, 252, 0.45) 0%, rgba(165, 180, 252, 0) 70%)",
  filter: "blur(70px)",
  pointerEvents: "none",
  zIndex: 1,
};

const blobRight = {
  position: "absolute",
  width: "600px",
  height: "600px",
  bottom: "-150px",
  right: "-100px",
  background: "radial-gradient(circle, rgba(191, 219, 254, 0.5) 0%, rgba(191, 219, 254, 0) 70%)",
  filter: "blur(80px)",
  pointerEvents: "none",
  zIndex: 1,
};

const loginCard = {
  background: "rgba(255, 255, 255, 0.85)", 
  padding: "44px 40px", 
  borderRadius: "24px",
  boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.02)", 
  width: "380px", 
  textAlign: "center",
  boxSizing: "border-box",
  backdropFilter: "blur(12px)", // Soft modern glass design blur
  border: "1px solid rgba(255, 255, 255, 0.7)",
  position: "relative",
  zIndex: 10
};

const logoIcon = {
  background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
  width: "52px", 
  height: "52px", 
  borderRadius: "14px",
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", // Fixed Typo
  fontSize: "22px", 
  color: "white", 
  margin: "0 auto 18px auto",
  boxShadow: "0 8px 16px -4px rgba(99, 102, 241, 0.3)"
};

const loginHeading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0F172A",
  margin: "0 0 6px 0",
  letterSpacing: "-0.5px"
};

const loginSubheading = {
  color: "#64748B", 
  fontSize: "14px", 
  margin: "0 0 28px 0",
  lineHeight: "1.5"
};

const labelStyle = { 
  fontSize: "13px", 
  fontWeight: "600", 
  color: "#475569", 
  display: "block", 
  marginBottom: "8px",
  letterSpacing: "0.2px"
};

const inputStyle = {
  width: "100%", 
  padding: "13px 16px", 
  borderRadius: "10px", 
  border: "1px solid #CBD5E1",
  fontSize: "14px", 
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none",
  backgroundColor: "#FFFFFF",
  transition: "border-color 0.15s ease"
};

const btnStyle = {
  width: "100%", 
  padding: "14px", 
  backgroundColor: "#2563EB", 
  color: "white",
  border: "none", 
  borderRadius: "10px", 
  fontWeight: "600", 
  fontSize: "14px",
  cursor: "pointer", 
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)",
  transition: "transform 0.1s ease"
};

export default Login;
