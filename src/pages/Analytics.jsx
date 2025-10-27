import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, Clock, FileText, TrendingUp } from "lucide-react";

// Reusable Button
function Button({ children, onClick, variant = "primary", className = "" }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100";
  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

// Reusable Card
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl shadow-sm relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

// StatCard (matching MockScreen)
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div
          className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center bg-opacity-10`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function Analytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState("7d");

  // Mock chart data
  const data = [
    { name: "Data science", score: 40 },
    { name: "Machine Learning", score: 80 },
    { name: "Web development", score: 60 },
    { name: "Database design", score: 90 },
    // { name: "Test 5", score: 75 },
    // { name: "Test 6", score: 50 },
    // { name: "Test 7", score: 95 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-orange-600 font-semibold">
            Data Science Mock Exam{" "}
            <span className="text-gray-700 font-bold">– Analytics</span>
          </span>
          <p className="text-sm text-gray-500">
            Detailed analysis for Computer Science quiz
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition"
        >Back</button>      
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Attempt"
          value="12"
          icon={FileText}
          color="text-orange-500"
        />
        <StatCard
          title="Total Average Score"
          value="80%"
          icon={TrendingUp}
          color="text-orange-500"
        />
        <StatCard
          title="Last Quiz Score"
          value="85%"
          icon={BarChart2}
          color="text-orange-500"
        />
        <StatCard
          title="Average Time Spent"
          value="1hr 45mins"
          icon={Clock}
          color="text-orange-500"
        />
      </div>

      {/* Chart Section */}
      <Card className="p-6">
        {/* background square pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:30px_30px]"
          style={{ opacity: 0.6 }}
        ></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
              Course Quiz Attempt History
            </h2>
            <div className="space-x-2">
              {["7d", "30d", "90d", "1yr"].map((r) => (
                <Button
                  key={r}
                  variant={selectedRange === r ? "primary" : "outline"}
                  className={`text-xs ${
                    selectedRange === r ? "" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedRange(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detailed Attempt History */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
          Detailed Attempt History
        </h2>
        {[
          { id: 4, course: "Data Science", score: 40, subject: "Computer Science" },
          { id: 3, course: "Machine Learning", score: 80, subject: "Computer Science" },
          { id: 2, course: "Web Development", score: 90, subject: "Computer Science" },
          { id: 1, course: "Database Design", score: 60, subject: "Computer Science" }
        ].map(({ id, course, score, subject }) => (
          <Card
            key={id}
            className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
          >
            <div>
              <p className="text-xs text-gray-400">
                20 Questions | 30 minutes | Quiz Completed | 14/09/2025
              </p>
              <h3 className="font-semibold text-gray-700 text-sm">
                0{id} {course}
              </h3>
              <p className="text-xs text-gray-500">{subject}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold text-gray-700">{score}%</p>
              <Button onClick={() => navigate("/analytics-details")}>Analytics</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
