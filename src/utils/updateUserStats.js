export const updateUserStats = (userId, newQuizScore) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || storedUser.id !== userId) return;

  // Clone user to avoid direct mutation
  const updatedUser = { ...storedUser };

  // Find "Exam Taken" stat
  const examTakenIndex = updatedUser.stats.findIndex(
    (s) => s.title === "Exam Taken"
  );
  if (examTakenIndex !== -1) {
    updatedUser.stats[examTakenIndex].value = String(
      Number(updatedUser.stats[examTakenIndex].value) + 1
    );
  }

  // Find "Average Performance" stat
  const avgIndex = updatedUser.stats.findIndex(
    (s) => s.title === "Average Performance"
  );

  if (avgIndex !== -1) {
    const prevAvg = Number(updatedUser.stats[avgIndex].value);
    const examTaken = Number(updatedUser.stats[examTakenIndex].value);
    const newAvg = examTaken > 1
      ? Math.round((prevAvg * (examTaken - 1) + newQuizScore) / examTaken)
      : newQuizScore;

    updatedUser.stats[avgIndex].value = String(newAvg);
  }

  // Save updates
  localStorage.setItem("user", JSON.stringify(updatedUser));

  // Dispatch an event to trigger UI updates across pages
  window.dispatchEvent(new Event("userStatsUpdated"));
};
