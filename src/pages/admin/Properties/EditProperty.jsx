import React, { useCallback, useEffect, useState } from "react";
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

  const [images, setImages] = useState([]);
  const [newImages] = useState([]);

  const loadAgents = useCallback(async () => {
    const res = await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/get_agents.php"
    );
    const data = await res.json();
    if (data.status === "success") setAgents(data.agents);
  }, []);

  const loadProperty = useCallback(async () => {
    const res = await fetch(
      `http://home00101-001-site1.ktempurl.com/admin/properties/get_single_property.php?id=${id}`
    );

    const data = await res.json();

    if (data.status === "success") {
      setForm(data.property);
      setImages(data.images);
    } else {
      alert("العقار غير موجود");
      navigate("/admin/properties");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
      return;
    }

    loadAgents();
    loadProperty();
  }, [navigate, loadAgents, loadProperty]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const deleteImage = async (image) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) return;

    await fetch(
      "http://home00101-001-site1.ktempurl.com/admin/properties/delete_property_image.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: image.id,
          image_url: image.image_url,
        }),
      }
    );

    setImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    alert("تم تحديث العقار بنجاح");
    navigate("/admin/properties");
  };

  return (
    <div style={{ padding: 30, minHeight: "100vh", background: "#f1f4f9" }}>
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 12,
          maxWidth: 650,
          margin: "auto",
        }}
      >
        <h2 style={{ textAlign: "center" }}>تعديل العقار</h2>

        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <input name="price" value={form.price} onChange={handleChange} />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="بيع">بيع</option>
            <option value="إيجار">إيجار</option>
            <option value="رهن">رهن</option>
          </select>

          <input name="area" value={form.area} onChange={handleChange} />

          <select name="agent_id" value={form.agent_id} onChange={handleChange}>
            <option value="">بدون وكيل</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.NAME}
              </option>
            ))}
          </select>

          {images.map((img) => (
            <div key={img.id}>
              <img
                src={`http://home00101-001-site1.ktempurl.com/${img.image_url}`}
                alt="property"
              />
              <button type="button" onClick={() => deleteImage(img)}>
                حذف
              </button>
            </div>
          ))}

          <button type="submit">حفظ التعديلات</button>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
