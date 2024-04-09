import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

import StudentPageFooter from "./StudentPageFooter";

const StudentLayout = ({ children }) => {
  return (
    <div className="w-full">
      <Navbar />
      <div>
        {/* here is the outlet */}
        <Outlet />
      </div>
      <StudentPageFooter></StudentPageFooter>
    </div>
  );
};

export default StudentLayout;
