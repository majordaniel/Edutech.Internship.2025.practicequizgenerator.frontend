import { useState } from "react";
import {
  Loader2,
  Folder,
  Upload,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Stepper({ label, min = 1, max = 100, value, onChange }) {
  const updateValue = (newVal) => {
    if (newVal >= min && newVal <= max) onChange(newVal);
  };

  return (
    <div>
      <label className="block text-gray-900 text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
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
            <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={() => updateValue(value - 1)}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1.5">
        Minimum {min}. Maximum {max} {label.toLowerCase()}
      </p>
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
  const [modalStep, setModalStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = (e) => setUploadedFiles(Array.from(e.target.files));
  const removeFile = (index) =>
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));

  const handleReviewSelections = () => setShowModal(false);

  const isFormValid =
    course &&
    course !== "" &&
    (source === "past" || (source === "upload" && uploadedFiles.length > 0));

  const getButtonClasses = () => {
    if (isLoading) return "bg-gray-300 cursor-not-allowed";
    if (isFormValid)
      return "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-300/50";
    return "bg-gray-400 cursor-not-allowed";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError(
        "Please select a Course and ensure the Question Source is ready (e.g., file uploaded)."
      );
      return;
    }

    if (source === "past") {
      navigate("/quiz", { state: { mode: "past-exams" } });
      return;
    }

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
          {
            QuestionType: questionType,
            NumberOfQuestions: Number(numQuestions),
          },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      if (!response.data?.succeeded)
        throw new Error(response.data?.message || "Failed to generate quiz");

      const questions = response.data.data?.questions || [];
      if (!questions.length) throw new Error("No questions returned from backend");

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
        const existingQuizzes =
          JSON.parse(localStorage.getItem(`${email}-quizzes`)) || [];
        localStorage.setItem(
          `${email}-quizzes`,
          JSON.stringify([...existingQuizzes, newQuiz])
        );
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
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div
        className={`transition-all duration-300 relative ${
          showModal ? "opacity-40 pointer-events-none blur-sm" : ""
        }`}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Set up Mock Exam
          </h1>
          <div className="inline-flex items-center gap-2">
            <span className="text-gray-900 text-sm font-semibold">Program</span>
            <span className="text-gray-700 text-sm font-medium">
              Computer Science
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-gray-900 text-sm font-semibold mb-2">
                Select Course
              </label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-orange-500"
              >
                <option value="">Choose a course from your program</option>
                <option value="course1">Introduction to Programming</option>
                <option value="course2">
                  Data Structures and Algorithms
                </option>
                <option value="course3">Web Development Fundamentals</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-semibold mb-3">
                Question Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: "mcq",
                    label: "Multiple Choice Questions",
                    desc: "Quick Selection Options",
                  },
                  {
                    value: "theory",
                    label: "Theory",
                    desc: "Written Explanation",
                  },
                  {
                    value: "mixed",
                    label: "Mixed",
                    desc: "Both Types Combined",
                  },
                ].map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-start gap-2 p-4 border rounded cursor-pointer hover:border-orange-300 transition-colors ${
                      questionType === type.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="questionType"
                      value={type.value}
                      checked={questionType === type.value}
                      onChange={(e) => setQuestionType(e.target.value)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {type.label}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {type.desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Stepper
                label="Number of Questions"
                min={1}
                max={50}
                value={numQuestions}
                onChange={setNumQuestions}
              />
              <Stepper
                label="Timer (mins)"
                min={10}
                max={120}
                value={timer}
                onChange={setTimer}
              />
            </div>

            <div className="space-y-3">
              <label className="block text-gray-900 text-sm font-semibold mb-3">
                Question Source
              </label>
              <label
                className={`flex items-start gap-3 p-4 border rounded cursor-pointer hover:border-orange-300 transition-colors ${
                  source === "past"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="source"
                  value="past"
                  checked={source === "past"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-0.5"
                />
                <Folder className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">
                    From Past Exams
                  </span>
                  <span className="text-xs text-gray-500">
                    Generate questions from Question Bank database
                  </span>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 border rounded cursor-pointer hover:border-orange-300 transition-colors ${
                  source === "upload"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="source"
                  value="upload"
                  checked={source === "upload"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-0.5"
                />
                <Upload className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-gray-900 block">
                    Upload Course Material
                  </span>
                  <span className="text-xs text-gray-500">
                    AI Generate questions from your uploaded materials
                  </span>
                </div>
              </label>
            </div>

            {source === "upload" && (
              <div className="border-2 border-dashed border-orange-400 rounded-lg p-8 text-center bg-white transition-all duration-300">
                <Upload className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                {uploadedFiles.length === 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Upload Course Material
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      PDF, DOC, DOCX, TXT files supported
                    </p>
                    <label htmlFor="fileInput" className="inline-block cursor-pointer">
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-50 inline-block font-medium">
                        Choose a File
                      </span>
                    </label>
                  </>
                )}
                {uploadedFiles.length > 0 && (
                  <>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {uploadedFiles[0].name.replace(/\.[^/.]+$/, "")}
                    </p>
                    <p className="text-xs text-green-600 mb-3">
                      Uploaded{" "}
                      <span className="font-medium">
                        {uploadedFiles[0].name}
                      </span>
                    </p>
                    <span className="bg-gray-100 border border-gray-300 text-gray-500 px-6 py-2 rounded text-sm inline-block font-medium cursor-not-allowed opacity-60">
                      Choose a File
                    </span>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => removeFile(0)}
                        className="text-red-500 text-xs hover:text-red-700 ml-2 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${getButtonClasses()} flex items-center justify-center gap-2 text-sm`}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Generating Quiz..." : "Generate and Start Quiz"}
            </button>

            <p className="text-xs text-center text-gray-500 -mt-3">
              Please fill in all required fields to continue
            </p>
          </form>
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[60]">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
              {modalStep === 1 && (
                <>
                  <Loader2 className="animate-spin w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Generating Quiz...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please wait while we prepare your questions
                  </p>
                </>
              )}
              {modalStep === 2 && (
                <>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-orange-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Mock Quiz Successfully Configured
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Your quiz is ready to start with the selected settings.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleReviewSelections}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm"
                    >
                      Review Selections
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        navigate("/quiz", {
                          state: {
                            mode: "generated",
                            questions: window.generatedQuestions,
                            timer,
                            quizName: course || "Quiz",
                            subject: course || "General",
                          },
                        });
                      }}
                      className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium text-sm"
                    >
                      Start Quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
