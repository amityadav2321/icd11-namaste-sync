import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-pink-600 to-purple-700 animate-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 text-center text-white"
      >
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-lg mb-6 opacity-90">Oops! Page not found</p>
        <Link
          to="/"
          className="px-6 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors font-semibold"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
