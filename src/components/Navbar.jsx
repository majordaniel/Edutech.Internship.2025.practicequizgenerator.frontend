import { Bell } from "lucide-react";
import Notification from "@/components/icons/notification.svg";

export default function Navbar() {
  return (
    <div className="flex justify-end items-center px-6 py-4 bg-white border-b border-gray-200">

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center gap-4">
         <button className="focus:outline-none">
      <img 
        src={Notification} 
        alt="Notification" 
        className="w-5 h-5" 
      />
    </button>


        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          {/* Profile Info */}
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Monday Sunday</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">STUDENT</div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="Monday Sunday"
              className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
            />
            {/* Online Status Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>

        </div>
      </div>
    </div>
  );
}