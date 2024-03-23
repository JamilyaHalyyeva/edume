import Navbar from "./Navbar";

import StudentPageFooter from "./StudentPageFooter";

const StudentLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{}}>{children}</div>
      <StudentPageFooter></StudentPageFooter>
    </div>
  );
};

export default StudentLayout;
