import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-28 px-4 bg-black relative">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
      >
        {t("hero.headline")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
      >
        {t("hero.subtitle")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="flex flex-col sm:flex-row gap-6 justify-center"
      >
        <button className="px-10 py-4 rounded-lg bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40">
          {t("hero.cta.primary")}
        </button>
        <button className="px-10 py-4 rounded-lg border border-white text-white font-semibold text-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20">
          {t("hero.cta.secondary")}
        </button>
      </motion.div>
      <motion.div
        className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 bottom-8 z-20"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 16, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <ChevronDownIcon className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
} 