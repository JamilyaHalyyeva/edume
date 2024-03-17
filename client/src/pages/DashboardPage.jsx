import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import DashboardLayout from "../components/DashboarLayout";
import { useUser } from "../context/UserProvider";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUser();
  const userRole = localStorage.getItem("role");

  // Handling invalid roles
  if (!isAuthenticated) {
    console.error("User is not authenticated");
    return navigate("/Login"); // Redirect to the home page
  }

  return (
    <div>
      <DashboardLayout>
        {user.userRole === "teacher" ? (
          <TeacherDashboard />
        ) : (
          <StudentDashboard />
        )}
      </DashboardLayout>
    </div>
  );
};

export default DashboardPage;
