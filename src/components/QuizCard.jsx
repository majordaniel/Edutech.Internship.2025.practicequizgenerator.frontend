import React from "react";

const QuizCard = ({ quiz }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <div>
        <p className="text-sm text-gray-500">
          {quiz.questions} questions | {quiz.duration} minutes | {quiz.status}
        </p>
        <h2 className="text-lg font-semibold">{quiz.title}</h2>
        <h4 className="text-sm text-gray-400">{quiz.subject}</h4>
      </div>
      <div className="text-right">
        <p className="text-green-500 font-semibold">{quiz.score}%</p>
        <p className="text-gray-400 text-sm">{quiz.date}</p>
        <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
          View Result
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
