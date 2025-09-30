import { useState } from "react";
import { Folder, Upload, AlertCircle, Loader2 } from "lucide-react";

export default function CreateQuiz() {
  const [course, setCourse] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [numQuestions, setNumQuestions] = useState(50);
  const [timer, setTimer] = useState(45);
  const [source, setSource] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    const validFiles = files.filter(file => {
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

    setUploadedFiles(prev => [...prev, ...validFiles]);
    setError("");
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const errors = {};
    if (!course) errors.course = "Please select a course";
    if (source === "upload" && uploadedFiles.length === 0) errors.files = "Please upload at least one file";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    if (!validateForm()) {
      setError("Please fix the errors above before continuing");
      return;
    }

    setShowModal(true);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('course', course);
      formData.append('questionType', questionType);
      formData.append('numQuestions', numQuestions);
      formData.append('timer', timer);
      formData.append('source', source);
      
      if (source === 'upload') {
        uploadedFiles.forEach((file) => formData.append('files', file));
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log('Quiz generated successfully!', {
        course, questionType, numQuestions, timer, source,
        files: uploadedFiles.map(f => f.name)
      });

      // Redirect or navigate to quiz page here
      // window.location.href = '/quiz/start';
      
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      console.error('Error:', err);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8 px-4">
      {/* Header - Outside Form */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Set up Mock Exam</h1>
        <div className="flex justify-center gap-2">
          <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Program</span>
          <span className="bg-white text-gray-700 px-3 py-1 rounded text-sm border">Computer Science</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Course Selection */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">Select Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full border rounded px-3 py-2 text-sm ${validationErrors.course ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Introduction to Programming [Consist of Python, Java, or C++]</option>
              <option value="course1">Data Structures and Algorithms</option>
              <option value="course2">Web Development Fundamentals</option>
            </select>
            {validationErrors.course && <p className="text-red-500 text-xs mt-1">{validationErrors.course}</p>}
          </div>

          {/* Question Type - Flexed Items */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">Question Type</label>
            <div className="flex gap-3">
              <label className="flex-1 flex items-start gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="questionType"
                  value="mcq"
                  checked={questionType === "mcq"}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Multiple Choice Questions</p>
                  <p className="text-xs text-gray-500">Quick Selection questions</p>
                </div>
              </label>

              <label className="flex-1 flex items-start gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="questionType"
                  value="theory"
                  checked={questionType === "theory"}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Theory</p>
                  <p className="text-xs text-gray-500">Written explanation</p>
                </div>
              </label>

              <label className="flex-1 flex items-start gap-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="questionType"
                  value="mixed"
                  checked={questionType === "mixed"}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Mixed</p>
                  <p className="text-xs text-gray-500">Both Types Combined</p>
                </div>
              </label>
            </div>
          </div>

          {/* Number of Questions & Timer */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">Number of Questions</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                {[...Array(46)].map((_, i) => {
                  const val = i + 5;
                  return (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
              <p className="text-xs text-gray-500 mt-1">Minimum 5, Maximum 50 questions</p>
            </div>

            <div>
              <label className="block text-gray-900 text-sm font-medium mb-2">Timer</label>
              <select
                value={timer}
                onChange={(e) => setTimer(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                {Array.from({ length: 12 }, (_, i) => 30 + i * 10).map((val) => (
                  <option key={val} value={val}>
                    {val}mins
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">30 minutes to 2 hours</p>
            </div>
          </div>

          {/* Question Source */}
          <div>
            <label className="block text-gray-900 text-sm font-medium mb-2">Question Source</label>
            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  value="past"
                  checked={source === "past"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-1"
                />
                <Folder className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">From Past Exams</p>
                  <p className="text-xs text-gray-500">Generate Questions from Question Bank database</p>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="source"
                  value="upload"
                  checked={source === "upload"}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-1"
                />
                <Upload className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Upload Course Material</p>
                  <p className="text-xs text-gray-500">AI Generate questions from your uploaded materials</p>
                </div>
              </label>
            </div>
          </div>

          {/* File Upload */}
          {source === "upload" && (
            <div className="border-2 border-dashed border-gray-300 rounded p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Introduction to Python Course Material 003</p>
              <p className="text-xs text-gray-500 mb-3">Uploaded <strong>Introduction to Python Course Material 003.docx</strong></p>
              <label className="inline-block">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-300">
                  Choose a File
                </span>
              </label>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                      <span className="text-gray-700">{file.name}</span>
                      <button type="button" onClick={() => removeFile(index)} className="text-red-500 text-xs">Remove</button>
                    </div>
                  ))}
                </div>
              )}

              {validationErrors.files && <p className="text-red-500 text-xs mt-2">{validationErrors.files}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded font-medium text-white ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            } flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              'Generate and start Quiz'
            )}
          </button>
          <p className="text-xs text-gray-500 text-center">Please fill in all required fields to continue</p>
        </form>
      </div>

      {/* Loading Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Generating Mock Exam Questions</h2>
            <p className="text-sm text-gray-500 mb-4">Loading........</p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}