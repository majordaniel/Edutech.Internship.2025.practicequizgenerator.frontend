import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LaptopForm from "@/components/ui/laptopform.svg";
import {
  NotebookPen,
  BookOpen,
  FileText,
  CheckCircle,
  BarChart,
  Award
} from "lucide-react";
import { users } from "@/data/mockDB";

// StatCard
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div
          className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUserId = location.state?.userId;

  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const id = loggedInUserId || 1;
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        const mappedStats = foundUser.stats.map((stat) => ({
          ...stat,
          icon:
            stat.icon === "BookOpen"
              ? BookOpen
              : stat.icon === "FileText"
              ? FileText
              : stat.icon === "CheckCircle"
              ? CheckCircle
              : BarChart,
        }));
        setUser({ name: foundUser.name, studentId: foundUser.studentId });
        setUserStats(mappedStats);
      }
    };
    fetchUser();
  }, [loggedInUserId]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full mt-4 flex flex-col space-y-6">
      {/* Welcome */}
      <div>
        <span className="text-orange-500 font-medium">Welcome Back, </span>
        <span className="text-gray-700 font-medium">{user.name}</span>
        <div className="text-xs text-gray-500 mt-1">{user.studentId}</div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex-1 w-full">
          <h3 className="text-gray-600 text-sm mb-1">Introducing</h3>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            AI Practice Quiz Generator
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 md:mb-6">
            Create a custom quiz and get exam ready with practice questions
            tailored to you.
          </p>
         <button
            onClick={() => navigate("/create-quiz")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-medium"
          >
            Take a Practice Quiz Now
          </button>
        </div>
        <div className="flex-1 mt-6 md:mt-0 md:ml-6 flex justify-center md:justify-end">
          <img
            src={LaptopForm}
            alt="Laptop"
            className="w-full max-w-sm md:max-w-md h-auto"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {userStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Activity
          </h2>
        </div>
        <div className="p-6 md:p-12 text-center flex flex-col items-center">
          <div className="mb-6 md:mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <NotebookPen className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">
            Your Exam Activity & Progress
          </h3>
          <div className="space-y-2 max-w-xl">
            <p className="text-gray-600 text-sm">
              You haven't attempted any exams yet.
            </p>
            <p className="text-gray-600 text-sm">
              Start with a practice quiz to build confidence before your first
              test.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}