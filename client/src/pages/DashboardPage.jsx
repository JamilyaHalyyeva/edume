import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import { useUser } from "../context/UserProvider";
import TeacherLayout from "../components/TeacherLayout";
import StudentLayout from "../components/StudentLayout";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUser();

  // Handling invalid roles
  if (!isAuthenticated) {
    console.error("User is not authenticated");
    return navigate("/Login"); // Redirect to the home page
  }

  return (
    <div>
      {user.userRole === "teacher" ? (
        <TeacherLayout>
          <TeacherDashboard />
        </TeacherLayout>
      ) : (
        <StudentLayout>
          <StudentDashboard />
        </StudentLayout>
      )}
    </div>
  );
};

export default DashboardPage;
