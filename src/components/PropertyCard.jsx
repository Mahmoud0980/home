import React from "react";

function PropertyCard({
  title,
  location,
  price,
  status,
  image,
  isLoggedIn,
  agent_phone,
  onOpen, // 👈 استقبلها
}) {
  const predictedPrice = isLoggedIn
    ? Math.floor(
        parseInt(price.toString().replace(/,/g, "")) *
          (0.95 + Math.random() * 0.1)
      ).toLocaleString()
    : null;

  const whatsappLink = agent_phone ? `https://wa.me/${agent_phone}` : null;

  return (
    // ✅ أضف onClick هنا
    <div
      onClick={onOpen}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
    >
      <div className="relative">
        {image && (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        )}

        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white font-bold ${
            status === "بيع"
              ? "bg-green-500"
              : status === "رهن"
              ? "bg-amber-600"
              : "bg-blue-500"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-700">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-800 font-semibold">{price} $</p>

        {isLoggedIn && (
          <p className="text-purple-600 font-bold mt-2">
            السعر المتوقع: {predictedPrice} $
          </p>
        )}

        {/* زر الواتساب بدون ما يفتح المودال */}
        {agent_phone && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // ⛔ مهم
            className="mt-3 block w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition text-center"
          >
            💬 التحدث مع الوكيل ({agent_phone})
          </a>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;
