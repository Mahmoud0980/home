import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";

export default function RentProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب العقارات من قاعدة البيانات
  const fetchProperties = async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_properties_by_status.php?status=إيجار"
      );
      const data = await res.json();

      if (data.status === "success") {
        setProperties(data.properties);
      }
    } catch (err) {
      console.error("خطأ أثناء جلب العقارات:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-100 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
        العقارات المتاحة للإيجار
      </h2>

      {loading && (
        <p className="text-center text-gray-600 text-xl">
          جاري تحميل البيانات...
        </p>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-center text-gray-600 text-xl">
          لا يوجد عقارات للإيجار حالياً
        </p>
      )}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {properties.map((property, i) => {
          // رابط واتساب للوكيل
          // const whatsappLink = property.agent_phone
          //   ? `httpsss://wa.me/${property.agent_phone}`
          //   : null;

          return (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col gap-4"
            >
              <PropertyCard {...property} isLoggedIn={true} />

              {/* زر التحدث مع الوكيل */}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
