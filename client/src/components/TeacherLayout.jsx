import TopBar from "./topBar/TopBar.jsx";
import SideBar from "./sideBar/SideBar.jsx";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-row h-screen v-screen overflow-hidden">
      <SideBar />
      <TopBar />
      {children}
    </div>
  );
};

export default TeacherLayout;
