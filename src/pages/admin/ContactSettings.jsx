import React, { useEffect, useState } from "react";

function ContactSettings() {
  const [form, setForm] = useState({
    phone: "",
    whatsapp: "",
    facebook: "",
    map: "",
  });

  const [message, setMessage] = useState("");

  // جلب بيانات التواصل الحالية
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://localhost/real_estate_api/admin/get_contact.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setForm({
          phone: data.contact.phone || "",
          whatsapp: data.contact.whatsapp || "",
          facebook: data.contact.facebook || "",
          map: data.contact.map || "",
        });
      }
    } catch (error) {
      setMessage("فشل جلب البيانات.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // تحديث الحقول
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // إرسال البيانات للتحديث
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/admin/update_contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("حدث خطأ أثناء حفظ البيانات.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>إعدادات معلومات التواصل</h2>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>رقم الهاتف</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
            placeholder="مثال: 0999999999"
          />

          <label style={styles.label}>رقم الواتساب</label>
          <input
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
            style={styles.input}
            placeholder="رقم واتساب"
          />

          <label style={styles.label}>رابط صفحة الفيسبوك</label>
          <input
            type="text"
            name="facebook"
            value={form.facebook}
            onChange={handleChange}
            style={styles.input}
            placeholder="https://facebook.com/yourpage"
          />

          <label style={styles.label}>رابط خرائط غوغل</label>
          <input
            type="text"
            name="map"
            value={form.map}
            onChange={handleChange}
            style={styles.input}
            placeholder="Google Maps Link"
          />

          <button type="submit" style={styles.button}>
            حفظ التعديلات
          </button>
        </form>
      </div>
    </div>
  );
}

// 🎨 CSS بسيط بدون أي مكتبة
const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    background: "#f4f4f4",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "22px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  message: {
    background: "#e0ffe0",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    textAlign: "center",
    color: "green",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#1565c0",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ContactSettings;
