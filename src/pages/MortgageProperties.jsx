import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";

export default function MortgageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب العقارات من قاعدة البيانات
  const fetchProperties = async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_properties_by_status.php?status=رهن"
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-yellow-100 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-amber-700 mb-12">
        العقارات المتاحة للرهن
      </h2>

      {loading && (
        <p className="text-center text-gray-600 text-xl">
          جاري تحميل البيانات...
        </p>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-center text-gray-600 text-xl">
          لا يوجد عقارات للرهن حالياً
        </p>
      )}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <PropertyCard
              {...property}
              image={
                property.images?.[0]
                  ? `https://home00101-001-site1.ktempurl.com/${property.images[0]}`
                  : null
              }
              isLoggedIn={true}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
