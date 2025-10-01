import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, FileText, LogOut } from "lucide-react";
import ExamLogo from "../assets/ExamLogo.svg";
import toast from "react-hot-toast";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "flex items-center gap-3 px-4 py-3 bg-gray-800 text-white border-r-2 border-orange-500"
      : "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800";

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Signed out successfully!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

 return (
    <div className="bg-black h-full shadow-sm border-r border-gray-800 flex flex-col">
      {/* Change min-h-screen to h-full */}
      
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 h-16 flex items-center justify-center flex-shrink-0">
        <img src={ExamLogo} alt="Exam Logo" className="h-10 w-auto" />
      </div>

      {/* Nav Links */}
      <nav className="flex-1 mt-4 space-y-1 overflow-y-auto">
        {/* Add overflow-y-auto in case you have many links */}
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <Home size={16} /> Dashboard
        </Link>
        {/* ... rest of links */}
        <Link to="/questions" className={linkClass("/questions")}>
        <BookOpen size={16} /> Question Bank
      </Link>
      <Link to="/mock" className={linkClass("/mock")}>
        <FileText size={16} /> Mock Exam
      </Link>
      </nav>

      {/* Sign Out */}
      <div
        onClick={handleSignOut}
        className="flex items-center gap-3 px-4 py-3 text-gray-300 border-t border-gray-800 hover:bg-gray-800 cursor-pointer flex-shrink-0"
      >
        <LogOut size={16} /> Sign Out
      </div>
    </div>
  );
}