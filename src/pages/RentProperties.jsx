import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyModal from "../components/PropertyModal";

export default function RentProperties() {
  const [properties, setProperties] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_properties_by_status.php?status=إيجار"
      );
      const data = await res.json();
      if (data.status === "success") setProperties(data.properties);
    } catch (err) {
      console.error("خطأ أثناء جلب العقارات:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-100 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
        العقارات المتاحة للإيجار
      </h2>

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

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
