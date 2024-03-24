import TopBar from "./TopBar/TopBar.jsx";

const TeacherLayout = ({ children }) => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};

export default TeacherLayout;
