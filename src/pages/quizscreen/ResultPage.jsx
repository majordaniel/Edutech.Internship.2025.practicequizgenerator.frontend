import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function ResultPage() {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("quizResult") || "{}");
  const { questions, answers, timer } = savedData;

  if (!questions?.length) return <p>No results available</p>;

  const score = Object.keys(answers).reduce((acc, key) => {
    const question = questions[key];
    return question.options[question.correctOptionIndex] === answers[key] ? acc + 1 : acc;
  }, 0);

  const percent = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Quiz Completed 🎉</h1>
          <div className="flex items-center gap-2 text-gray-600 font-semibold">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{`${Math.floor(timer / 60).toString().padStart(2,'0')}:${(timer % 60).toString().padStart(2,'0')}`}</span>
          </div>
        </div>

        {/* Score Summary */}
        <div className="flex gap-6 mb-6 flex-wrap">
          <div className="flex-1 bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p className="text-gray-500 text-sm">Total Questions</p>
            <p className="text-2xl font-bold text-gray-800">{questions.length}</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p className="text-gray-500 text-sm">Answered Correctly</p>
            <p className="text-2xl font-bold text-green-500">{score}</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-xl text-center shadow-sm">
            <p className="text-gray-500 text-sm">Score %</p>
            <p className="text-2xl font-bold text-orange-500">{percent}%</p>
          </div>
        </div>

        {/* Question Review */}
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns = answers[i];
            const correct = q.options[q.correctOptionIndex];
            const isCorrect = userAns === correct;
            return (
              <div key={i} className="bg-gray-50 p-4 rounded-xl">
                <p className="font-semibold mb-2">Q{i+1}: {q.question}</p>
                {q.options.map((opt, idx) => {
                  const bg = opt === correct ? "bg-green-100" : "bg-gray-50";
                  return (
                    <div key={idx} className={`p-2 rounded-md mb-1 flex justify-between items-center border ${bg}`}>
                      <span>{opt}</span>
                      {opt === correct && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  );
                })}
                <p className={`mt-1 font-medium ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                  Your Answer: {userAns || "Not answered"} ({isCorrect ? "Correct" : "Incorrect"})
                </p>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => navigate("/dashboard")} className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium">Back Dashboard</button>
          <button onClick={() => navigate("/create-quiz")} className="px-6 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600">Retake Quiz</button>
        </div>
      </div>
    </div>
  );
}
