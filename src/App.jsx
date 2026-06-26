import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard";
import Aptitude from "./pages/Aptitude";
import Technical from "./pages/Technical";
import Interview from "./pages/Interview";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      {/* 🔐 GATEWAY WELCOME ROUTE */}
      <Route path="/" element={<Login />} />

      {/* 📊 CORE MAIN APP WORKSPACE ROUTE */}
      <Route 
        path="/*" 
        element={
          <div style={appGridContainer}>
            {/* Dynamic CSS Keyframe Injection Layer */}
            <style>{animationStyles}</style>

            {/* COLUMN 1: Fixed Isolated Navigation Panel Column */}
            <div style={sidebarColumnWrapper}>
              <Sidebar />
            </div>

            {/* COLUMN 2: Studio Bright Workspace Canvas Viewport */}
            <div style={mainCanvasColumnWrapper}>
              {/* Dynamic Breathing High-Contrast Ambient Mesh Blobs */}
              <div style={{ ...blobLeft, animation: "floatBlob1 18s ease-in-out infinite alternate" }}></div>
              <div style={{ ...blobRight, animation: "floatBlob2 22s ease-in-out infinite alternate" }}></div>

              <main style={routesInnerWrapper}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/aptitude" element={<Aptitude />} />
                  <Route path="/technical" element={<Technical />} />
                  <Route path="/interview" element={<Interview />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
            </div>
          </div>
        } 
      />
    </Routes>
  );
}

// 📐 Isolated Layout Split Alignment Setup Grid
const appGridContainer = {
  display: "grid",
  gridTemplateColumns: "260px 1fr", 
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#F8FAFC", // Clean, pure canvas backdrop base
  overflowX: "hidden",
};

const sidebarColumnWrapper = {
  position: "relative",
  zIndex: 99, 
};

const mainCanvasColumnWrapper = {
  position: "relative",
  // Studio Bright Gradient Wash: Eliminates muddy gray/blue floors for a pure white layout look
  backgroundImage: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)",
  minHeight: "100vh",
  zIndex: 1,
};

const routesInnerWrapper = {
  padding: "40px",
  maxWidth: "1280px",
  margin: "0 auto",
  position: "relative",
  zIndex: 10, 
};

// 🔮 High-Fidelity Ambient Mesh Shapes (Matching the Login Theme)
const blobLeft = {
  position: "absolute",
  width: "650px",
  height: "550px",
  top: "-100px",
  left: "-50px",
  // Bright indigo wash base layer
  background: "radial-gradient(circle at top left, rgba(224, 231, 255, 0.6) 0%, rgba(199, 210, 254, 0.25) 50%, transparent 100%)",
  filter: "blur(75px)",
  pointerEvents: "none",
  zIndex: 2,
};

const blobRight = {
  position: "absolute",
  width: "750px",
  height: "650px",
  top: "-150px",
  right: "-100px",
  // Soft electric sky blue layer
  background: "radial-gradient(circle, rgba(219, 234, 254, 0.55) 0%, rgba(239, 246, 255, 0.2) 65%, transparent 100%)",
  filter: "blur(85px)",
  pointerEvents: "none",
  zIndex: 2,
};

// 🎬 Premium Breathing Animation Strings
const animationStyles = `
  @keyframes floatBlob1 {
    0% { transform: translate(0px, 0px) scale(1); }
    100% { transform: translate(30px, 20px) scale(1.04); }
  }
  @keyframes floatBlob2 {
    0% { transform: translate(0px, 0px) scale(1); }
    100% { transform: translate(-25px, 40px) scale(0.96); }
  }
`;

export default App;
