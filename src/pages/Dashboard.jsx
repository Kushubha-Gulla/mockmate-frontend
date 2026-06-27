import React, { useState, useEffect } from "react";

function Dashboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch real live data metrics from your backend database on initialization
  useEffect(() => {
   fetch("https://mockmate-backend-h3dz.onrender.com/api/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to backend database API:", err);
        setLoading(false);
      });
  }, []);

  const totalTests = results.length;
  const totalScore = results.reduce((acc, cur) => acc + (cur.score / cur.total) * 100, 0);
  const avgScore = totalTests > 0 ? Math.round(totalScore / totalTests) : 0;

  // Weak area logic calculation layer
  const typeCount = {};
  const typeScore = {};
  results.forEach((r) => {
    typeCount[r.type] = (typeCount[r.type] || 0) + 1;
    typeScore[r.type] = (typeScore[r.type] || 0) + (r.score / r.total) * 100;
  });

  let weakArea = "None";
  let minAvg = 101;
  Object.keys(typeScore).forEach((type) => {
    const avg = typeScore[type] / typeCount[type];
    if (avg < minAvg) {
      minAvg = avg;
      weakArea = type;
    }
  });

  if (loading) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", color: "#64748B", display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <h3>Loading analytics metrics from database...</h3>
      </div>
    );
  }

  return (
    <div style={dashboardCanvas}>
      
      {/* Page Header */}
      <header style={{ marginBottom: "32px" }}>
        <h1 style={headerTitle}>Dashboard</h1>
        <p style={headerSubtitle}>Track your progress and improve every day.</p>
      </header>

      {/* 3-Column Top Stat Cards Grid */}
      <div style={statsGridStructure}>
        
        {/* Metric 1 */}
        <div style={metricCardStyle}>
          <div style={{ ...iconSquare, background: "#EEF2FF" }}>
            <span style={{ fontSize: "20px" }}>📋</span>
          </div>
          <div>
            <p style={metricLabel}>Tests Taken</p>
            <h2 style={metricValue}>{totalTests}</h2>
          </div>
        </div>

        {/* Metric 2 */}
        <div style={metricCardStyle}>
          <div style={{ ...iconSquare, background: "#ECFDF5" }}>
            <span style={{ fontSize: "20px" }}>🎯</span>
          </div>
          <div>
            <p style={metricLabel}>Average Score</p>
            <h2 style={metricValue}>{avgScore}%</h2>
          </div>
        </div>

        {/* Metric 3 */}
        <div style={metricCardStyle}>
          <div style={{ ...iconSquare, background: "#FFF7ED" }}>
            <span style={{ fontSize: "20px" }}>🔥</span>
          </div>
          <div>
            <p style={metricLabel}>Weak Area</p>
            <h2 style={{ ...metricValue, color: weakArea === "None" ? "#64748B" : "#EF4444" }}>
              {weakArea.toUpperCase()}
            </h2>
          </div>
        </div>

      </div>

      {/* Main Content Row Panels */}
      <div style={twoColumnLayoutGrid}>
        
        {/* Recent Activity Window Block */}
        <div style={contentBlockWindow}>
          <h3 style={blockHeading}>Recent Activity</h3>
          <div style={activityRowItem}>
            <div style={badgeMarker}>A</div>
            <div style={{ flexGrow: 1 }}>
              <p style={activityTextPrimary}>Aptitude Test Status Checked</p>
              <p style={activityTextSecondary}>System generated profile check update</p>
            </div>
            <span style={timeStampText}>Just now</span>
          </div>
        </div>

        {/* Chart Window Block */}
        <div style={contentBlockWindow}>
          <h3 style={blockHeading}>Performance Overview</h3>
          <div style={dashedChartArea}>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>Performance Metrics Active</p>
          </div>
        </div>

      </div>

      {/* Hero Bottom Banner */}
      <div style={actionBannerContainer}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={bannerStarCircle}>⭐</div>
          <div>
            <h4 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "600", color: "#1E1B4B" }}>
              You're doing great!
            </h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#4338CA" }}>
              {weakArea === "None" && "Start attempting tests to get custom recommendations."}
              {weakArea === "aptitude" && "Practice more arithmetic and reasoning questions to boost your score."}
              {weakArea === "technical" && "Revise DBMS, OS, and key Data Structures."}
              {weakArea === "interview" && "Improve your core communication style and behavioral answers."}
            </p>
          </div>
        </div>
        <button style={bannerActionButton}>Start a Test Now →</button>
      </div>

    </div>
  );
}

// Token Design objects
const dashboardCanvas = {
  fontFamily: "'Inter', system-ui, sans-serif",
  color: "#1E293B",
  padding: "10px 0px",
};

const headerTitle = {
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 6px 0",
  letterSpacing: "-0.5px",
};

const headerSubtitle = {
  color: "#64748B",
  margin: 0,
  fontSize: "15px",
};

const statsGridStructure = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  marginBottom: "32px",
};

const metricCardStyle = {
  background: "#FFFFFF",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.01), 0 1px 2px rgba(15, 23, 42, 0.02)",
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const iconSquare = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const metricLabel = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "500",
  color: "#64748B",
};

const metricValue = {
  margin: "4px 0 0 0",
  fontSize: "28px",
  fontWeight: "700",
  color: "#0F172A",
  lineHeight: 1,
};

const twoColumnLayoutGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "24px",
  marginBottom: "32px",
};

const contentBlockWindow = {
  background: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px 28px",
  boxShadow: "0 4px 12px rgba(15, 23, 242, 0.01)",
};

const blockHeading = {
  margin: "0 0 20px 0",
  fontSize: "16px",
  fontWeight: "600",
  color: "#0F172A",
};

const activityRowItem = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const badgeMarker = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  backgroundColor: "#EEF2FF",
  color: "#4F46E5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "14px",
};

const activityTextPrimary = { margin: 0, fontSize: "14px", fontWeight: "500", color: "#1E293B" };
const activityTextSecondary = { margin: 0, fontSize: "12px", color: "#94A3B8", marginTop: "2px" };
const timeStampText = { fontSize: "12px", color: "#94A3B8", fontWeight: "500" };

const dashedChartArea = {
  height: "160px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed #E2E8F0",
  borderRadius: "12px",
  color: "#94A3B8",
};

const actionBannerContainer = {
  background: "linear-gradient(90deg, #E0E7FF 0%, #EEF2FF 100%)",
  padding: "24px 32px",
  borderRadius: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.02)",
};

const bannerStarCircle = {
  fontSize: "20px",
  background: "#FFFFFF",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
};

const bannerActionButton = {
  background: "#2563EB",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
};

export default Dashboard;
