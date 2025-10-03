import React from "react";
import { NotebookPen } from "lucide-react";

export default function RecentQuizzes({ quizzes }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
      </div>
      <div className="p-6 md:p-12 flex flex-col space-y-4">
        {quizzes.length === 0 ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <NotebookPen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-orange-500 mb-2">Your Exam Activity & Progress</h3>
            <p className="text-gray-600 text-sm">You haven’t attempted any quizzes yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {quizzes.map((quiz, index) => (
              <div key={index} className="flex justify-between items-center p-6 hover:bg-gray-50 transition">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{quiz.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {quiz.subject} • {quiz.questions} Questions • {quiz.duration} • {quiz.status}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end space-y-1">
                  <p className="text-green-600 font-semibold text-sm">{quiz.score}</p>
                  <p className="text-gray-500 text-xs">{quiz.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
