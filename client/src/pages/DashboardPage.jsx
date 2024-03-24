import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../components/TeacherDashboard";

import { useUser } from "../context/UserProvider";
import TeacherLayout from "../components/TeacherLayout";
import StudentLayout from "../components/StudentLayout";
import { StudentDashboardProvider } from "../context/StudentDashboardProvider";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useUser();

  console.log("User", user);
  console.log("isAuthenticated", isAuthenticated);
  // Handling invalid roles
  if (!isAuthenticated) {
    console.error("User is not authenticated");
    return navigate("/Login"); // Redirect to the home page
  }

  return (
    <div>
      {user.role === "teacher" ? (
        <TeacherLayout>
          <TeacherDashboard />
        </TeacherLayout>
      ) : (
        <StudentDashboardProvider>
          <StudentLayout />
        </StudentDashboardProvider>
      )}
    </div>
  );
};

export default DashboardPage;
