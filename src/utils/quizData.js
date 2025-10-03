// utils/quizData.js
export const getUserStats = (email) => {
  return JSON.parse(localStorage.getItem(`${email}-stats`)) || {
    activeCourses: 0,
    assignedExams: 0,
    examsTaken: 0,
    averagePerformance: 0
  };
};

export const getRecentQuizzes = (email) => {
  return JSON.parse(localStorage.getItem(`${email}-quizzes`)) || [];
};

export const addQuizResult = (email, quiz) => {
  const quizzes = getRecentQuizzes(email);
  quizzes.unshift(quiz); // latest first
  localStorage.setItem(`${email}-quizzes`, JSON.stringify(quizzes));

  const stats = getUserStats(email);
  stats.examsTaken = quizzes.length;
  stats.averagePerformance =
    quizzes.length === 0
      ? 0
      : Math.round(quizzes.reduce((sum, q) => sum + q.scorePercent, 0) / quizzes.length);
  localStorage.setItem(`${email}-stats`, JSON.stringify(stats));
};
