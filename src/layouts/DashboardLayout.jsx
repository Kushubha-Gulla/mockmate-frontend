import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#EEF2F6" }}>
      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main Content Window */}
      <div style={{ flexGrow: 1, padding: "40px", overflowY: "auto" }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
