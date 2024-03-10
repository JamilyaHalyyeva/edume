import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import DashboardLayout from "../components/DashboarLayout";

const DashboardPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  // Handling invalid roles
  if (userRole !== "student" && userRole !== "teacher") {
    console.error("Invalid user role:", userRole);
    navigate("/"); // Redirect to the home page
    return null; // Returning null to prevent rendering any content
  }

  // Redirect to login if the user is not authenticated or role is not available
  if (!userRole) {
    return navigate("/login");
  }

  return (
    <div>
      <DashboardLayout>
        {userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
      </DashboardLayout>
    </div>
  );
};

export default DashboardPage;
