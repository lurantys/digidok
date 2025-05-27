import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-28 px-4 bg-black relative">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
      >
        Master Digital Skills with Interactive Learning
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
      >
        Take our interactive quizzes to test your knowledge and learn at your own pace
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="flex flex-col sm:flex-row gap-6 justify-center"
      >
        <Link to="/quiz">
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 4px 24px 0 rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'tween', duration: 0.13 }}
            className="px-10 py-4 rounded-lg bg-white text-black font-semibold text-lg shadow hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Start Learning
          </motion.button>
        </Link>
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