import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { questions } from "../../data/quizQuestions";

export default function QuizModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [categoryScores, setCategoryScores] = useState({
    "AI Fundamentals": 0,
    "Clinical Applications": 0,
    "Advanced Topics": 0
  });
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    // Reset states when quiz opens
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(300);
    setQuizCompleted(false);
    setShowExplanation(false);
    setCategoryScores({
      "AI Fundamentals": 0,
      "Clinical Applications": 0,
      "Advanced Topics": 0
    });
    setIsLoading(true);
    
    // Shuffle questions when quiz starts
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setIsLoading(false);
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      // Update category scores
      setCategoryScores(prev => ({
        ...prev,
        [shuffledQuestions[currentQuestion].category]: prev[shuffledQuestions[currentQuestion].category] + 1
      }));
    }
    
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getExpertiseLevel = (score) => {
    const percentage = (score / shuffledQuestions.length) * 100;
    if (percentage >= 81) return "Expert";
    if (percentage >= 66) return "Advanced";
    if (percentage >= 41) return "Intermediate";
    return "Beginner";
  };

  const getCategoryPercentage = (category) => {
    const categoryQuestions = shuffledQuestions.filter(q => q.category === category).length;
    return ((categoryScores[category] / categoryQuestions) * 100).toFixed(1);
  };

  if (!isOpen) return null;
  if (isLoading || !shuffledQuestions.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-black border border-white/20 rounded-2xl p-8 w-full max-w-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {!quizCompleted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-white/60">
                Question {currentQuestion + 1} of {shuffledQuestions.length}
              </div>
              <div className="text-white/60">
                Time: {formatTime(timeLeft)}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm text-white/60 mb-2">
                {shuffledQuestions[currentQuestion].category} • {shuffledQuestions[currentQuestion].difficulty}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {shuffledQuestions[currentQuestion].question}
              </h3>
              <div className="space-y-3">
                {shuffledQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedAnswer === index
                        ? index === shuffledQuestions[currentQuestion].correctAnswer
                          ? "bg-green-500/20 border-green-500"
                          : "bg-red-500/20 border-red-500"
                        : "bg-white/5 hover:bg-white/10 border-white/10"
                    } border`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <p className="text-white/80">
                  {shuffledQuestions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}

            {selectedAnswer !== null && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                {currentQuestion + 1 === shuffledQuestions.length ? "Finish Quiz" : "Next Question"}
              </motion.button>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Quiz Completed!</h2>
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                {getExpertiseLevel(score)}
              </div>
              <p className="text-white/80">
                Score: {score} out of {shuffledQuestions.length} ({((score / shuffledQuestions.length) * 100).toFixed(1)}%)
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white">Category Breakdown</h3>
              {Object.keys(categoryScores).map(category => (
                <div key={category} className="text-white/80">
                  {category}: {getCategoryPercentage(category)}%
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
} 