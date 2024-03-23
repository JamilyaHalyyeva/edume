// DashboardLayout.js

import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{}}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
