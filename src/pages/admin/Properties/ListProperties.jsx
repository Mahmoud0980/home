import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function ListProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (!isAdmin()) navigate("/login");
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    const res = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/properties/get_properties.php"
    );
    const data = await res.json();
    if (data.status === "success") {
      setProperties(data.properties);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("هل تريد حذف هذا العقار؟")) return;

    await fetch(
      `http://home00101-001-site1.ktempurl.com/admin/properties/delete_property.php?id=${id}`
    );
    fetchData();
  };

  const pageStyle = {
    padding: "40px",
    background: "#f1f4f9",
    minHeight: "100vh",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
    marginBottom: "20px",
  };

  const title = {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1a237e",
  };

  const addBtn = {
    padding: "10px 18px",
    background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
    boxShadow: "0 3px 10px rgba(66,165,245,0.3)",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const th = {
    background: "#e8eaf6",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#1a237e",
    borderBottom: "2px solid #c5cae9",
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
    <div style={pageStyle}>
      <div style={card}>
        <h2 style={title}>🏠 إدارة العقارات</h2>

        <button
          onClick={() => navigate("/admin/properties/add")}
          style={addBtn}
        >
          + إضافة عقار جديد
        </button>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>العنوان</th>
              <th style={th}>السعر</th>
              <th style={th}>الوكيل</th>
              <th style={th}>خيارات</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td style={td}>{p.id}</td>
                <td style={td}>{p.title}</td>
                <td style={td}>{p.price} $</td>
                <td style={td}>{p.agent_name || "بدون وكيل"}</td>
                <td style={td}>
                  <button
                    onClick={() => navigate(`/admin/properties/edit/${p.id}`)}
                    style={editBtn}
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteProperty(p.id)}
                    style={deleteBtn}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}

            {properties.length === 0 && (
              <tr>
                <td colSpan={5} style={{ ...td, textAlign: "center" }}>
                  لا يوجد عقارات حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProperties;
