import { useState } from "react";
import { CheckCircle, Clock, FileText, TrendingUp } from "lucide-react";
import { updateUserStats } from "@/utils/updateUserStats";
import { useUser } from "@/hooks/useUser";

export default function ResultPage() {
  const [activeTab, setActiveTab] = useState("incorrect");
   const { user } = useUser();
  
  // Get data from localStorage
  const savedData = JSON.parse(localStorage.getItem("quizResult") || "{}");
  const { questions = [], answers = {}, timer = 0 } = savedData;

  if (!questions.length) {
    return <p className="text-center mt-8 text-gray-600">No quiz results available</p>;
  }

  // Calculate stats
  const score = Object.keys(answers).reduce((acc, key) => {
    const question = questions[key];
    return question?.options[question.correctOptionIndex] === answers[key] ? acc + 1 : acc;
  }, 0);

  const totalQuestions = questions.length;
  const percent = Math.round((score / totalQuestions) * 100);
  const totalAnswered = Object.keys(answers).filter(k => answers[k]).length;
  const correctCount = score;
  const incorrectCount = totalAnswered - score;
  const correctPercent = (correctCount / totalQuestions) * 100;
  const remainingPercent = ((totalQuestions - totalAnswered) / totalQuestions) * 100;

  //  useEffect(() => {
  //   if (user && percent >= 0) {
  //     updateUserStats(user.id, percent);
  //   }
  // }, [user, percent]);

  // Circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  // Filter questions by tab
  const incorrectQuestions = questions.filter((q, i) => {
    const userAns = answers[i];
    const correct = q.options[q.correctOptionIndex];
    return userAns && userAns !== correct;
  });

  const correctQuestions = questions.filter((q, i) => {
    const userAns = answers[i];
    const correct = q.options[q.correctOptionIndex];
    return userAns === correct;
  });

  const displayQuestions = activeTab === "incorrect" ? incorrectQuestions : 
                          activeTab === "correct" ? correctQuestions : questions;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours.toString().padStart(2, '0')}hr`;
  };

  return (
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with circular progress */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col items-center">
            {/* Circular Progress */}
            <div className="relative w-32 h-32  flex items-center justify-center">
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
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{percent}%</span>
              </div> */}
            </div>
            <p className="text-gray-600 font-medium">Your Grade: <span className="font-bold text-gray-800">{percent}%</span></p>
          </div>

          {/* Title */}
          <div className="text-center mt-6 mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-orange-500">Quiz Completed!</span> Here is how you performed on <span className="font-medium">Data Science Practice Quiz</span>. Keep Studying!!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <FileText className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Total Questions Answered</p>
              <p className="text-2xl font-bold text-gray-800">{totalAnswered}/{totalQuestions.toString().padStart(2, '0')}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Average Performance</p>
              <p className="text-2xl font-bold text-gray-800">{percent}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
              <Clock className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Total Time</p>
              <p className="text-2xl font-bold text-gray-800">{formatTime(timer)}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-6 bg-gray-200 rounded-full overflow-hidden flex">
            <div 
              className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${correctPercent}%` }}
            >
              {correctPercent > 15 && `${Math.round(correctPercent)}% Correct`}
            </div>
            <div 
              className="bg-red-400 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${remainingPercent}%` }}
            >
              {remainingPercent > 15 && `${Math.round(remainingPercent)}% Incorrect`}
            </div>
          </div>
        </div>

        {/* Quiz Detailed Review */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quiz Detailed Review</h2>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("incorrect")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === "incorrect" 
                  ? "bg-orange-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Incorrect {incorrectQuestions.length}
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === "all" 
                  ? "bg-orange-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {totalQuestions} Posts
            </button>
            <button
              onClick={() => setActiveTab("correct")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === "correct" 
                  ? "bg-orange-500 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Correct
            </button>
          </div>

          {/* Question */}
          <div className="mb-6">
            {displayQuestions.length > 0 ? (
              displayQuestions.map((q, idx) => {
                const originalIndex = questions.indexOf(q);
                const userAns = answers[originalIndex];
                const correct = q.options[q.correctOptionIndex];
                const isCorrect = userAns === correct;
                
                return (
                  <div key={originalIndex} className="mb-6">
                    <p className="font-medium text-gray-800 mb-4">{q.question}</p>
                    
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, optIdx) => {
                        const isUserAnswer = opt === userAns;
                        const isCorrectAnswer = opt === correct;
                        
                        return (
                          <div 
                            key={optIdx}
                            className={`p-3 rounded-md flex items-center justify-between ${
                              isCorrectAnswer ? 'bg-green-100 border border-green-300' : 
                              isUserAnswer ? 'bg-red-100 border border-red-300' : 
                              'bg-white border border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                name={`q${originalIndex}`} 
                                className="mr-3" 
                                checked={isUserAnswer}
                                readOnly
                              />
                              <span className="text-sm text-gray-700">{opt}</span>
                            </div>
                            {isCorrectAnswer && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-8">No questions in this category</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              className="px-6 py-2 rounded-lg border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-50"
            >
              Back Dashboard
            </button>
            <button 
              className="px-6 py-2 rounded-lg border-2 border-orange-500 text-orange-500 font-medium hover:bg-orange-50"
            >
              Save Quiz
            </button>
            <button 
              className="px-6 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
            >
              Retake Quiz
            </button>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-800 mb-2 text-sm">STUDY TIPS</h3>
          <p className="text-sm text-gray-600">Review the incorrect answers above and focus on those topics for your next study session</p>
        </div>
      </div>
    </div>
  );
}