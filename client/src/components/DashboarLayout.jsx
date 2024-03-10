// DashboardLayout.js

import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: "200px", padding: "20px" }}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
