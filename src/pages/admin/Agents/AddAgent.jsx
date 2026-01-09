import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAgent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    rating: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://home00101-001-site1.ktempurl.com/admin/add_agent.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    alert(data.message);
    if (data.status === "success") navigate("/admin/agents");
  };

  const container = {
    padding: "30px",
    background: "#f1f4f9",
    minHeight: "100vh",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "500px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const title = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1a237e",
    textAlign: "center",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  };

  const btn = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg, #43a047, #66bb6a)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>➕ إضافة وكيل جديد</h2>

        <form onSubmit={handleSubmit}>
          <label>اسم الوكيل</label>
          <input name="name" onChange={handleChange} required style={input} />

          <label>الموقع</label>
          <input
            name="location"
            onChange={handleChange}
            required
            style={input}
          />

          <label>رقم الهاتف</label>
          <input name="phone" onChange={handleChange} required style={input} />

          <label>التقييم</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            onChange={handleChange}
            style={input}
          />

          <button type="submit" style={btn}>
            حفظ الوكيل
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAgent;
