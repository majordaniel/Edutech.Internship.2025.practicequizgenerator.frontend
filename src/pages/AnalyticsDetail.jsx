import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { FileText, BarChart2, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Reusable StatCard
function StatCard({ title, value, Icon }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-50">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function AnalyticsDetails() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const topicData = [
    { topic: "Topic 1", score: 95 },
    { topic: "Topic 2", score: 92 },
    { topic: "Topic 3", score: 94 },
    { topic: "Topic 4", score: 91 },
    { topic: "Topic 5", score: 93 },
    { topic: "Algorithm", score: 85 },
    { topic: "Topic 7", score: 90 },
    { topic: "Topic 8", score: 89 },
    { topic: "Topic 9", score: 90 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-orange-600 font-semibold">
            #04. Data Science{" "}
            <span className="text-gray-700 font-bold">- Analytics</span>
          </span>
          <p className="text-sm text-gray-500">
            Detailed analysis for Computer Science quiz
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Questions" value="12" Icon={FileText} />
        <StatCard title="Quiz Score" value="85%" Icon={TrendingUp} />
        <StatCard title="Average Score" value="78%" Icon={BarChart2} />
        <StatCard title="Time Spent" value="30mins" Icon={Clock} />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700 text-sm sm:text-base">
            Overall Performance Topic Breakdown
          </h2>
          <div className="text-xs text-gray-500">Insight</div>
        </div>

        {/* Clean Bar Chart (orange) */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={topicData}
            onMouseLeave={() => setActiveIndex(null)}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="topic" tick={{ fill: "#9ca3af" }} />
            <YAxis tick={{ fill: "#9ca3af" }} />
            <Tooltip cursor={false} contentStyle={{
            backgroundColor: "white",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            color: "#374151",   
        }}/>
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {topicData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === activeIndex ? "#F97316" : "#FED7AA"
                  } // Orange when active, light peach default
                  onMouseEnter={() => setActiveIndex(index)}
                  style={{ transition: "fill 0.3s ease" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Two Flexed Containers Below */}
        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          {/* Strong Areas */}
          <div className="flex-1 bg-[#E6F3E6] p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Strong Areas</h3>
            <ul className="space-y-2 list-none text-sm text-gray-700">
              {["Topic 1", "Topic 2", "Topic 3"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#28A745" }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas of Improvement */}
          <div className="flex-1 bg-[#FBEAEA] p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Areas of Improvement
            </h3>
            <ul className="space-y-2 list-none text-sm text-gray-700">
              {["Algorithm", "Deep Learning", "Data Cleaning"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#DC3545" }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
