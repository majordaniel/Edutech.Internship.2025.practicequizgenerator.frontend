import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        <Navbar id="navbar" />

        {/* Outlet container stretched fully */}
        <div className="flex-1 w-full">
          <Outlet className="flex-1 w-full"/> {/* All pages render here */}
        </div>
      </div>
    </div>
  );
}
