import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    role: "زبون", // ثابت الآن
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert(data.message);
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">إنشاء حساب جديد</h1>

        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="الاسم الكامل"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="كلمة المرور"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="phone"
            placeholder="رقم الهاتف"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            name="city"
            placeholder="المدينة"
            required
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/* role محذوفة لأنها ثابتة "زبون" */}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-green-600 text-white rounded"
          >
            {loading ? "جاري..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          لديك حساب؟{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-700 font-semibold cursor-pointer"
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
