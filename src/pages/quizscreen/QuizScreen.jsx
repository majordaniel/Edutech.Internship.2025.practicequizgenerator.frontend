import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock questions for "Past Exams"
  const mockQuestions = [
    {
      question: "What is the capital of Nigeria?",
      options: ["Abuja", "Lagos", "Port Harcourt", "Kano"],
      correctAnswer: "Abuja",
    },
    {
      question: "Which data structure uses FIFO?",
      options: ["Stack", "Queue", "Array", "Tree"],
      correctAnswer: "Queue",
    },
    {
      question: "Which gas do plants absorb during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon dioxide",
    },
    {
      question: "Who is the father of modern computer science?",
      options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
      correctAnswer: "Alan Turing",
    },
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<h6>", "<h1>", "<header>", "<head>"],
      correctAnswer: "<h1>",
    },
    {
      question: "In Java, which keyword is used to inherit a class?",
      options: ["this", "super", "extends", "implements"],
      correctAnswer: "extends",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Styling System",
        "Central Styling Source",
      ],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which organ purifies blood in the human body?",
      options: ["Heart", "Liver", "Kidney", "Lungs"],
      correctAnswer: "Kidney",
    },
    {
      question: "What is 15 × 12?",
      options: ["160", "170", "180", "190"],
      correctAnswer: "180",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      correctAnswer: "Mars",
    },
  ];

  // Check mode from location.state
  const mode = location.state?.mode;

  // Use mock questions if mode is "past-exams", otherwise use generated questions
  const questions =
    mode === "past-exams"
      ? mockQuestions
      : location.state?.questions || [];

  const timerValue = location.state?.timer || 30; // in minutes, default 30

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // Timer in minutes
  const timerRef = useRef(timerValue);
  const [timeLeft, setTimeLeft] = useState(timerRef.current);

  // Redirect if no questions
  useEffect(() => {
    if (!questions.length) navigate("/create-quiz");
  }, [questions, navigate]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      timerRef.current -= 1 / 60; // decrement 1 second in minutes
      setTimeLeft(timerRef.current);

      if (timerRef.current <= 0) {
        clearInterval(interval);
        setShowConfirm(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time mm:ss
  const formatTime = (minutesLeft) => {
    const mins = Math.floor(minutesLeft);
    const secs = Math.floor((minutesLeft - mins) * 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const lastQuestion = current === questions.length - 1;

  const handleNext = () => {
    if (selected) {
      setAnswers({ ...answers, [current]: selected });
    }
    if (!lastQuestion) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] || null);
    } else {
      setShowConfirm(true);
    }
  };

  const handleSubmit = () => {
    // Include current selection in final answers
    const updatedAnswers = selected ? { ...answers, [current]: selected } : answers;

    // Save quiz result for history
    const quizResult = {
      name: location.state?.quizName || `Quiz ${new Date().toLocaleDateString()}`,
      subject: location.state?.subject || "General",
      questions: questions.length,
      duration: `${timerValue} mins`,
      status: "Completed",
      score: calculateScore(updatedAnswers),
      date: new Date().toLocaleString(),
    };

    const email = localStorage.getItem("loggedInUserEmail");
    if (!email) return;

    const storedQuizzes = JSON.parse(localStorage.getItem(`${email}-quizzes`)) || [];
    localStorage.setItem(`${email}-quizzes`, JSON.stringify([quizResult, ...storedQuizzes]));

    // Update stats
    const totalQuizzes = storedQuizzes.length + 1;
    const averageScore = Math.round(
      (storedQuizzes.reduce((sum, q) => sum + parseInt(q.score || 0), parseInt(quizResult.score || 0))) /
        totalQuizzes
    );
    const lastScore = quizResult.score;
    const updatedStats = [
      { title: "Total Quizzes", value: totalQuizzes },
      { title: "Average Score", value: averageScore + "%" },
      { title: "Last Quiz Score", value: lastScore + "%" },
    ];
    localStorage.setItem(`${email}-stats`, JSON.stringify(updatedStats));

    // *** NEW: Save data for ResultPage ***
    const resultData = {
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        correctOptionIndex: q.options.indexOf(q.correctAnswer)
      })),
      answers: updatedAnswers,
      timer: timerValue * 60 - Math.floor(timeLeft * 60) // elapsed time in seconds
    };
    localStorage.setItem("quizResult", JSON.stringify(resultData));

    setShowConfirm(false);
    navigate("/quiz/result");
  };

  const calculateScore = (answersObj) => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (q.correctAnswer && answersObj[idx] === q.correctAnswer) score += 1;
    });
    return Math.round((score / questions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">
          {mode === "past-exams" ? "Past Exams Quiz" : "Practice Quiz"}
        </h1>
        <div className="flex items-center text-gray-600 text-sm font-medium gap-4">
          <span>
            {answeredCount}/{questions.length} answered
          </span>
          <span className="flex items-center gap-1 text-orange-500 font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-8">
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Question {current + 1}</h2>
        <p className="text-lg font-medium text-gray-800 mb-6">{questions[current].question}</p>

        <div className="space-y-3 mb-8">
          {questions[current].options.map((opt, i) => (
            <label
              key={i}
              className={`flex items-center p-4 rounded-xl cursor-pointer text-sm transition border ${
                selected === opt
                  ? "bg-orange-100 border-orange-400"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <input type="radio" checked={selected === opt} onChange={() => setSelected(opt)} className="mr-3" />
              {opt}
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-8 py-3 rounded-xl text-sm font-medium flex items-center transition ${
              selected
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {lastQuestion ? "Submit" : "Next"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="px-6 py-4 border-t">
        <h3 className="text-xs font-semibold text-gray-600 mb-2">Question Navigator</h3>
        <div className="flex gap-2 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setSelected(answers[i] || null);
              }}
              className={`w-8 h-8 rounded-full text-xs font-medium transition ${
                current === i
                  ? "bg-orange-500 text-white"
                  : answers[i]
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Submit Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-bold">Confirm Submit</h2>
            <p className="text-gray-600 text-sm">
              You have answered {selected && !answers[current] ? Object.keys(answers).length + 1 : Object.keys(answers).length} out of {questions.length} questions.
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="border border-gray-300 text-gray-600 px-6 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}