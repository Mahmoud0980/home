import React from "react";

function PropertyCard({
  title,
  location,
  price,
  status,
  image,
  isLoggedIn,
  agent_phone,
}) {
  // ✅ حماية السعر
  const numericPrice = price
    ? parseInt(price.toString().replace(/,/g, ""))
    : null;

  // ✅ حساب السعر المتوقع
  const predictedPrice =
    isLoggedIn && numericPrice
      ? Math.floor(numericPrice * (0.95 + Math.random() * 0.1)).toLocaleString()
      : null;

  // ✅ رابط واتساب
  const whatsappLink = agent_phone ? `https://wa.me/${agent_phone}` : null;

  // ✅ تأمين رابط الصورة + ترميز الفراغات
  const safeImage =
    typeof image === "string" && image.length > 0 ? encodeURI(image) : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative">
        {/* 🖼️ الصورة */}
        {safeImage ? (
          <img
            src={safeImage}
            alt={title || "property image"}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            لا توجد صورة
          </div>
        )}

        {/* 🏷️ الحالة */}
        {status && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white font-bold ${
              status === "للبيع"
                ? "bg-green-500"
                : status === "رهن"
                ? "bg-amber-600"
                : "bg-blue-500"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700">
          {title || "بدون عنوان"}
        </h3>

        <p className="text-gray-600">{location || "غير محدد"}</p>

        <p className="text-gray-800 font-semibold">
          {numericPrice
            ? `${numericPrice.toLocaleString()} $`
            : "السعر غير متوفر"}
        </p>

        {predictedPrice && (
          <p className="text-purple-600 font-bold mt-2">
            السعر المتوقع: {predictedPrice} $
          </p>
        )}

        {/* 🔥 زر التحدث مع الوكيل */}
        {agent_phone ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition text-center"
          >
            💬 التحدث مع الوكيل ({agent_phone})
          </a>
        ) : (
          <p className="mt-3 text-center text-red-600 font-bold">
            لا يوجد وكيل مرتبط
          </p>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;
