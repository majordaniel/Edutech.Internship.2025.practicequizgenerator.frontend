import React from "react";

export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && (
          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

      {/* <div className="text-3xl font-bold text-gray-900 mb-3">{value}</div> */}

      {/* Optional Progress Bar
      {typeof progress === "number" && (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
} */}
