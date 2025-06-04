import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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

  const getDifficultyLevel = (score) => {
    if (score >= 90) return "Expert";
    if (score >= 70) return "Advanced";
    if (score >= 50) return "Intermediate";
    return "Beginner";
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setMouse({ x: px / rect.width, y: py / rect.height, px, py });
    x.set(px);
    y.set(py);
    xGreen.set(rect.width - px);
    yGreen.set(rect.height - py);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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
    setTimerActive(false);
  };

  const renderQuizContent = () => {
    if (!quizStarted) {
      return (
        <div className="flex flex-col items-center justify-center bg-softWhite border border-digitalBlue/20 rounded-2xl shadow-lg p-10 max-w-xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-digitalBlue mb-6 text-center">AI in Healthcare Quiz</h1>
          <p className="text-xl text-slateGray mb-8 max-w-2xl mx-auto text-center">
            Test your knowledge of AI applications in healthcare with our comprehensive quiz.
            You'll have 5 minutes to complete 13 questions covering various aspects of healthcare AI.
          </p>
          <button
            onClick={handleStartQuiz}
            className="px-8 py-4 bg-fuchsiaAccent text-softWhite font-semibold rounded-lg hover:bg-fuchsiaAccent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsiaAccent/40"
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (showResults) {
      const percentage = (score / quizQuestions.length) * 100;
      const difficultyLevel = getDifficultyLevel(percentage);

      return (
        <div className="flex flex-col items-center justify-center bg-softWhite border border-digitalBlue/20 rounded-2xl shadow-lg p-10 max-w-xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-digitalBlue mb-6 text-center">Quiz Results</h2>
          <div className="space-y-4 text-slateGray text-center">
            <p className="text-xl">Score: <span className="text-digitalBlue font-bold">{score}</span> out of {quizQuestions.length}</p>
            <p className="text-xl">Percentage: <span className="text-digitalBlue font-bold">{percentage.toFixed(1)}%</span></p>
            <p className="text-xl">Difficulty Level: <span className="text-digitalBlue font-bold">{difficultyLevel}</span></p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-fuchsiaAccent text-softWhite font-semibold rounded-lg hover:bg-fuchsiaAccent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsiaAccent/40"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white text-digitalBlue font-semibold rounded-lg border border-digitalBlue/20 hover:bg-digitalBlue/10 transition-colors focus:outline-none focus:ring-2 focus:ring-digitalBlue/40"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];

    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-slateGray">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
          <div className="text-slateGray">
            Time Left: <span className="font-semibold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="bg-softWhite border border-digitalBlue/20 rounded-2xl shadow-lg p-8 backdrop-blur">
          <h3 className="text-xl font-semibold text-digitalBlue mb-6 text-center">{question.question}</h3>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border font-medium transition-colors text-slateGray border-digitalBlue/20 bg-white hover:bg-digitalBlue/10 focus:outline-none focus:ring-2 focus:ring-digitalBlue/40 ${
                  selectedAnswer === index
                    ? "bg-digitalBlue/10 text-digitalBlue border-digitalBlue"
                    : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-digitalBlue font-semibold hover:text-fuchsiaAccent transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 text-digitalBlue" />
            Back to Home
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-fuchsiaAccent/40 ${
              selectedAnswer === null
                ? "bg-fuchsiaAccent/20 text-softWhite/40 cursor-not-allowed"
                : "bg-fuchsiaAccent text-softWhite hover:bg-fuchsiaAccent/80"
            }`}
          >
            {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-midnightNavy relative overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 py-16">
        {renderQuizContent()}
      </div>
    </div>
  );
} 