import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ وحّد اسم الحقل مع اللي بتستخدمه في الـ input
  const [form, setForm] = useState({
    NAME: "",
    location: "",
    phone: "",
    rating: "",
  });

  // ✅ useCallback حتى eslint يرضى ونضمن deps صح
  const loadAgent = useCallback(async () => {
    try {
      const res = await fetch(
        `https://home00101-001-site1.ktempurl.com/admin/get_single_agent.php?id=${id}`
      );
      const data = await res.json();
      if (data.status === "success") setForm(data.agent);
    } catch (err) {
      console.error("Failed to load agent:", err);
    }
  }, [id]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
      return;
    }
    loadAgent();
  }, [navigate, loadAgent]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://home00101-001-site1.ktempurl.com/admin/update_agent.php",
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
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const btn = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg, #1976d2, #64b5f6)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>✏️ تعديل الوكيل</h2>

        <form onSubmit={handleSubmit}>
          <label>اسم الوكيل</label>
          <input
            name="NAME"
            value={form.NAME || ""}
            onChange={handleChange}
            style={input}
          />

          <label>الموقع</label>
          <input
            name="location"
            value={form.location || ""}
            onChange={handleChange}
            style={input}
          />

          <label>رقم الهاتف</label>
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            style={input}
          />

          <label>التقييم</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            value={form.rating || ""}
            onChange={handleChange}
            style={input}
          />

          <button type="submit" style={btn}>
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAgent;
