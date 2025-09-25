import { Home, BookOpen, FileText, LogOut } from "lucide-react";
import ExamLogo from '../assets/ExamLogo.svg';

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="h-12 flex items-center justify-center">
             <img src={ExamLogo} alt="Exam Logo" className="h-10 w-auto" />
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 mt-4 space-y-1">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white border-r-2 border-orange-500">
          <Home size={16} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800">
          <BookOpen size={16} /> Question Bank
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800">
          <FileText size={16} /> Mock Exam
        </a>
      </nav>

      {/* Sign Out */}
      <button className="flex items-center gap-3 px-4 py-3 text-gray-300 border-t border-gray-800 hover:bg-gray-800">
        <LogOut size={16}/> Sign Out
      </button>
    </div>
  );
}