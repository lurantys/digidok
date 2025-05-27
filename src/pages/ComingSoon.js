import { motion } from "framer-motion";

export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-white/80">
          Coming Soon
        </p>
      </motion.div>
    </div>
  );
} 