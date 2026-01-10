import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyModal from "../components/PropertyModal";

export default function Sale() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_properties_by_status.php?status=بيع"
      );
      const data = await res.json();
      if (data.status === "success") setProperties(data.properties);
    } catch (err) {
      console.error("خطأ أثناء جلب البيانات:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-blue-100 py-16 px-6">
      <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-12">
        🏠 عقارات للبيع
      </h2>

      {loading && <p className="text-center">جاري التحميل...</p>}

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <PropertyCard
              {...property}
              image={
                property.images?.[0]
                  ? `https://home00101-001-site1.ktempurl.com/${property.images[0]}`
                  : null
              }
              isLoggedIn={true}
              onOpen={() => setSelectedProperty(property)}
            />
          </motion.div>
        ))}
      </div>

      {/* ===== MODAL ===== */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
