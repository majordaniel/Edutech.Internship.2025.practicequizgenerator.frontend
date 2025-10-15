import React, { useState, useEffect } from "react";
import { Award, BarChart2, FileText, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { quizzes } from "../Data/mockQuizzes";
import { users } from "@/Data/mockDB";
import { useUser } from "@/hooks/useUser";

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
    value: "78%",
    icon: BarChart2,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Last Quiz Score",
    value: "85%",
    icon: Award,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Average Performance",
    value: "80%",
    icon: BarChart2,
    color: "bg-orange-100 text-orange-500",
  },
];

const MockScreen = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user: loggedInUser } = useUser();
  const [user, setUser] = useState(null);

  // Get logged in user from localStorage or useUser hook
  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      // Try alternative methods to get user
      const loggedInEmail = localStorage.getItem('loggedInUserEmail');
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          console.error("Failed to parse userData:", err);
        }
      } else if (loggedInEmail) {
        const foundUser = users.find(u => u.email === loggedInEmail);
        if (foundUser) {
          setUser(foundUser);
        } else {
          // Fallback to default user if not found
          setUser(users[2]);
        }
      } else {
        // Fallback to default user if no email in localStorage
        setUser(users[2]);
      }
    }
  }, [loggedInUser]);

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
    // Navigate to Analytics screen, passing quizId as state
    navigate(`/analytics`, { state: { quizId } });
  } else if (action === "delete") {
    console.log("Delete quiz result");
  }
};


  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div>
            <span className="text-orange-500 font-medium">Welcome Back, </span>
            <span className="text-gray-700 font-medium">{user.name}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {user.studentId || "ST-ID-MAT-0098-23402025"}
          </div>
        </div>
        <div
          onClick={() => navigate("/create-quiz")}
          className="mt-4 md:mt-0 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm font-medium cursor-pointer"
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

      {/* Recent Quizzes Section */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Quizzes
          </h2>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/all-quizzes');
            }}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            View all
          </a>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-3">
          {quizzes.slice(0, 4).map((quiz) => (

            <div
              key={quiz.id}
              className="bg-white rounded-lg p-5 hover:bg-gray-50 transition border border-gray-100"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left Section - Quiz Info */}
                <div className="flex-1 min-w-0">
                  {/* Top Metadata */}
                  <div className="text-xs text-gray-500 mb-1">
                    {quiz.questions} Questions | {quiz.duration} minutes | {quiz.status}
                  </div>
                  
                  {/* Quiz Title & Subject */}
                  <h3 className="text-base font-semibold text-gray-900 mb-0.5 truncate">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-500">{quiz.subject}</p>
                </div>

                {/* Center Section - Performance */}
               <div className="flex-1 text-center flex-shrink-0">
                <p className="text-base font-semibold text-gray-900">
                        {quiz.score}%
                </p>
                </div>

                {/* Date Section */}
                <div className="text-center flex-shrink-0 min-w-20">
                  <p className="text-sm text-gray-500">
                    {new Date(quiz.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>

                {/* Action Button with Dropdown */}
                <div className="relative flex-shrink-0">
                  <button 
                    onClick={() => toggleDropdown(quiz.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm transition flex items-center gap-2"
                  >
                    View More
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === quiz.id && (
                    <>
                      {/* Backdrop to close dropdown when clicking outside */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setOpenDropdown(null)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                        <button
                          onClick={() => handleAction('view', quiz.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          View Result
                        </button>
                        <button
                          onClick={() => handleAction('retake', quiz.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          Retake Quiz
                        </button>
                        <button
                          onClick={() => handleAction('share', quiz.id)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          Analytics
                        </button>
                        <hr className="my-1 border-gray-200" />
                        <button
                          onClick={() => handleAction('delete', quiz.id)}
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
    </div>
  );
};

export default MockScreen;