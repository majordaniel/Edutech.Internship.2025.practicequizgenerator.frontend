import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import LaptopForm from "@/components/ui/laptopform.svg";
import { NotebookPen, BookOpen, FileText, CheckCircle, BarChart } from "lucide-react";
import { users } from "@/data/mockDB";

// StatCard component
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const loggedInUserId = location.state?.userId;

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const id = loggedInUserId || 1; // fallback to default user
      const foundUser = users.find(u => u.id === id);
      if (foundUser) {
        const mappedStats = foundUser.stats.map(stat => ({
          ...stat,
          icon:
            stat.icon === "BookOpen" ? BookOpen :
            stat.icon === "FileText" ? FileText :
            stat.icon === "CheckCircle" ? CheckCircle :
            BarChart,
        }));
        setUser({ name: foundUser.name, studentId: foundUser.studentId });
        setStats(mappedStats);
      }
    };
    fetchUser();
  }, [loggedInUserId]);

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Pass user to Navbar */}
        <Navbar user={user} />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Hero Banner */}
          <div className="mb-6">
            <span className="text-orange-500 font-medium">Welcome Back, </span>
            <span className="text-gray-700 font-medium">{user.name}</span>
            <div className="text-xs text-gray-500 mt-1">{user.studentId}</div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-8 rounded-2xl shadow-sm flex items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <h3 className="text-gray-600 text-sm mb-1">Introducing</h3>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                AI Practice Quiz Generator
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Create a custom quiz and get exam ready with practice questions tailored to you.
              </p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Take a Practice Quiz Now
              </button>
            </div>
            <div className="flex-shrink-0 ml-8">
              <img src={LaptopForm} alt="Laptop" className="w-96 h-auto" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
            </div>
            <div className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <NotebookPen className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-orange-500 mb-3">
                  Your Exam Activity & Progress
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    You haven't attempted any exams yet.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Start with a practice quiz to build confidence before your first test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
