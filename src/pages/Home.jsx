import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";

function Home() {
  const isLoggedIn = true;
  const propertiesRef = useRef(null);

  const [allProperties, setAllProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
  });

  // جلب كل العقارات
  const fetchAllProperties = useCallback(async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_all_properties.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setAllProperties(data.properties);

        // عرض عشوائي مبدئي
        const shuffled = [...data.properties].sort(() => Math.random() - 0.5);
        setDisplayedProperties(shuffled.slice(0, 6));
      }
    } catch (err) {
      console.error("خطأ أثناء تحميل العقارات:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllProperties();
  }, [fetchAllProperties]);

  // 🔥 تطبيق الفلترة
  useEffect(() => {
    if (!filters.location && !filters.type) {
      // رجّع عرض عشوائي
      const shuffled = [...allProperties].sort(() => Math.random() - 0.5);
      setDisplayedProperties(shuffled.slice(0, 6));
      return;
    }

    const filtered = allProperties.filter((p) => {
      const matchLocation =
        !filters.location ||
        p.location?.toLowerCase().includes(filters.location.toLowerCase());

      const matchType = !filters.type || p.STATUS === filters.type;

      return matchLocation && matchType;
    });

    setDisplayedProperties(filtered);
  }, [filters, allProperties]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-200">
      <Header onFilter={setFilters} />

      <div ref={propertiesRef} className="max-w-7xl mx-auto py-10 px-6" />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
          عقارات مميزة اخترناها لك ✨
        </h2>

        {displayedProperties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            لا توجد نتائج مطابقة
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard
                  {...property}
                  image={
                    property.images?.[0]
                      ? `https://home00101-001-site1.ktempurl.com/${property.images[0]}`
                      : null
                  }
                  isLoggedIn={isLoggedIn}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
