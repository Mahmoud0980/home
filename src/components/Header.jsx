import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";  
function Header({ onFilter }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "عقارات للبيع", path: "/sale" },
    { name: "عقارات للإيجار", path: "/rent" },
    { name: "عقارات للرهن", path: "/mortgage" },
    { name: "الوكلاء", path: "/agents" },
  ];

  return (
    <header className="relative h-screen overflow-hidden">
      {/* الخلفية المتحركة */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80"
          alt="Real Estate Background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-400/30 via-cyan-400/20 to-emerald-400/30 mix-blend-overlay backdrop-blur-[2px]"
          style={{ pointerEvents: "none" }}
        ></div>
        <div
          className="absolute inset-0 bg-black/40"
          style={{ pointerEvents: "none" }}
        ></div>
      </motion.div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-black/30 text-white z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative">
          {/* روابط Navbar */}
          <div className="flex items-center space-x-6 text-lg font-medium">
            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => navigate(link.path)}
                className="hover:text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* زر القائمة للجوال */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>

        {/* قائمة الجوال */}
        {menuOpen && (
          <div className="md:hidden bg-black/70 backdrop-blur-sm flex flex-col items-center py-4 space-y-4 text-lg z-20">
            {links.map((link, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(link.path);
                  setMenuOpen(false);
                }}
                className="hover:text-cyan-400 transition"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* شريط البحث فوق الصورة */}
      <div className="absolute top-[100px] w-full flex justify-center z-20 px-6">
        <div className="w-full max-w-4xl">
          <SearchBar onFilter={onFilter} />

        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-5xl md:text-6xl font-extrabold drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]"
        >
          اكتشف عقارك المثالي بسهولة 🌟
        </motion.h2>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="mt-4 text-lg md:text-2xl font-medium text-cyan-100 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)] max-w-2xl"
        >
          ابحث عن أفضل العقارات للبيع أو الإيجار أو الرهن في كل المدن السورية
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/sale")}
          className="mt-8 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-cyan-400/50 transition duration-300"
        >
          تصفح العقارات
        </motion.button>
      </div>

      {/* منحنى زخرفي */}
      <svg
        className="absolute bottom-0 w-full z-0"
        viewBox="0 0 1440 150"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,138.7C672,139,768,149,864,154.7C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,150L0,150Z"
        ></path>
      </svg>
    

    </header>
  );
}

export default Header;
