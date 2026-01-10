import React, { useEffect, useState } from "react";

function Contact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://home00101-001-site1.ktempurl.com/admin/get_contact.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setContact(data.contact);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 py-12 px-6">
      {/* العنوان */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg mt-8">
          تواصل معنا
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          نحن هنا للإجابة على جميع استفساراتك، اقتراحاتك، أو لمساعدتك في أي أمر
          يتعلق بالعقارات.
        </p>
      </header>

      {/* نموذج الاتصال */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              الاسم الكامل
            </label>
            <input
              type="text"
              placeholder="أدخل اسمك"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              الرسالة
            </label>
            <textarea
              placeholder="اكتب رسالتك هنا..."
              className="w-full border border-gray-300 p-3 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>

      {/* معلومات الاتصال من قاعدة البيانات */}
      <div className="max-w-3xl mx-auto mt-12 text-center space-y-4">
        {loading && (
          <p className="text-gray-600 text-lg">جاري تحميل معلومات التواصل...</p>
        )}

        {!loading && contact && (
          <>
            <p className="text-gray-700 text-xl">📞 الهاتف: {contact.phone}</p>
            <p className="text-gray-700 text-xl">
              💬 واتساب: {contact.whatsapp}
            </p>

            {contact.facebook && (
              <p className="text-gray-700 text-xl">
                🌐 فيسبوك:{" "}
                <a
                  href={contact.facebook}
                  className="text-blue-700 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  زيارة الصفحة
                </a>
              </p>
            )}

            {contact.map && (
              <p className="text-gray-700 text-xl">
                📍 الموقع على الخريطة:{" "}
                <a
                  href={contact.map}
                  className="text-green-700 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  عرض على Google Maps
                </a>
              </p>
            )}
          </>
        )}

        {!loading && !contact && (
          <p className="text-gray-700 text-lg">
            لم يتم إعداد معلومات التواصل بعد.
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;
