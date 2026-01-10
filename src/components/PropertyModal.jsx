import { motion } from "framer-motion";

export default function PropertyModal({ property, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          {property.title}
        </h2>

        <p className="text-gray-600">📍 {property.location}</p>
        <p className="font-semibold">💰 {property.price} $</p>

        {property.images?.length > 0 && (
          <div className="flex gap-4 overflow-x-auto mt-4">
            {property.images.map((img, i) => (
              <img
                key={i}
                src={`https://home00101-001-site1.ktempurl.com/${img}`}
                className="h-40 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {property.agent_phone && (
          <a
            href={`https://wa.me/${property.agent_phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full bg-green-600 text-white py-3 rounded-xl text-center font-bold"
          >
            💬 التواصل مع الوكيل
          </a>
        )}
      </motion.div>
    </div>
  );
}
