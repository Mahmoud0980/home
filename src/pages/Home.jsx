import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";

function Home() {
  const isLoggedIn = true;
  const propertiesRef = useRef(null);

  const [allProperties, setAllProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
  });

  // 🔹 جلب كل العقارات
  const fetchAllProperties = useCallback(async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_all_properties.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setAllProperties(data.properties);

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

  // 🔹 تطبيق الفلترة
  useEffect(() => {
    if (!filters.location && !filters.type) {
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

  // 🔹 منع سكرول الصفحة + ESC
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedProperty(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProperty]);

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
                className="cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                <PropertyCard
                  {...property}
                  image={
                    property.images?.[0]
                      ? `https://home00101-001-site1.ktempurl.com/${property.images[0]}`
                      : null
                  }
                  isLoggedIn={isLoggedIn}
                  onClick={() => setSelectedProperty(property)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setSelectedProperty(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>

            {/* العنوان */}
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              {selectedProperty.title}
            </h2>

            <p className="text-gray-600 mb-1">📍 {selectedProperty.location}</p>

            <p className="text-gray-800 font-semibold mb-1">
              💰 السعر: {selectedProperty.price} $
            </p>

            {selectedProperty.AREA && (
              <p className="text-gray-700 mb-2">
                📐 المساحة: {selectedProperty.AREA} م²
              </p>
            )}

            {selectedProperty.description && (
              <p className="text-gray-600 mb-4 leading-relaxed">
                📝 {selectedProperty.description}
              </p>
            )}

            {/* الصور */}
            {selectedProperty.images?.length > 0 && (
              <>
                <h3 className="font-bold text-lg mb-2 text-blue-600">
                  صور العقار
                </h3>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {selectedProperty.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`https://home00101-001-site1.ktempurl.com/${img}`}
                      alt="property"
                      className="h-40 min-w-[220px] rounded-xl object-cover shadow-md"
                    />
                  ))}
                </div>
              </>
            )}

            {/* زر التواصل */}
            {selectedProperty.agent_phone && (
              <a
                href={`https://wa.me/${selectedProperty.agent_phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block w-full text-center bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
              >
                💬 التواصل مع الوكيل
              </a>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Home;
