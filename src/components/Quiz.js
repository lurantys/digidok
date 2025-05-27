import React, { useState, useEffect } from 'react';
import { getRandomQuestions, calculateScore, formatTime } from '../utils/quizUtils';
import { useLanguage } from '../contexts/LanguageContext';

const Quiz = ({ onComplete }) => {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleQuizComplete();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        handleQuizComplete();
      }
    }
  };

  const handleQuizComplete = () => {
    const results = calculateScore(answers, questions);
    setShowResults(true);
    onComplete(results);
  };

  if (questions.length === 0) {
    return <div className="text-center p-4">{t('common.loading')}</div>;
  }

  if (showResults) {
    const results = calculateScore(answers, questions);
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{t('quiz.results')}</h2>
        <div className="space-y-4">
          <p className="text-lg">{t('quiz.score')}: {results.score} {t('quiz.points')}</p>
          <p className="text-lg">{t('quiz.correctAnswers')}: {results.correctAnswers}/{results.totalQuestions}</p>
          <p className="text-lg">{t('quiz.percentage')}: {results.percentage.toFixed(1)}%</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('quiz.question')} {currentQuestion + 1} {t('common.of')} {questions.length}
        </h2>
        <div className="text-lg font-medium">
          {t('quiz.timeLeft')}: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg mb-2">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left rounded-lg border ${
                selectedAnswer === index
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {t('quiz.difficulty')}: {t(`quiz.${question.difficulty}`)}
        </div>
        <button
          className={`px-6 py-2 rounded-lg ${
            selectedAnswer !== null
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestion === questions.length - 1 ? t('quiz.finishQuiz') : t('quiz.nextQuestion')}
        </button>
      </div>
    </div>
  );
};

export default Quiz; 