import { useLocation, useNavigate } from "react-router-dom";

function ContactAgent() {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>لا توجد بيانات للعقار المحدد.</p>
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 ">
      <div className="max-w-3xl bg-white rounded-2xl p-6 shadow-md w-full mt-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          {property.title}
        </h2>
        <p className="mb-2">الموقع: {property.location}</p>
        <p className="mb-2">السعر: {property.price} $</p>
        <p className="mb-2">المساحة: {property.area} م²</p>
        <p className="mb-2">نوع الأرض: {property.landType}</p>

        {property.features && (
          <ul className="list-disc list-inside mb-4">
            {property.features.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        )}

        <p className="font-semibold text-lg mb-6">
          رقم الوكيل: {property.agentPhone}
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

export default ContactAgent;
