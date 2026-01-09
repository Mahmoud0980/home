import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../../../utils/auth";

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    status: "",
    area: "",
    agent_id: "",
  });

  const [images, setImages] = useState([]); // صور العقار
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (!isAdmin()) navigate("/login");

    loadAgents();
    loadProperty();
  }, [navigate]);

  const loadAgents = async () => {
    const res = await fetch(
      "http://localhost/real_estate_api/admin/get_agents.php"
    );
    const data = await res.json();
    if (data.status === "success") setAgents(data.agents);
  };

  const loadProperty = async () => {
    const res = await fetch(
      `http://localhost/real_estate_api/admin/properties/get_single_property.php?id=${id}`
    );

    const data = await res.json();

    if (data.status === "success") {
      setForm(data.property);
      setImages(data.images);
    } else {
      alert("العقار غير موجود");
      navigate("/admin/properties");
    }
  };

  // تعديل النصوص
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // رفع صورة جديدة
  const handleNewImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const uploadRes = await fetch(
      "http://localhost/real_estate_api/admin/properties/upload_image.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadData.status === "success") {
      setNewImages((prev) => [...prev, uploadData.image_url]);
    }
  };

  // حذف صورة
  const deleteImage = async (image) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    await fetch(
      "http://localhost/real_estate_api/admin/properties/delete_property_image.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: image.id,
          image_url: image.image_url,
        }),
      }
    );

    setImages(images.filter((img) => img.id !== image.id));
  };

  // حفظ جميع التعديلات
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost/real_estate_api/admin/properties/update_property.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    // حفظ الصور الجديدة
    if (newImages.length > 0) {
      for (let img of newImages) {
        await fetch(
          "http://home00101-001-site1.ktempurl.com/admin/properties/add_property_image.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              property_id: id,
              image_url: img,
            }),
          }
        );
      }
    }

    alert("تم تحديث العقار بنجاح");
    navigate("/admin/properties");
  };

  // ---- التصميم ----

  const container = {
    padding: "30px",
    minHeight: "100vh",
    background: "#f1f4f9",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    maxWidth: "650px",
    margin: "auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const title = {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#1a237e",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fafafa",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  };

  const imgBox = {
    position: "relative",
  };

  const imageStyle = {
    width: "100%",
    height: "130px",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
  };

  const deleteBtn = {
    position: "absolute",
    top: "6px",
    right: "6px",
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    cursor: "pointer",
  };

  const uploadBox = {
    padding: "18px",
    border: "2px dashed #90caf9",
    borderRadius: "12px",
    background: "#e3f2fd",
    textAlign: "center",
    color: "#0d47a1",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const saveBtn = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(45deg,#1e88e5,#42a5f5)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>تعديل العقار</h2>

        <form onSubmit={handleSubmit}>
          {/* بيانات النصوص */}
          <label>العنوان</label>
          <input
            name="title"
            value={form.title}
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الوصف</label>
          <textarea
            name="description"
            value={form.description}
            style={inputStyle}
            onChange={handleChange}
          ></textarea>

          <label>السعر</label>
          <input
            name="price"
            value={form.price}
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الموقع</label>
          <input
            name="location"
            value={form.location}
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الحالة</label>
          <select
            name="status"
            value={form.STATUS}
            style={inputStyle}
            onChange={handleChange}
          >
            <option value="بيع">بيع</option>
            <option value="إيجار">إيجار</option>
            <option value="رهن">رهن</option>
          </select>

          <label>المساحة</label>
          <input
            name="area"
            value={form.AREA}
            style={inputStyle}
            onChange={handleChange}
          />

          <label>الوكيل</label>
          <select
            name="agent_id"
            value={form.agent_id}
            style={inputStyle}
            onChange={handleChange}
          >
            <option value="">بدون وكيل</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.NAME}
              </option>
            ))}
          </select>

          {/* الصور الحالية */}
          <label>صور العقار الحالية</label>
          <div style={grid}>
            {images.map((img) => (
              <div style={imgBox} key={img.id}>
                <img
                  src={`http://localhost/real_estate_api/${img.image_url}`}
                  style={imageStyle}
                  alt="img"
                />
                <button onClick={() => deleteImage(img)} style={deleteBtn}>
                  حذف
                </button>
              </div>
            ))}
          </div>

          {/* رفع صور جديدة */}
          <label>إضافة صور جديدة</label>
          <div
            style={uploadBox}
            onClick={() => document.getElementById("newImage").click()}
          >
            اضغط لرفع صورة جديدة
          </div>

          <input
            id="newImage"
            type="file"
            style={{ display: "none" }}
            onChange={handleNewImageUpload}
          />

          {/* عرض الصور الجديدة */}
          {newImages.length > 0 && (
            <>
              <label>معاينة الصور الجديدة</label>
              <div style={grid}>
                {newImages.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost/real_estate_api/${img}`}
                    style={imageStyle}
                  />
                ))}
              </div>
            </>
          )}

          <button type="submit" style={saveBtn}>
            حفظ التعديلات
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
