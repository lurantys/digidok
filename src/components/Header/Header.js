import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to switch mode in AuthModal if already on /auth
  const handleAuthNav = (mode) => (e) => {
    if (location.pathname === "/auth") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("digidok-auth-mode", { detail: { mode } }));
    } else {
      navigate("/auth", { state: { mode } });
    }
  };

  return (
    <header className="w-full flex items-center justify-between py-6 px-8 md:px-16 bg-black sticky top-0 z-30 border-b-2 border-white/20 shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-heading font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
          {t("app.title")}
        </Link>
      </div>
      <nav className="hidden md:flex gap-8 text-base font-medium text-white/80">
        {/* Minimal nav, can add more links here */}
      </nav>
      <div className="flex items-center gap-4">
        <LanguageToggle />
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }} className="inline-block">
          <Link
            to="/auth"
            state={{ mode: "login" }}
            onClick={handleAuthNav("login")}
            className="px-5 py-2 rounded-md text-white font-semibold hover:bg-white/10 transition-colors"
          >
            {t("header.login")}
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }} transition={{ type: 'tween', duration: 0.13 }} className="inline-block">
          <Link
            to="/auth"
            state={{ mode: "signup" }}
            onClick={handleAuthNav("signup")}
            className="px-5 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors ml-2"
          >
            {t("header.cta")}
          </Link>
        </motion.div>
      </div>
    </header>
  );
} 