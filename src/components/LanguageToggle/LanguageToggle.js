import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const targetLang = language === "en" ? "fr" : "en";
  const targetFlag = targetLang === "en" ? "🇬🇧" : "🇫🇷";

  const handleToggle = () => {
    setLoading(true);
    i18n.changeLanguage(targetLang).then(() => {
      setTimeout(() => setLoading(false), 500);
    });
    toggleLanguage();
  };

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1 rounded-full border border-white text-white text-sm font-medium bg-black hover:bg-white/10 transition-colors flex items-center gap-2 relative overflow-hidden min-w-[56px]"
      aria-label={language === "en" ? "Switch to French" : "Passer en anglais"}
      style={{ transition: 'background 0.3s, border 0.3s' }}
      disabled={loading}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span
            key="spinner"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5 flex items-center justify-center"
          >
            <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </motion.span>
        ) : (
          <>
            <motion.span
              key={targetLang + "-flag"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-lg"
            >
              {targetFlag}
            </motion.span>
            <motion.span
              key={targetLang + "-code"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-semibold transition-colors duration-300"
            >
              {targetLang.toUpperCase()}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </button>
  );
} 