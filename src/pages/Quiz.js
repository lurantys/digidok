import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";

const quizQuestions = [
  // Basic Concepts (30% - 4 questions)
  {
    question: "What is the fundamental difference between traditional programming and machine learning in healthcare?",
    options: [
      "Machine learning requires more computational power",
      "Machine learning learns patterns from data rather than following explicit rules",
      "Machine learning is only used for image processing",
      "Machine learning is less accurate than traditional programming"
    ],
    correctAnswer: 1,
    category: "AI Fundamentals",
    difficulty: "Basic"
  },
  {
    question: "Which of the following is NOT a primary type of data used in healthcare AI?",
    options: [
      "Structured electronic health records",
      "Medical imaging data",
      "Social media posts",
      "Genomic sequencing data"
    ],
    correctAnswer: 2,
    category: "AI Fundamentals",
    difficulty: "Basic"
  },
  {
    question: "What is the primary purpose of data preprocessing in healthcare AI?",
    options: [
      "To reduce storage costs",
      "To ensure data quality and consistency for model training",
      "To make data more visually appealing",
      "To speed up data entry"
    ],
    correctAnswer: 1,
    category: "AI Fundamentals",
    difficulty: "Basic"
  },
  {
    question: "Which of these is a key characteristic of supervised learning in healthcare?",
    options: [
      "It requires no human input",
      "It uses labeled data to train models",
      "It only works with imaging data",
      "It cannot be used for prediction"
    ],
    correctAnswer: 1,
    category: "AI Fundamentals",
    difficulty: "Basic"
  },

  // Intermediate Applications (40% - 5 questions)
  {
    question: "What is the primary challenge in integrating AI with existing Electronic Health Records (EHR) systems?",
    options: [
      "Cost of implementation",
      "Data interoperability and standardization",
      "Staff training requirements",
      "Hardware compatibility"
    ],
    correctAnswer: 1,
    category: "Clinical Applications",
    difficulty: "Intermediate"
  },
  {
    question: "Which regulatory framework specifically addresses AI medical devices in the United States?",
    options: [
      "HIPAA only",
      "FDA's Software as a Medical Device (SaMD) framework",
      "GDPR",
      "ISO 13485"
    ],
    correctAnswer: 1,
    category: "Regulatory",
    difficulty: "Intermediate"
  },
  {
    question: "What is the primary purpose of clinical decision support systems (CDSS) with AI?",
    options: [
      "To replace physician decision-making",
      "To assist healthcare providers in making evidence-based decisions",
      "To automate all clinical processes",
      "To reduce staffing needs"
    ],
    correctAnswer: 1,
    category: "Clinical Applications",
    difficulty: "Intermediate"
  },
  {
    question: "Which of these is a critical consideration in AI bias mitigation for healthcare?",
    options: [
      "Using only recent data",
      "Ensuring diverse and representative training data",
      "Implementing faster algorithms",
      "Reducing model complexity"
    ],
    correctAnswer: 1,
    category: "Ethics",
    difficulty: "Intermediate"
  },
  {
    question: "What is the primary purpose of the AUC-ROC curve in evaluating medical AI models?",
    options: [
      "To measure processing speed",
      "To assess model performance across different thresholds",
      "To calculate implementation costs",
      "To determine data storage requirements"
    ],
    correctAnswer: 1,
    category: "Technical Implementation",
    difficulty: "Intermediate"
  },

  // Advanced/Expert Level (30% - 4 questions)
  {
    question: "In federated learning for healthcare, what is the primary advantage over traditional centralized learning?",
    options: [
      "Faster training time",
      "Preservation of data privacy while enabling collaborative model training",
      "Lower computational requirements",
      "Simpler implementation"
    ],
    correctAnswer: 1,
    category: "Advanced Topics",
    difficulty: "Expert"
  },
  {
    question: "Which of these is a critical requirement for Explainable AI (XAI) in clinical settings?",
    options: [
      "Real-time visualization of model architecture",
      "Ability to explain predictions in terms understandable to healthcare professionals",
      "Complete transparency of training data",
      "Open-source code availability"
    ],
    correctAnswer: 1,
    category: "Advanced Topics",
    difficulty: "Expert"
  },
  {
    question: "What is the primary challenge in validating AI models for rare medical conditions?",
    options: [
      "Computational complexity",
      "Limited availability of training data and difficulty in establishing ground truth",
      "Cost of implementation",
      "Staff training requirements"
    ],
    correctAnswer: 1,
    category: "Technical Implementation",
    difficulty: "Expert"
  },
  {
    question: "Which of these represents the most significant challenge in implementing AI for real-time clinical decision support?",
    options: [
      "Hardware costs",
      "Balancing model accuracy with interpretability and regulatory compliance",
      "Staff resistance",
      "Data storage requirements"
    ],
    correctAnswer: 1,
    category: "Advanced Topics",
    difficulty: "Expert"
  }
];

function AnimatedBackground({ xBlueStyle, yBlueStyle, xGreenStyle, yGreenStyle }) {
  return (
    <>
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          x: xBlueStyle,
          y: yBlueStyle,
          width: "38rem",
          height: "38rem",
          background: "#2563eb",
          opacity: 0.18,
          filter: "blur(120px)",
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          x: xGreenStyle,
          y: yGreenStyle,
          width: "30rem",
          height: "30rem",
          background: "#22c55e",
          opacity: 0.13,
          filter: "blur(100px)",
          borderRadius: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

export default function Quiz() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, px: 0, py: 0 });
  const containerRef = useRef(null);
  const x = useMotionValue(window.innerWidth / 2);
  const y = useMotionValue(window.innerHeight / 2);
  const xGreen = useMotionValue(window.innerWidth / 2);
  const yGreen = useMotionValue(window.innerHeight / 2);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate difficulty level based on score
  const getDifficultyLevel = (score) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage <= 40) return t('quiz.difficulty.easy');
    if (percentage <= 65) return t('quiz.difficulty.medium');
    if (percentage <= 80) return t('quiz.difficulty.hard');
    return t('quiz.difficulty.expert');
  };

  // Blobs follow cursor in px
  const xBlueStyle = useTransform(x, v => `${v - 304}px`); // 304 = 38rem/2
  const yBlueStyle = useTransform(y, v => `${v - 304}px`);
  const xGreenStyle = useTransform(xGreen, v => `${v - 240}px`); // 240 = 30rem/2
  const yGreenStyle = useTransform(yGreen, v => `${v - 240}px`);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setMouse({ x: px / rect.width, y: py / rect.height, px, py });
    x.set(px);
    y.set(py);
    // For green, mirror horizontally and vertically
    xGreen.set(rect.width - px);
    yGreen.set(rect.height - py);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(300);
    setTimerActive(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
      setTimerActive(false);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setTimeLeft(300);
  };

  const renderQuizContent = () => {
    if (!quizStarted) {
      return (
        <>
          <h1 className="text-3xl font-heading font-bold text-white mb-6 text-center">
            {t('quiz.title')}
          </h1>
          <p className="text-white/60 text-center mb-8">
            {t('quiz.description')}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleStartQuiz}
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t('quiz.startQuiz')}
            </button>
            <button
              onClick={() => navigate("/quizzes")}
              className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              {t('quiz.backToQuizzes')}
            </button>
          </div>
        </>
      );
    }

    if (showResults) {
      const difficultyLevel = getDifficultyLevel(score);
      return (
        <>
          <h1 className="text-3xl font-heading font-bold text-white mb-6 text-center">
            {t('quiz.results')}
          </h1>
          <div className="text-center mb-8">
            <p className="text-white/60 mb-2">
              {t('quiz.score')}: {score} {t('quiz.outOf')} {quizQuestions.length}
            </p>
            <p className="text-xl font-semibold text-white">
              {t('quiz.level')}: {difficultyLevel}
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleRestartQuiz}
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              {t('quiz.tryAgain')}
            </button>
            <button
              onClick={() => navigate("/quizzes")}
              className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-colors"
            >
              {t('quiz.backToQuizzes')}
            </button>
          </div>
        </>
      );
    }

    const question = quizQuestions[currentQuestion];
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="text-white/40 text-sm">
            {t('quiz.question')} {currentQuestion + 1} {t('common.of')} {quizQuestions.length}
          </div>
          <div className="text-white/40 text-sm">
            {t('quiz.timeLeft')}: {formatTime(timeLeft)}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-white">
              {question.question}
            </h2>
            <span className="text-sm text-white/40">
              {t(`quiz.difficulty.${question.difficulty.toLowerCase()}`)}
            </span>
          </div>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white/80"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            selectedAnswer === null
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {currentQuestion === quizQuestions.length - 1 ? t('quiz.finishQuiz') : t('quiz.nextQuestion')}
        </button>
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      <AnimatedBackground
        xBlueStyle={xBlueStyle}
        yBlueStyle={yBlueStyle}
        xGreenStyle={xGreenStyle}
        yGreenStyle={yGreenStyle}
      />
      
      <button
        onClick={() => navigate("/quizzes")}
        className="absolute top-6 left-6 text-white/60 hover:text-white text-2xl font-bold z-10"
        aria-label={t('common.back')}
      >
        <ArrowLeftIcon className="w-8 h-8" />
      </button>

      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-black/90 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur"
        >
          {renderQuizContent()}
        </motion.div>
      </div>
    </div>
  );
} 