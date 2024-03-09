import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";

const DashboardPage = () => {
  const navigate = useNavigate();
  // Assuming you have the user's role stored in a variable (replace 'userRole' with the actual variable)
  const userRole = localStorage.getItem("role"); // Replace with the actual user role (e.g., 'student' or 'teacher')

  // Redirect to home page if the user's role is not valid
  if (userRole !== "student" && userRole !== "teacher") {
    return navigate("/");
  }

  return (
    <div>
      {userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default DashboardPage;
