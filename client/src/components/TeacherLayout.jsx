import TopBar from "./topBar/TopBar.jsx";
import SideBar from "./sideBar/SideBar.jsx";
import { useTeacherDashboard } from "../context/TeacherDashboardProvider.jsx";
import { Outlet } from "react-router-dom";

const TeacherLayout = ({ children }) => {
  const { isSidebarOpen, isCompact } = useTeacherDashboard(); // Get sidebar state
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className={`flex flex-col flex-1 `}>
        {" "}
        {/* Add conditional padding */}
        <TopBar />
        <main
          className={`flex flex-col flex-1 ${
            isSidebarOpen === false ? "" : isCompact ? "pl-20" : "pl-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
