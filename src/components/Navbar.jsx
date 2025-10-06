import { FiBell } from "react-icons/fi";

export default function Navbar({ user }) {
  return (
    <div className="h-full flex justify-end items-center px-6 bg-white border-b border-gray-200">
      {/* Changed from px-4 py-2 to h-full */}
      
      {/* Notification Bell */}
      <div className="relative">
        <div className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
          <FiBell className="w-4 h-4 text-gray-600" />
        </div>
        <span className="absolute top-0.5 right-0.5 block h-1.5 w-1.5 rounded-full bg-red-500"></span>
      </div>

      {/* Rest of your code... */}
{/* Divider */}
      <div className="w-px h-6 bg-gray-200 mx-3"></div>

      {/* Profile Section */}
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 leading-none">
            {user?.name || "David smith"}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide leading-none">
            {user?.role || "STUDENT"}
          </div>
        </div>

        <div className="relative">
          <img
            src={user?.avatar || "https://i.pravatar.cc/36"}
            alt={user?.name || "Guest User"}
            className="w-9 h-9 rounded-full border border-gray-200 object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

