import { quizData } from '../data/quizData';

export const getRandomQuestions = (count = 5) => {
  const shuffled = [...quizData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calculateScore = (answers, questions) => {
  let score = 0;
  let correctAnswers = 0;
  
  answers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      score += getQuestionPoints(questions[index].difficulty);
      correctAnswers++;
    }
  });

  return {
    score,
    correctAnswers,
    totalQuestions: questions.length,
    percentage: (correctAnswers / questions.length) * 100
  };
};

export const getQuestionPoints = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 1;
  }
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 