import { Link, useLocation } from "react-router-dom"; 
import { Home, BookOpen, FileText, LogOut } from "lucide-react"; 
import ExamLogo from "../assets/ExamLogo.svg"; 
import toast from "react-hot-toast"; 
 
export default function Sidebar() { 
  const location = useLocation(); 
 
  const linkClass = (path) => 
    location.pathname === path 
      ? "flex items-center gap-3 px-4 py-2.5 mx-3 bg-orange-500 text-white rounded-lg font-medium transition-all" 
      : "flex items-center gap-3 px-4 py-2.5 mx-3 text-gray-300 hover:bg-gray-500/10 hover:text-gray-400 rounded-lg transition-all"; 
 
  const handleSignOut = () => { 
    localStorage.removeItem("isLoggedIn"); 
    toast.success("Signed out successfully!"); 
    setTimeout(() => { 
      window.location.href = "/login"; 
    }, 1000); 
  }; 
 
  return ( 
    <div className="bg-black h-full shadow-sm border-r border-orange-500/20 flex flex-col"> 
      {/* Logo */} 
      <div className="p-4 border-b border-orange-500/20 h-16 flex items-center justify-center flex-shrink-0"> 
        <img src={ExamLogo} alt="Exam Logo" className="h-10 w-auto" /> 
      </div> 
 
      {/* Nav Links */} 
      <nav className="flex-1 mt-4 space-y-2 overflow-y-auto px-0 py-2"> 
        <Link to="/dashboard" className={linkClass("/dashboard")}> 
          <Home size={18} /> 
          <span>Dashboard</span>
        </Link> 
        {/* <Link to="/questions" className={linkClass("/questions")}> 
          <BookOpen size={18} /> 
          <span>Question Bank</span>
        </Link>  */}
        <Link to="/mock" className={linkClass("/mock")}> 
          <FileText size={18} /> 
          <span>Mock Exam</span>
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