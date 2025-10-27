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

// Reusable StatCard (Reverted to initial code structure)
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("performance"); // "performance" or "insight"

  // Data restored to initial code, using a score of 100 for visual match
  const topicData = [
    { topic: "Topic 1", score: 100 },
    { topic: "Topic 2", score: 100 },
    { topic: "Topic 3", score: 100 },
    { topic: "Topic 4", score: 100 },
    { topic: "Topic 5", score: 100 },
    { topic: "Topic 6", score: 100 },
    { topic: "Topic 7", score: 100 },
    { topic: "Topic 8", score: 100 },
    { topic: "Topic 9", score: 100 },
  ];

  const topicPerformanceData = [
    { name: "Algorithms", score: "2/5 (10%)" },
    { name: "Topic 2", score: "2/5 (10%)" },
    { name: "Topic 3", score: "2/5 (10%)" },
    { name: "Topic 4", score: "2/5 (10%)" },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header - Restored original styling and added back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {/* Restored initial Data Science heading format */}
          <span className="text-orange-600 font-semibold">
            #04. Data Science{" "}
            <span className="text-gray-700 font-bold">- Analytics</span>
          </span>
          <p className="text-sm text-gray-500">
            Detailed analysis for Computer Science quiz
          </p>
        </div>
        {/* Restored the "Back" button from the initial code */}
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>

      {/* Stat Cards - Restored original values and component (Icons changed to match original logic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Attempt" value="12" Icon={FileText} />
        <StatCard title="Total Average Score" value="78%" Icon={BarChart2} />
        <StatCard title="Last Quiz Score" value="85%" Icon={TrendingUp} />
        <StatCard title="Average Time Spent" value="1hr 45mins" Icon={Clock} />
      </div>

      {/* Chart Section with Tabs - Updated to closely match the image's tab and spanning layout */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        {/* The Tabs Section that spans the top, similar to the image's structure */}
        <div className="flex bg-gray-50 rounded-t-xl border-b border-gray-200">
          <button
            onClick={() => setActiveTab("performance")}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-all ${
              activeTab === "performance"
                ? "text-gray-900 border-r border-gray-200"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Overall Performance Topic Breakdown
          </button>

          <button
            onClick={() => setActiveTab("insight")}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-all ${
              activeTab === "insight"
                ? "text-gray-900"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Insight
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "performance" ? (
            <>
              {/* Bar Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={topicData}
                  onMouseLeave={() => setActiveIndex(null)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="topic" tick={{ fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#9ca3af" }} domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      color: "#374151",
                    }}
                    formatter={(value) => [`${value}%`, "Score"]}
                  />
                  {/* Restored original Bar Chart Colors */}
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {topicData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === activeIndex ? "#F97316" : "#FED7AA"} // Reverted to original colors
                        onMouseEnter={() => setActiveIndex(index)}
                        style={{ transition: "fill 0.3s ease" }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Strong Areas / Areas of Improvement - Styling and text updated to match image */}
              <div className="flex flex-col lg:flex-row gap-4 mt-6">
                {/* Strong Areas - Background color updated to closely match the image's light green/white box */}
                <div className="flex-1 bg-green-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Strong Areas
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {["Course Topic", "Course Topic", "Course Topic"].map((t, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#28A745" }}
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas of Improvement - Background color updated to closely match the image's light red/pink box */}
                <div className="flex-1 bg-red-50 p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Areas of Improvement
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {["Course Topic", "Course Topic", "Course Topic"].map((t, index) => (
                      <li key={index} className="flex items-center gap-3">
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
            </>
          ) : (
            // Insight Section (Kept for completeness)
            <>
              <div className="flex flex-col items-center justify-center py-8">
                {/* Speedometer SVG (Kept for structure) */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  <svg width="87" height="86" viewBox="0 0 87 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M77.118 64.5043C78.5731 65.4185 80.5043 64.997 81.3271 63.4883C84.4719 57.722 86.2282 51.3015 86.4392 44.7279C86.6834 37.1222 84.8501 29.5918 81.1317 22.9262C77.4132 16.2607 71.9466 10.7055 65.3049 6.84334C58.6632 2.98115 51.0913 0.954183 43.383 0.974981C35.6747 0.99578 28.1141 3.06358 21.4939 6.96155C14.8737 10.8595 9.43789 16.4441 5.7564 23.1296C2.07491 29.8151 0.283383 37.3553 0.569681 44.9596C0.817136 51.5321 2.60897 57.9432 5.78583 63.6926C6.61687 65.1966 8.55012 65.6075 10.0001 64.6855C11.4744 63.7481 11.8857 61.7923 11.0632 60.2509C8.50942 55.4647 7.06847 50.1613 6.86393 44.7286C6.61961 38.2393 8.14847 31.8046 11.2902 26.0992C14.4319 20.3939 19.0708 15.6281 24.7204 12.3017C30.3699 8.97518 36.8221 7.21055 43.4002 7.1928C49.9783 7.17506 56.4402 8.90484 62.1081 12.2008C67.776 15.4967 72.4411 20.2374 75.6144 25.9257C78.7877 31.614 80.3522 38.0403 80.1438 44.5309C79.9693 49.9645 78.5578 55.2755 76.0306 60.0754C75.2167 61.6214 75.6386 63.5749 77.118 64.5043Z" fill="#F8EFE2"/>
                      <path d="M50.66 56.0522C50.66 59.7024 47.7009 62.6614 44.0507 62.6614C40.4005 62.6614 37.4414 59.7024 37.4414 56.0522C37.4414 52.402 40.4005 49.4429 44.0507 49.4429C47.7009 49.4429 50.66 52.402 50.66 56.0522ZM39.9805 56.0522C39.9805 58.3001 41.8028 60.1224 44.0507 60.1224C46.2986 60.1224 48.1209 58.3001 48.1209 56.0522C48.1209 53.8042 46.2986 51.9819 44.0507 51.9819C41.8028 51.9819 39.9805 53.8042 39.9805 56.0522Z" fill="#FF4B00"/>
                      <path d="M33.9131 12.4043L34.9679 15.4377" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M44.3271 11.1642V13.918" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M55.0674 12.5412L53.6904 15.0197" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M64.1543 17.2228L62.502 19.4259" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M71.5898 24.6584L69.1113 26.5861" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M76.5468 33.7459L73.793 35.1229" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M77.9228 44.2105H75.1689" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M75.9961 54.4001L73.5176 53.5739" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M72.1406 63.4877C71.9203 63.4877 70.3965 62.2026 69.6621 61.56" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M16.5117 63.2123L18.9902 61.8354" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M11.8301 54.4001L14.8593 53.2985" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M10.7295 44.2105H13.7587" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M12.1055 34.0213L15.4101 34.5721" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M17.0635 24.6584L19.542 26.5861" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M24.499 17.2228L26.4267 19.7013" stroke="#505660" strokeWidth="0.550774" strokeLinecap="square"/>
                      <path d="M61.9448 25.35L51.678 51.0015L44.8255 47.0372L61.9448 25.35Z" fill="url(#paint0_linear_632_4225)"/>
                      <path d="M69.4868 13.6634C70.6335 12.352 70.4928 10.3461 69.0871 9.31718C61.6714 3.88913 52.6541 0.946344 43.366 0.975031C33.0138 1.007 23.0214 4.72815 15.227 11.4539C7.43272 18.1797 2.36074 27.4577 0.944148 37.5812C-0.329229 46.6812 1.42805 55.9141 5.90411 63.9053C6.74373 65.4043 8.67913 65.8042 10.1237 64.8741C11.5926 63.9283 11.9926 61.9702 11.1613 60.4336C7.53012 53.7217 6.12132 46.0227 7.1835 38.432C8.39239 29.7928 12.7207 21.8751 19.3723 16.1354C26.0239 10.3957 34.5512 7.22013 43.3857 7.19285C51.1825 7.16877 58.7557 9.59829 65.0244 14.0865C66.4155 15.0825 68.3607 14.9514 69.4868 13.6634Z" fill="#FF4B00"/>
                      <defs>
                        <linearGradient id="paint0_linear_632_4225" x1="61.9448" y1="25.35" x2="48.2517" y2="49.0194" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FF4B00"/>
                          <stop offset="1" stopColor="#FF4B00" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                  </svg>
                </div>

                {/* Grade Display */}
                <div className="text-center mb-8">
                  <h3 className="text-gray-500 text-lg mb-2">Your Grade:</h3>
                  <p className="text-5xl font-bold text-gray-900">85%</p>
                </div>

                {/* Detailed Attempt History moved here */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
                  <h2 className="font-semibold text-gray-700 text-lg mb-6">
                    Detailed Attempt History
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-700 text-base mb-4">
                        Topic Performance
                      </h3>
                      <div className="space-y-3">
                        {topicPerformanceData.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{item.name}</span>
                              <span className="text-sm text-gray-600">{item.score}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full"
                                style={{ width: "20%" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-700 text-base mb-4">
                        Detailed Breakdown
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Correct Answers:</span>
                          <span className="text-sm font-semibold text-green-600">75%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Wrong Answers:</span>
                          <span className="text-sm font-semibold text-red-600">25%</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-orange-200">
                          <span className="text-sm text-gray-700">Time Efficiency:</span>
                          <span className="text-sm font-semibold text-gray-900">
                            1:30mins
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}