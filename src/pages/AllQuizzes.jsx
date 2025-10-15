import React, { useState } from "react";
import { quizzes } from "../Data/mockQuizzes";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllQuizzes = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (quizId) => {
    setOpenDropdown(openDropdown === quizId ? null : quizId);
  };

  const handleAction = (action, quizId) => {
    console.log(`${action} for quiz ${quizId}`);
    setOpenDropdown(null);

    if (action === "view") {
      navigate(`/quiz-result/${quizId}`);
    } else if (action === "retake") {
      navigate(`/quiz/${quizId}`);
    } else if (action === "share") {
      navigate(`/analytics`, { state: { quizId } });
    } else if (action === "delete") {
      console.log("Delete quiz result");
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">All Quizzes</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-200 border border-gray-300 shadow-sm transition hover:bg-gray-300 active:bg-gray-400"
        >
          Back
        </button>
      </div>

      {/* All Quizzes List */}
      <div className="space-y-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg p-5 hover:bg-gray-50 transition border border-gray-100"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Quiz Info */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">
                  {quiz.questions} Questions | {quiz.duration} minutes | {quiz.status}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-0.5 truncate">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-500">{quiz.subject}</p>
              </div>

              {/* Score */}
              <div className="flex-1 text-center flex-shrink-0">
                <p className="text-base font-semibold text-gray-900">
                  {quiz.score}%
                </p>
              </div>

              {/* Date */}
              <div className="text-center flex-shrink-0 min-w-20">
                <p className="text-sm text-gray-500">
                  {new Date(quiz.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* View More Button + Dropdown */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => toggleDropdown(quiz.id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm transition flex items-center gap-2"
                >
                  View More
                  <ChevronDown className="w-4 h-4" />
                </button>

                {openDropdown === quiz.id && (
                  <>
                    {/* Backdrop for closing dropdown */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenDropdown(null)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      <button
                        onClick={() => handleAction("view", quiz.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        View Result
                      </button>
                      <button
                        onClick={() => handleAction("retake", quiz.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Retake Quiz
                      </button>
                      <button
                        onClick={() => handleAction("share", quiz.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Analytics
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={() => handleAction("delete", quiz.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Delete Result
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuizzes;
