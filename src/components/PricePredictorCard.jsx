import React from "react";

function PricePredictorCard({ title, location, price, status, image, isLoggedIn }) {
  // السعر المتوقع: مثال مبسط (يمكن ربطه بالنموذج أو API لاحقاً)
  const predictedPrice = isLoggedIn
    ? Math.floor(parseInt(price.replace(/,/g, "")) * (0.95 + Math.random() * 0.1)).toLocaleString()
    : null;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white font-bold ${status === "للبيع" ? "bg-green-500" : "bg-blue-500"}`}>
          {status}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-1">الموقع: {location}</p>
        <p className="text-gray-600 mb-1">السعر الأصلي: {price} $</p>
        {isLoggedIn && (
          <p className="text-purple-600 font-bold mt-2">
            السعر المتوقع: {predictedPrice} $
          </p>
        )}
      </div>
    </div>
  );
}

export default PricePredictorCard;
