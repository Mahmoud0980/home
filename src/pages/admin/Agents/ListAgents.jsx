import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function ListAgents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (!isAdmin()) navigate("/login");
    fetchAgents();
  }, [navigate]);

  const fetchAgents = async () => {
    const res = await fetch(
      "https://home00101-001-site1.ktempurl.com/admin/get_agents.php"
    );
    const data = await res.json();
    if (data.status === "success") setAgents(data.agents);
  };

  const deleteAgent = async (id) => {
    if (!window.confirm("هل تريد حذف الوكيل؟")) return;

    await fetch(
      `https://home00101-001-site1.ktempurl.com/admin/delete_agent.php?id=${id}`
    );

    fetchAgents();
  };

  // --- Styles ---

  const page = {
    padding: "40px",
    background: "#f1f4f9",
    minHeight: "100vh",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
  };

  const title = {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1a237e",
  };

  const addBtn = {
    padding: "10px 18px",
    background: "linear-gradient(45deg, #43a047, #66bb6a)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
    boxShadow: "0 3px 10px rgba(102,187,106,0.3)",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const th = {
    background: "#e8f5e9",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#2e7d32",
    borderBottom: "2px solid #c8e6c9",
  };

  const td = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const editBtn = {
    padding: "7px 12px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
  };

  const deleteBtn = {
    padding: "7px 12px",
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>👥 إدارة الوكلاء</h2>

        <button onClick={() => navigate("/admin/agents/add")} style={addBtn}>
          + إضافة وكيل جديد
        </button>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>الاسم</th>
              <th style={th}>الموقع</th>
              <th style={th}>الهاتف</th>
              <th style={th}>التقييم</th>
              <th style={th}>الخيارات</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((a) => (
              <tr key={a.id}>
                <td style={td}>{a.id}</td>
                <td style={td}>{a.NAME}</td>
                <td style={td}>{a.location}</td>
                <td style={td}>{a.phone}</td>
                <td style={td}>{a.rating}</td>
                <td style={td}>
                  <button
                    onClick={() => navigate(`/admin/agents/edit/${a.id}`)}
                    style={editBtn}
                  >
                    تعديل
                  </button>
                  <button onClick={() => deleteAgent(a.id)} style={deleteBtn}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}

            {agents.length === 0 && (
              <tr>
                <td style={td} colSpan={6} align="center">
                  لا يوجد وكلاء حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAgents;
