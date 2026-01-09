import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function AddProperty() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    status: "بيع",
    area: "",
    agent_id: "",
  });

  const [images, setImages] = useState([]); // مسارات الصور

  useEffect(() => {
    if (!isAdmin()) navigate("/login");
    loadAgents();
  }, [navigate]);

  const loadAgents = async () => {
    const res = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/get_agents.php"
    );
    const data = await res.json();
    if (data.status === "success") setAgents(data.agents);
  };

  // استقبال بيانات النصوص
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // رفع صورة واحدة
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const uploadRes = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/properties/upload_image.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadData.status === "success") {
      setImages((prev) => [...prev, uploadData.image_url]);
    }
  };

  // حفظ العقار كامل
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/properties/add_property.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.status === "success") {
      const newId = data.property_id;

      // حفظ الصور تبع العقار
      for (let img of images) {
        await fetch(
          "http://home00101-001-site1.ktempurl.com/admin/properties/add_property_image.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              property_id: newId,
              image_url: img,
            }),
          }
        );
      }

      alert("تم إضافة العقار بنجاح ✔");
      navigate("/admin/properties");
    } else {
      alert(data.message);
    }
  };

  // ---- Styles ----

  const container = {
    padding: "30px",
    minHeight: "100vh",
    background: "#f1f4f9",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const title = {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: "20px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    background: "#fafafa",
  };

  const uploadBox = {
    width: "100%",
    padding: "20px",
    border: "2px dashed #90caf9",
    borderRadius: "12px",
    textAlign: "center",
    background: "#e3f2fd",
    color: "#0d47a1",
    cursor: "pointer",
    marginBottom: "15px",
    transition: "0.3s",
    fontWeight: "bold",
  };

  const previewGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "10px",
    marginBottom: "15px",
  };

  const previewImage = {
    width: "100%",
    height: "110px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  };

  const submitBtn = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg,#1e88e5,#42a5f5)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(30,136,229,0.3)",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>إضافة عقار جديد 🏠</h2>

        <form onSubmit={handleSubmit}>
          <label>عنوان العقار</label>
          <input
            name="title"
            required
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الوصف</label>
          <textarea
            name="description"
            style={inputStyle}
            onChange={handleChange}
          ></textarea>

          <label>السعر</label>
          <input
            name="price"
            type="number"
            required
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الموقع</label>
          <input
            name="location"
            required
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الحالة</label>
          <select name="status" style={inputStyle} onChange={handleChange}>
            <option value="بيع">بيع</option>
            <option value="إيجار">إيجار</option>
            <option value="رهن">رهن</option>
          </select>

          <label>المساحة</label>
          <input name="area" style={inputStyle} onChange={handleChange} />

          <label>الوكيل</label>
          <select name="agent_id" style={inputStyle} onChange={handleChange}>
            <option value="">بدون وكيل</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.NAME}
              </option>
            ))}
          </select>

          {/* صندوق رفع الصور */}
          <label>صور العقار</label>
          <div
            style={uploadBox}
            onClick={() => document.getElementById("imageInput").click()}
          >
            اضغط لرفع صورة أو اسحبها هنا
          </div>

          <input
            type="file"
            id="imageInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          {/* عرض الصور بعد الرفع */}
          <div style={previewGrid}>
            {images.map((img, i) => (
              <img
                key={i}
                src={`http://home00101-001-site1.ktempurl.com/${img}`}
                style={previewImage}
                alt="test"
              />
            ))}
          </div>

          <button style={submitBtn} type="submit">
            حفظ العقار
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
