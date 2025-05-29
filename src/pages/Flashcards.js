import React from "react";
import FlashcardContainer from "../components/Flashcards/FlashcardContainer";
import { motion } from "framer-motion";

export default function Flashcards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full"
    >
      <FlashcardContainer />
    </motion.div>
  );
} 