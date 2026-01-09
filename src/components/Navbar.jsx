import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const mainLinks = [
    { name: "الصفحة الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "تواصل معنا", path: "/contact" },
    { name: "توقع الأسعار", path: "/predict" },
  ];

  const realEstateLinks = [
    { name: "عقارات للبيع", path: "/sale" },
    { name: "عقارات للإيجار", path: "/rent" },
    { name: "عقارات للرهن", path: "/mortgage" },
    { name: "الوكلاء", path: "/agents" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-sky-700/70 via-cyan-600/70 to-emerald-600/70 backdrop-blur-md shadow-lg z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center w-full">

          {/* الشعار على أقصى اليسار */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/")}
          >
            <img
              src="https://img.icons8.com/fluency/48/ffffff/home.png"
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] animate-pulse"
            />
            <span className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 drop-shadow-md whitespace-nowrap">
              سيما للعقارات
            </span>
          </motion.div>

          {/* روابط سطح المكتب على اليمين مع مسافة معقولة من الشعار */}
          <div className="hidden md:flex items-center gap-2 ml-8">
            {[...mainLinks, ...realEstateLinks].map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="relative px-3 py-2 rounded-lg font-semibold text-white whitespace-nowrap
                  hover:text-transparent bg-clip-text hover:bg-gradient-to-r hover:from-sky-300 hover:via-cyan-200 hover:to-emerald-200 transition duration-300 ease-in-out
                  after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <span className="px-3 py-2 rounded-xl font-semibold bg-white/20 text-cyan-100 backdrop-blur-sm border border-cyan-300/30 shadow-sm whitespace-nowrap">
                  {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 transition duration-300 shadow-md whitespace-nowrap"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-xl font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 hover:scale-105 hover:shadow-cyan-400/50 transition duration-300 whitespace-nowrap"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 hover:scale-105 hover:shadow-yellow-400/50 transition duration-300 whitespace-nowrap"
                >
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>

          {/* أيقونة الموبايل */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-white"
            >
              {isOpen ? <HiX className="w-8 h-8" /> : <HiMenu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-sky-700 via-cyan-600 to-emerald-600 shadow-lg px-4 py-4 space-y-3 animate-fade-in backdrop-blur-md">
          {[...mainLinks, ...realEstateLinks].map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-lg font-semibold text-white hover:bg-white/20 hover:text-cyan-100 transition duration-300 whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}

          {currentUser ? (
            <>
              <span className="block px-4 py-2 rounded-lg font-semibold bg-white/20 text-cyan-100 shadow-sm whitespace-nowrap">
                {currentUser.name}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-90 transition duration-300 shadow-md whitespace-nowrap"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-400 to-cyan-400 hover:scale-105 transition duration-300 shadow-md whitespace-nowrap"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-400 hover:scale-105 transition duration-300 shadow-md whitespace-nowrap"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
