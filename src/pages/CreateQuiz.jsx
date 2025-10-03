import { useState } from "react";
import { Loader2, Folder, Upload, AlertCircle, ChevronUp, ChevronDown, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Stepper({ label, min = 1, max = 100, value, onChange }) {
  const updateValue = (newVal) => {
    if (newVal >= min && newVal <= max) onChange(newVal);
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
          <button type="button" onClick={() => updateValue(value + 1)} className="p-0.5 hover:bg-gray-100 rounded">
            <ChevronUp className="w-4 h-4 text-gray-600" />
          </button>
          <button type="button" onClick={() => updateValue(value - 1)} className="p-0.5 hover:bg-gray-100 rounded">
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
  const [modalStep, setModalStep] = useState(1); // 1 = loading, 2 = success
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => setUploadedFiles(Array.from(e.target.files));
  const removeFile = (index) => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (numQuestions <= 5) {
      setError("Number of questions must be greater than 5");
      return;
    }

    setShowModal(true);
    setModalStep(1);
    setIsLoading(true);

    try {
      let response;

      if (source === "upload") {
        const formData = new FormData();
        uploadedFiles.forEach((file) => formData.append("File", file));
        formData.append("QuestionType", questionType);
        formData.append("NumberOfQuestions", Number(numQuestions));

        response = await axios.post(
          "http://apppracticequiz.runasp.net/api/Quiz/generatefromfile",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://apppracticequiz.runasp.net/api/Quiz/generatefromfile",
          { QuestionType: questionType, NumberOfQuestions: Number(numQuestions) },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      if (!response.data?.succeeded) throw new Error(response.data?.message || "Failed to generate quiz");
      const questions = response.data.data?.questions || [];
      if (!questions.length) throw new Error("No questions returned from backend");

      // Save quiz to localStorage for real-time updates
      const email = localStorage.getItem("loggedInUserEmail");
      if (email) {
        const newQuiz = {
          id: Date.now(),
          name: `${course || "Quiz"} Practice Quiz`,
          subject: course || "General",
          questions: questions.length,
          duration: `${timer} mins`,
          status: "Completed",
          score: "0%",
          scoreValue: 0,
          date: new Date().toLocaleDateString(),
        };
        const existingQuizzes = JSON.parse(localStorage.getItem(`${email}-quizzes`)) || [];
        localStorage.setItem(`${email}-quizzes`, JSON.stringify([...existingQuizzes, newQuiz]));
      }

      setModalStep(2);
      window.generatedQuestions = questions;
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError(err.message || "Failed to generate quiz. Please try again.");
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Set up Mock Exam</h1>
        <div className="inline-flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-500 rounded-2xl text-white-500 text-sm font-medium">
            Program
          </div>
          <div className="inline-flex items-center gap-1 px-4 py-2 font-medium">
            Computer Science
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 mt-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">Select Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm"
            >
              <option value="">Choose a course from your program</option>
              <option value="course1">Introduction to Programming</option>
              <option value="course2">Data Structures and Algorithms</option>
              <option value="course3">Web Development Fundamentals</option>
            </select>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">Question Type</label>
            <div className="flex gap-3">
              {["mcq", "theory", "mixed"].map((type) => (
                <label
                  key={type}
                  className="flex-1 flex items-start gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50"
                >
                  <input type="radio" name="questionType" value={type} checked={questionType === type} onChange={(e) => setQuestionType(e.target.value)} />
                  <div className="ml-2">
                    <p className="text-sm font-medium">{type === "mcq" ? "Multiple Choice" : type === "theory" ? "Theory" : "Mixed"}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Number of Questions & Timer */}
          <div className="grid grid-cols-2 gap-4">
            <Stepper label="Number of Questions" min={1} max={50} value={numQuestions} onChange={setNumQuestions} />
            <Stepper label="Timer (mins)" min={10} max={120} value={timer} onChange={setTimer} />
          </div>

          {/* Question Source */}
          <div className="space-y-3">
            <label className="block text-gray-900 text-sm font-medium mb-2">Question Source</label>
            <div className="border border-gray-300 rounded p-4 w-[60%] ml-4">
              <label className="flex items-l gap-3 cursor-pointer">
                <input type="radio" name="source" value="past" checked={source === "past"} onChange={(e) => setSource(e.target.value)} />
                <Folder className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">From Past Exams</span>
              </label>
            </div>
            <div className="border border-gray-300 rounded p-4 w-[60%] ml-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="source" value="upload" checked={source === "upload"} onChange={(e) => setSource(e.target.value)} />
                <Upload className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Upload Course Material</span>
              </label>
            </div>
          </div>

          {/* File Upload */}
          {source === "upload" && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Upload Course Material</p>
              <label htmlFor="fileInput" className="inline-block cursor-pointer">
                <input id="fileInput" type="file" multiple accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" />
                <span className="bg-gray-200 text-gray-700 px-5 py-2 mt-1 rounded text-sm hover:bg-gray-300 inline-block">Choose Files</span>
              </label>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2 text-left">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded text-sm">
                      <div className="truncate mr-4">{file.name}</div>
                      <button type="button" onClick={() => removeFile(index)} className="text-red-500 text-xs hover:text-red-700 ml-2">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded font-medium text-white ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"} flex items-center justify-center gap-2`}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Generating Quiz..." : "Generate and Start Quiz"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            {modalStep === 1 && (
              <>
                <Loader2 className="animate-spin w-10 h-10 text-orange-500 mx-auto mb-4" />
                <p className="text-gray-700">Generating Quiz...</p>
              </>
            )}
            {modalStep === 2 && (
              <>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold">Mock Quiz Successfully Configured</h2>
                <p className="text-sm text-gray-500 mb-4">Your quiz is ready to start with the selected settings.</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      navigate("/form", { state: { questions: window.generatedQuestions, timer } });
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Review Selections
                  </button>
                  {/* Start Quiz */}
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/quiz", {
                  state: {
                    questions: window.generatedQuestions,
                    timer: timer, // send in minutes directly
                    quizName: course || "Quiz",
                    subject: course || "General",
                  },
                });
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Start Quiz
            </button>

                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
