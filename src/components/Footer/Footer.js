import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer({ transparent, separator }) {
  const year = new Date().getFullYear();

  // Hooks must always be called
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (transparent) return null;

  return (
    <>
      {separator && (
        <div className="w-full h-px bg-slateGray/30 mb-0" />
      )}
      <footer className="w-full bg-midnightNavy text-softWhite py-10 px-4 flex items-center justify-center text-sm relative z-10">
        <div className="text-center w-full">
          © {year} DigiDok. All rights reserved.
        </div>
      </footer>
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 bg-digitalBlue/20 hover:bg-digitalBlue/40 text-softWhite p-3 rounded-full shadow-lg backdrop-blur border border-digitalBlue/30 transition-colors"
            aria-label="Back to top"
          >
            <ChevronUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
} 