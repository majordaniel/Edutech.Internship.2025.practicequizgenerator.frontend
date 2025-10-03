// MockScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, BarChart, BookOpen } from "lucide-react";
import { users } from "@/Data/mockDB";

// StatCard component
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
          {Icon && <Icon className="w-4 h-4" />}
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function MockScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("loggedInUserEmail");
    if (!email) return navigate("/login");

    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) return navigate("/login");

    setUser({ name: foundUser.name, studentId: foundUser.studentId });

    // Default stats
    const defaultStats = [
      { title: "Active Courses", value: 0, icon: FileText, color: "bg-orange-100 text-orange-500" },
      { title: "Assigned Exam", value: 0, icon: CheckCircle, color: "bg-orange-100 text-orange-500" },
      { title: "Exam Taken", value: 0, icon: BarChart, color: "bg-orange-100 text-orange-500" },
      { title: "Average Performance", value: "0%", icon: FileText, color: "bg-orange-100 text-orange-500" },
    ];

    // Load initial stats
    const storedStatsRaw = JSON.parse(localStorage.getItem(`${email}-stats`));
    setStats(Array.isArray(storedStatsRaw) ? storedStatsRaw : defaultStats);

    // Load initial quizzes
    const storedQuizzesRaw = JSON.parse(localStorage.getItem(`${email}-quizzes`));
    setRecentQuizzes(Array.isArray(storedQuizzesRaw) ? storedQuizzesRaw.slice(-5).reverse() : []);

    // Real-time updates every second
    const interval = setInterval(() => {
      const updatedStatsRaw = JSON.parse(localStorage.getItem(`${email}-stats`));
      setStats(Array.isArray(updatedStatsRaw) ? updatedStatsRaw : defaultStats);

      const updatedQuizzes = JSON.parse(localStorage.getItem(`${email}-quizzes`));
      setRecentQuizzes(Array.isArray(updatedQuizzes) ? updatedQuizzes.slice(-5).reverse() : []);
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 bg-gray-50">
      {/* Welcome Header and Create Quiz Button */}
      <div className="mt-4 ml-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <span className="text-orange-500 font-medium">Welcome, </span>
          <span className="text-gray-700 font-medium">{user.name}</span>
          <div className="text-xs text-gray-500">{user.studentId}</div>
        </div>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-medium text-sm"
          onClick={() => navigate("/create-quiz")}
        >
          Create New Quiz
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {Array.isArray(stats) &&
          stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Recent Quizzes Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 m-4 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Quizzes</h2>
        </div>

        <div className="p-4 flex flex-col items-center justify-center gap-2 min-h-[100px] text-gray-400 w-full">
          {recentQuizzes.length === 0 ? (
            <>
              <BookOpen className="w-8 h-8" />
              <p className="text-sm text-center">No activity yet. Take a quiz to get started!</p>
            </>
          ) : (
            recentQuizzes.map((quiz, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-50 rounded w-full"
              >
                <div className="text-left">
                  <p className="text-gray-500 text-xs">
                    {quiz.questions} Questions • {quiz.duration} mins
                  </p>
                  <h3 className="text-gray-900 font-medium">{quiz.name}</h3>
                  <p className="text-gray-500 text-sm">{quiz.subject}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-green-600 font-semibold text-sm">{quiz.score}</p>
                  <p className="text-gray-500 text-xs">{quiz.date}</p>
                  <button
                    className="mt-1 px-3 py-1 text-white text-xs bg-orange-500 rounded hover:bg-orange-600"
                    onClick={() => navigate("/quiz-result", { state: { quiz } })}
                  >
                    View Result
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
