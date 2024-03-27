import { useStudentDashboardContext } from "../context/StudentDashboardProvider";
import Navbar from "./Navbar";

import StudentPageFooter from "./StudentPageFooter";

const StudentLayout = ({ children }) => {
  const { currentPage } = useStudentDashboardContext();
  return (
    <div className="w-full">
      <Navbar />
      <div style={{}}>{children}</div>
      <div>{currentPage.component}</div>
      <StudentPageFooter></StudentPageFooter>
    </div>
  );
};

export default StudentLayout;
