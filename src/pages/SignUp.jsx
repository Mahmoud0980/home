import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://home00101-001-site1.ktempurl.com/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        alert("تم تسجيل الدخول بنجاح!");
        navigate("/");
      } else {
        alert(data.message || "بيانات تسجيل الدخول غير صحيحة!");
      }
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالخادم.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-cyan-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          تسجيل الدخول
        </h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ليس لديك حساب؟{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            إنشاء حساب جديد
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
