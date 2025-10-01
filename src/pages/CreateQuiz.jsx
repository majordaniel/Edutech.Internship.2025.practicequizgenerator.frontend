
import { useState } from "react";
import { Folder, Upload, AlertCircle, Loader2, ChevronUp, ChevronDown } from "lucide-react";

// Stepper Component
function Stepper({ label, min = 1, max = 100, value, onChange }) {
  const updateValue = (newVal) => {
    if (newVal >= min && newVal <= max) {
      onChange(newVal);
    }
  };

  return (
    <div>
      <label className="block text-gray-900 text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded px-3 py-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => updateValue(Number(e.target.value))}
          className="flex-1 outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="flex flex-col ml-2">
          <button
            type="button"
            onClick={() => updateValue(value + 1)}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <ChevronUp className="w-4 h-4 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => updateValue(value - 1)}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Minimum {min}. Maximum {max} {label.toLowerCase()}</p>
    </div>
  );
}

export default function CreateQuiz() {
  const [course, setCourse] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [numQuestions, setNumQuestions] = useState(10);
  const [timer, setTimer] = useState(30);
  const [source, setSource] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name} is not supported. Use PDF, DOC, DOCX, or TXT.`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} exceeds 10MB limit.`);
        return false;
      }
      return true;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
    setError("");
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};
    if (!course) errors.course = "Please select a course";
    if (source === "upload" && uploadedFiles.length === 0)
      errors.files = "Please upload at least one file";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setError("");
    setValidationErrors({});

    if (!validateForm()) {
      setError("Please fix the errors above before continuing");
      return;
    }

    setShowModal(true);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log("Quiz generated successfully!", {
        course,
        questionType,
        numQuestions,
        timer,
        source,
        files: uploadedFiles.map((f) => f.name),
      });
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      console.error("Error:", err);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Set up Mock Exam</h1>
        <div className="flex justify-center gap-2">
          <span className="bg-orange-500 text-white px-4 py-1.5 rounded text-sm font-medium">
            Program
          </span>
          <span className="bg-white text-gray-700 px-4 py-1.5 rounded text-sm border border-gray-300">
            Computer Science
          </span>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-5">
          {/* Course Selection */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Select Course
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full border rounded px-3 py-2.5 text-sm ${
                validationErrors.course ? "border-red-500" : "border-gray-300"
              } ${!course ? "text-gray-500" : "text-gray-900"}`}
            >
              <option value="">Choose a course from your program</option>
              <option value="course1">Introduction to Programming [Python, Java, or C++]</option>
              <option value="course2">Data Structures and Algorithms</option>
              <option value="course3">Web Development Fundamentals</option>
            </select>
            {validationErrors.course && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.course}
              </p>
            )}
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Question Type
            </label>
            <div className="flex gap-3">
              {["mcq", "theory", "mixed"].map((type) => (
                <label
                  key={type}
                  className="flex-1 flex items-start gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="questionType"
                    value={type}
                    checked={questionType === type}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-0.5">
                      {type === "mcq"
                        ? "Multiple Choice Questions"
                        : type === "theory"
                        ? "Theory"
                        : "Mixed"}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {type === "mcq"
                        ? "Quick Selection questions"
                        : type === "theory"
                        ? "Written explanation"
                        : "Both Types Combined"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Number of Questions & Timer with Stepper */}
          <div className="grid grid-cols-2 gap-4">
            <Stepper
              label="Number of Questions"
              min={1}
              max={50}
              value={numQuestions}
              onChange={setNumQuestions}
            />
            <Stepper
              label="Timer"
              min={10}
              max={120}
              value={timer}
              onChange={setTimer}
            />
          </div>

          {/* Question Source */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">
              Question Source
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  value="past"
                  checked={source === "past"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-0.5"
                />
                <Folder className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-0.5">
                    From Past Exams
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Generate Questions from Question Bank database
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  value="upload"
                  checked={source === "upload"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-0.5"
                />
                <Upload className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-0.5">
                    Upload Course Material
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    AI Generate questions from your uploaded materials
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* File Upload */}
          {source === "upload" && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">
                Upload Course Material
              </p>
              <p className="text-xs text-gray-500 mb-3">
                PDF, DOC, DOCX, TXT (Max 10MB)
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="bg-gray-200 text-gray-700 px-5 py-2 rounded text-sm cursor-pointer hover:bg-gray-300 inline-block">
                  Choose a File
                </span>
              </label>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded text-sm"
                    >
                      <span className="text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-xs hover:text-red-700 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {validationErrors.files && (
                <p className="text-red-500 text-xs mt-2">
                  {validationErrors.files}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-3 rounded font-medium text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-orange-600"
            } flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              "Generate and Start Quiz"
            )}
          </button>
          <p className="text-xs text-gray-500 text-center">
            Please fill in all required fields to continue
          </p>
        </div>
      </div>

      {/* Loading Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Generating Mock Exam Questions
            </h2>
            <p className="text-sm text-gray-500 mb-4">Loading...</p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}