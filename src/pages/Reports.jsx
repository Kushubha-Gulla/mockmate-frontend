import React, { useState, useEffect } from "react";

function Reports() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch real data metrics live from your backend database
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

  // Track sub-categories to find strengths and weaknesses
  const typeCount = {};
  const typeScore = {};
  results.forEach((r) => {
    typeCount[r.type] = (typeCount[r.type] || 0) + 1;
    typeScore[r.type] = (typeScore[r.type] || 0) + (r.score / r.total) * 100;
  });

  let weakArea = "None";
  let strongArea = "None";
  let minAvg = 101;
  let maxAvg = -1;

  Object.keys(typeScore).forEach((type) => {
    const avg = typeScore[type] / typeCount[type];
    if (avg < minAvg) {
      minAvg = avg;
      weakArea = type;
    }
    if (avg > maxAvg) {
      maxAvg = avg;
      strongArea = type;
    }
  });

  if (loading) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", color: "#64748B", display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <h3>Loading performance metrics from database...</h3>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <h1 style={{ fontSize: "32px", marginBottom: "24px", fontFamily: "'Inter', sans-serif", fontWeight: "700" }}>
        Performance Reports
      </h1>

      {/* 4-COLUMN STATS GRID LAYOUT */}
      <div style={gridContainerStyle}>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total Tests</h3>
          <p style={cardValueStyle}>{totalTests}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Average Score</h3>
          <p style={cardValueStyle}>{avgScore}%</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Strong Area</h3>
          <p style={{ ...cardValueStyle, color: strongArea === "None" ? "#0F172A" : "#16A34A" }}>
            {strongArea.toUpperCase()}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Weak Area</h3>
          <p style={{ ...cardValueStyle, color: weakArea === "None" ? "#0F172A" : "#DC2626" }}>
            {weakArea.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  fontFamily: "'Inter', sans-serif"
};

const cardStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const cardTitleStyle = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "500",
  color: "#64748B",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const cardValueStyle = {
  margin: 0,
  fontSize: "28px",
  fontWeight: "700",
  color: "#0F172A"
};

export default Reports;
