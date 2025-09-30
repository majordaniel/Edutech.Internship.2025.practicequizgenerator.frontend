import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 h-full bg-white border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full w-full overflow-auto">
        {/* Navbar */}
        <div className="flex-shrink-0 h-16">
          <Navbar />
        </div>

        {/* Page content */}
        <div className="flex-1 w-full h-full px-4 md:px-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
