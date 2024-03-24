import TopBar from "./topBar/TopBar.jsx";
import SideBar from "./sideBar/SideBar.jsx";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default TeacherLayout;
