import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
      <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
    </Routes>
  );
};

export default AnimatedRoutes;
