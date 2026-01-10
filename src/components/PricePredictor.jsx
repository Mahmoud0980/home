import React, { useState } from "react";

function PricePredictor({ isLoggedIn }) {
  const [area, setArea] = useState("");
  const [landType, setLandType] = useState("عقاري");
  const [location, setLocation] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      alert("يجب تسجيل الدخول لرؤية السعر المتوقع.");
      return;
    }
    const basePrice = 1000;
    const factor = landType === "عقاري" ? 1.0 : 0.8;
    const predicted = Math.floor(area * basePrice * factor).toLocaleString();
    setPredictedPrice(predicted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 py-12 px-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg mt-7">
          توقع أسعار العقارات
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          أدخل بيانات العقار لمعرفة السعر المتوقع
        </p>
      </header>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              الموقع
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="أدخل المدينة"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              المساحة (م²)
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="أدخل المساحة"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              نوع الطابو
            </label>
            <select
              value={landType}
              onChange={(e) => setLandType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="عقاري">عقاري</option>
              <option value="زراعي">زراعي</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            توقع السعر
          </button>
        </form>

        {predictedPrice && (
          <div className="mt-6 text-center">
            <p className="text-purple-600 text-2xl font-bold">
              السعر المتوقع: {predictedPrice} $
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricePredictor;
