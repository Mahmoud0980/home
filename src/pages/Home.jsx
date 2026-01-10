import { motion } from "framer-motion";

import { useRef, useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import PropertyList from "../components/PropertyList";

function Home() {
  const isLoggedIn = true;

  const propertiesRef = useRef(null);

  const [allProperties, setAllProperties] = useState([]);
  const [randomProperties, setRandomProperties] = useState([]);

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    maxPrice: "",
  });

  // ⭐ جلب جميع العقارات من قاعدة البيانات
  const fetchAllProperties = async () => {
    try {
      const res = await fetch(
        "https://home00101-001-site1.ktempurl.com/get_all_properties.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setAllProperties(data.properties);

        // ⭐ اختيار 6 عقارات عشوائية
        const shuffled = data.properties.sort(() => Math.random() - 0.5);
        setRandomProperties(shuffled.slice(0, 6));
      }
    } catch (err) {
      console.error("خطأ أثناء تحميل العقارات:", err);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  // ⭐ فلترة العقارات
  const filteredProperties = allProperties.filter((p) => {
    const matchLocation =
      filters.location === "" || p.location.includes(filters.location);

    const matchType =
      filters.type === "" ||
      (filters.type === "Sale" && p.STATUS === "بيع") ||
      (filters.type === "Rent" && p.STATUS === "إيجار");

    const matchPrice =
      filters.maxPrice === "" ||
      parseInt(p.price) <= parseInt(filters.maxPrice) * 1000;

    return matchLocation && matchType && matchPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-200">
      {/* 🟦 شريط البحث */}
      <Header onFilter={setFilters} />

      {/* ⭐ العقارات حسب البحث */}
      <div ref={propertiesRef} className="max-w-7xl mx-auto py-10 px-6"></div>

      {/* ⭐ إعلان */}

      {/* ⭐ عقارات عشوائية */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-10 text-center">
          عقارات مميزة اخترناها لك ✨
        </h2>

        {randomProperties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">جاري التحميل...</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {randomProperties.map((property, index) => {
              // 👇 اطبع قيمة الصورة الأولى
              console.log("IMAGE VALUE:", property.images?.[0]);

              return (
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
              );
            })}
          </div>
        )}
      </div>

      {/* ⭐ مودال التفاصيل */}
      {/* {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 font-bold text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {selectedProperty.title}
            </h2>
            <p className="text-gray-600">الموقع: {selectedProperty.location}</p>
            <p className="text-gray-600">السعر: {selectedProperty.price} ل.س</p>
            <p className="text-gray-600">المساحة: {selectedProperty.AREA} م²</p>

            <div className="flex overflow-x-auto gap-4 my-4">
              {selectedProperty.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://home00101-001-site1.ktempurl.com/${img}`}
                  className="h-32 rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={() =>
                navigate("/contact-agent", {
                  state: { property: selectedProperty },
                })
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              تواصل مع الوكيل
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Home;
