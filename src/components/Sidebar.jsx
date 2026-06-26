import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  // Helper function to dynamically add active link styles
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...linkStyle,
      backgroundColor: isActive ? "#2563EB" : "transparent", // Royal blue active background matching image
      fontWeight: isActive ? "600" : "400",
      color: isActive ? "#FFFFFF" : "#94A3B8", // Dimmed color for inactive states
    };
  };

  return (
    <div style={sidebarContainer}>
      <div>
        {/* App Branding / Logo Header Area */}
        <div style={logoSection}>
          <div style={logoIcon}>⚡</div>
          <h1 style={logoText}>MockMate</h1>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "8px" }}>
              <Link to="/" style={getLinkStyle("/dashboard")}>
                <span style={menuIcon}>📊</span> Dashboard
              </Link>
            </li>

            <li style={{ marginBottom: "8px" }}>
              <Link to="/aptitude" style={getLinkStyle("/aptitude")}>
                <span style={menuIcon}>📖</span> Aptitude Test
              </Link>
            </li>

            <li style={{ marginBottom: "8px" }}>
              <Link to="/technical" style={getLinkStyle("/technical")}>
                <span style={menuIcon}>💻</span> Technical Test
              </Link>
            </li>

            <li style={{ marginBottom: "8px" }}>
              <Link to="/interview" style={getLinkStyle("/interview")}>
                <span style={menuIcon}>👤</span> Interview
              </Link>
            </li>

            <li style={{ marginBottom: "8px" }}>
              <Link to="/reports" style={getLinkStyle("/reports")}>
                <span style={menuIcon}>📈</span> Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Profile Footer Area (Matches Bottom Section of Reference Image) */}
      <div style={profileSection}>
        <div style={avatarCircle}>U</div>
        <div style={{ overflow: "hidden" }}>
          <p style={profileName}>User</p>
          <p style={profileEmail}>user@example.com</p>
        </div>
      </div>
    </div>
  );
}

// Inline Styles matching MockMate theme layout
const sidebarContainer = {
  width: "260px",
  height: "100vh",
  backgroundColor: "#0F172A", // Deep Navy
  color: "white",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxSizing: "border-box",
  // No positioning variables here; let the layout handle it natively
};


const logoSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "36px",
  paddingLeft: "8px",
};

const logoIcon = {
  background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "700",
  margin: 0,
  letterSpacing: "-0.5px",
};

const linkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const menuIcon = {
  marginRight: "12px",
  fontSize: "16px",
};

const profileSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px 8px",
  borderTop: "1px solid #1E293B",
};

const avatarCircle = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#4F46E5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "600",
  fontSize: "14px",
  flexShrink: 0,
};

const profileName = {
  margin: 0,
  fontSize: "14px",
  fontWeight: "500",
  color: "#FFFFFF",
};

const profileEmail = {
  margin: 0,
  fontSize: "11px",
  color: "#64748B",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

export default Sidebar;
