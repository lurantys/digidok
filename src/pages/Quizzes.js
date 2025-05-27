import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Quizzes() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          AI in Healthcare Quizzes
        </h1>
        <p className="text-xl text-white/80 mb-12">
          Test your knowledge and track your progress in AI healthcare expertise
        </p>
        
        <div className="grid gap-6">
          <Link to="/quiz">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 flex items-center gap-4 transition-colors"
            >
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <AcademicCapIcon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white mb-1">
                  AI Healthcare Expertise Assessment
                </h3>
                <p className="text-white/60">
                  Comprehensive quiz to evaluate your understanding of AI in healthcare
                </p>
              </div>
            </motion.div>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-sm mt-4"
          >
            More quizzes coming soon...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 