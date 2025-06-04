import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Quizzes() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnightNavy">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-digitalBlue mb-6">
          AI in Healthcare Quizzes
        </h1>
        <p className="text-xl text-softWhite/80 mb-12">
          Test your knowledge and track your progress in AI healthcare expertise
        </p>
        
        <div className="grid gap-6">
          <Link to="/quiz">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-digitalBlue/10 hover:bg-digitalBlue/20 border border-digitalBlue/20 rounded-xl p-6 flex items-center gap-4 transition-colors"
            >
              <div className="bg-digitalBlue/20 p-3 rounded-lg">
                <AcademicCapIcon className="w-8 h-8 text-digitalBlue" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-softWhite mb-1">
                  AI Healthcare Expertise Assessment
                </h3>
                <p className="text-slateGray">
                  Comprehensive quiz to evaluate your understanding of AI in healthcare
                </p>
              </div>
            </motion.div>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slateGray text-sm mt-4"
          >
            More quizzes coming soon...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 