import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-28 px-4 bg-midnightNavy relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-heading font-bold text-softWhite mb-6 text-center"
        >
          Master Digital Skills with Interactive Learning
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-xl md:text-2xl text-slateGray mb-12 max-w-2xl mx-auto text-center"
        >
          Take our interactive quizzes to test your knowledge and learn at your own pace
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center w-full"
        >
          <Link to="/quiz">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 4px 24px 0 #71D3E3" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'tween', duration: 0.13 }}
              className="px-10 py-4 rounded-lg bg-fuchsiaAccent text-softWhite font-semibold text-lg shadow hover:bg-fuchsiaAccent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsiaAccent/40"
            >
              Start Learning
            </motion.button>
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20 flex items-center justify-center"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 16, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <ChevronDownIcon className="w-8 h-8 text-fuchsiaAccent" />
      </motion.div>
    </section>
  );
} 