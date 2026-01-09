import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب الوكلاء من قاعدة البيانات
  const fetchAgents = async () => {
    try {
      const res = await fetch(
        "http://home00101-001-site1.ktempurl.com/get_agents.php"
      );
      const data = await res.json();

      if (data.status === "success") {
        setAgents(data.agents);
      }
    } catch (err) {
      console.error("خطأ أثناء تحميل الوكلاء:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
        وكلاؤنا المعتمدون ⭐
      </h2>

      {loading && (
        <p className="text-center text-gray-600 text-xl">
          جاري تحميل بيانات الوكلاء...
        </p>
      )}

      {!loading && agents.length === 0 && (
        <p className="text-center text-gray-600 text-xl">
          لا يوجد وكلاء حالياً
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {agents.map((agent, i) => {
          const whatsappLink = `https://wa.me/${agent.phone}`;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {agent.name}
              </h3>
              <p className="text-gray-600 mb-3">{agent.location}</p>

              {/* ⭐ تصنيف الوكيل */}
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={22}
                    className={`${
                      index < Math.round(agent.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-2">
                التقييم: {agent.rating} / 5
              </p>

              {/* زر واتساب */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition inline-block"
              >
                💬 تواصل مع الوكيل ({agent.phone})
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
