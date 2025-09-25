import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LaptopForm from "@/components/ui/laptopform.svg";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-8 rounded-2xl shadow-sm flex items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <div className="mb-4">
                <span className="text-orange-500 font-medium">Welcome Back, </span>
                <span className="text-gray-700 font-medium">Monday</span>
                <div className="text-xs text-gray-500 mt-1">
                  ST ID-MAT-0098-23400205
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-600 text-sm mb-1">Introducing</h3>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Practice Quiz Generator
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Create a custom quiz and get exam ready with practice questions tailored to you.
                </p>
              </div>

              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Take a Practice Quiz Now
              </button>
            </div>

            {/* Hero Illustration */}
            <div className="flex-shrink-0 ml-8">
              <div className="w-80 h-40 flex items-center justify-center">
                <img src={LaptopForm} alt="Laptop" className="h-100 w-150 " />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Active Courses</h3>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-xs">📚</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">00</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Assigned Exam</h3>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-xs">📝</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">00</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Exam Taken</h3>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-xs">✓</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">00</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Average Performance</h3>
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-xs">📊</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">00</div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
            </div>

            <div className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Activity SVG</span>
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
