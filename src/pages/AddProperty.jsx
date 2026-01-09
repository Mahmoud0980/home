import { useState } from "react";

function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تمت إضافة العقار بنجاح ✅");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-sky-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-right"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          إضافة عقار جديد
        </h2>

        <label className="block mb-2 font-medium">عنوان العقار</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="أدخل عنوان العقار"
        />

        <label className="block mb-2 font-medium">الموقع</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="أدخل موقع العقار"
        />

        <label className="block mb-2 font-medium">السعر (بالدولار)</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="أدخل السعر"
        />

        <label className="block mb-2 font-medium">رابط الصورة</label>
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="أدخل رابط صورة العقار"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          حفظ العقار
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
