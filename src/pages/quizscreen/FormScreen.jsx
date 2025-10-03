import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormScreen() {
  const [showUpload, setShowUpload] = useState(false);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just mock exam data
    const examData = {
      title: title || "Mock Exam",
      duration: duration || 60,
      file: fileName || null,
    };

    // Navigate to QuizScreen and pass data
    navigate("/quiz", { state: examData });
  };

  return (
    <div className="w-full p-6">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Set Up Mock Exam
        </h2>

        {/* Program & Subject */}
        <div className="flex justify-between mb-4">
          <p className="font-medium text-gray-700">Program: Computer Science</p>
          <p className="font-medium text-gray-700">Course: CSC 301</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter exam title"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 60"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Upload Section Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowUpload(!showUpload)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {showUpload ? "Remove Upload Section" : "Add Upload Section"}
            </button>
          </div>

          {/* Upload Section */}
          {showUpload && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-600
                  hover:file:bg-indigo-100"
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded: <span className="font-medium">{fileName}</span>
                </p>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Create Exam
          </button>
        </form>
      </div>
    </div>
  );
}
