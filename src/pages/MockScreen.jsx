import React from "react";
import QuizCard from "../components/QuizCard";
import { quizzes } from "../Data/mockQuizzes";
import { Award, BarChart2, FileText, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/mockDB";



// Inline StatCard component
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div
          className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}


// Stats data
const stats = [
  {
    title: "Total Quizzes",
    value: quizzes.length,
    icon: FileText,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Average Score",
    value: "78%", // optionally compute from quizzes
    icon: BarChart2,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Last Quiz Score",
    value: "85%", // placeholder
    icon: Award,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Average Performance",
    value: "80%", // placeholder
    icon: BarChart2,
    color: "bg-orange-100 text-orange-500",
  },
];



const MockScreen = () => {
  const navigate = useNavigate();
  const user = users[2];
  
  return (
    <div className="space-y-6 mt-6"> {/* Remove min-h-screen bg-gray-50 px-6 */}
      {/* Remove the max-w-7xl wrapper - Layout handles this now */}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="text-orange-500 font-medium">Welcome Back, </span>
          <span className="text-gray-700 font-medium">{user.name}</span>
          <div className="text-xs text-gray-500 mt-1">
            ST-ID-MAT-0098-23402025
          </div>
        </div>
        <div
          onClick={() => navigate("/create-quiz")}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium cursor-pointer"
        >
          Create New Quiz
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Rest of content... */}

      
    <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Quizzes
            </h2>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              View all
            </a>
          </div>
        {/* Recent Quizzes Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
  {/* <div className="p-6 border-b border-gray-100">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">Recent Quizzes</h2>
      <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        View all
      </a>
    </div>
  </div> */}

  <div className="divide-y divide-gray-100">
    {quizzes.map((quiz) => (
      <div
        key={quiz.id}
        className="flex justify-between items-center p-6 hover:bg-gray-50 transition"
      >
                  <div className="mb-2 md:mb-0 flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{quiz.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {quiz.subject} • {quiz.questions} Questions • {quiz.duration} • {quiz.status}
                    </p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-green-600 font-semibold text-sm">{quiz.score}</p>
                      <p className="text-gray-500 text-xs">{quiz.date}</p>
                    </div>
                    <div className="bg-orange-500 text-white px-3 py-2 rounded-lg flex items-center hover:bg-orange-600 transition text-sm font-medium cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" /> View Result
                    </div>
                  </div>
                </div>
            ))}
            </div>
             {/* : (
            <div className="text-center text-gray-500 py-12">
              No quizzes available yet. Start one to see it here.
            </div>
          ) */}
        </div>
      </div>
  );
};


export default MockScreen;