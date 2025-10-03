import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "@/components/StatCard";
import LaptopForm from "@/components/ui/laptopform.svg"; // ensure correct path
import { FileText, CheckCircle, BarChart, BookOpen } from "lucide-react";
import { users } from "@/Data/mockDB";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("loggedInUserEmail");
    if (!email) return navigate("/login");

    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) return navigate("/login");

    setUser({ name: foundUser.name, studentId: foundUser.studentId });

    // Load stats from localStorage or use default
    const storedStatsRaw = JSON.parse(localStorage.getItem(`${email}-stats`));
    const defaultStats = [
      { title: "Active Courses", value: 0, icon: FileText, color: "bg-orange-100 text-orange-500" },
      { title: "Assigned Exam", value: 0, icon: CheckCircle, color: "bg-orange-100 text-orange-500" },
      { title: "Exam Taken", value: 0, icon: BarChart, color: "bg-orange-100 text-orange-500" },
      { title: "Average Performance", value: "0%", icon: FileText, color: "bg-orange-100 text-orange-500" },
    ];

    setStats(Array.isArray(storedStatsRaw) ? storedStatsRaw : defaultStats);
  }, [navigate]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen w-full">Loading...</div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Welcome Header */}
      <div className="mt-4 ml-4">
        <span className="text-orange-500 font-medium">Welcome Back, </span>
        <span className="text-gray-700 font-medium">{user.name}</span>
        <div className="text-xs text-gray-500">{user.studentId}</div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 m-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 w-full p-4 md:p-6">
          <h3 className="text-gray-600 text-sm mb-1">Introducing</h3>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
            AI Practice Quiz Generator
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
            Create a custom quiz and get exam ready with practice questions tailored to you.
          </p>
          <button
            className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-orange-600 font-medium"
            onClick={() => navigate("/create-quiz")}
          >
            Take a Practice Quiz Now
          </button>
        </div>
        <div className="flex-1 p-4 flex justify-center md:justify-end">
          <img src={LaptopForm} alt="Laptop" className="w-full max-w-sm md:max-w-md h-auto" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Activities Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 m-4 flex flex-col">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
        </div>
        <div className="p-4 flex flex-col items-center justify-center gap-2 min-h-[100px] text-gray-400">
          <BookOpen className="w-8 h-8" />
          <p className="text-sm text-center">No activity yet. Take a quiz to get started!</p>
        </div>
      </div>
    </div>
  );
}
