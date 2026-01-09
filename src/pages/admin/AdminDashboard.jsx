import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [navigate]);

  const container = {
    minHeight: "100vh",
    padding: "40px",
    background: "#f5f5f5",
  };

  const card = {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  };

  const link = {
    display: "block",
    padding: "12px",
    margin: "10px 0",
    background: "#1976d2",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          لوحة تحكم المدير
        </h2>

        <Link to="/admin/agents" style={link}>
          👥 إدارة الوكلاء
        </Link>
        <Link to="/admin/properties" style={link}>
          🏠 إدارة العقارات
        </Link>
        <Link to="/admin/properties/assign" style={link}>
          🔗 ربط وكيل مع عقار
        </Link>
        <Link to="/admin/contact-settings" style={link}>
          ☎️ معلومات التواصل
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
