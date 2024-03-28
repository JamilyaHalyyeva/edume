import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserProvider";
import TeacherLayout from "../components/TeacherLayout";
import StudentLayout from "../components/StudentLayout";
import { StudentDashboardProvider } from "../context/StudentDashboardProvider";
import { TeacherDashboardProvider } from "../context/TeacherDashboardProvider.jsx";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // If not loading and not authenticated, redirect to login
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication
  }

  // After loading, render content based on user's role
  return (
    <div>
      {user && user.role === "teacher" ? (
        <TeacherDashboardProvider>
          <TeacherLayout></TeacherLayout>
        </TeacherDashboardProvider>
      ) : user && user.role === "student" ? (
        <StudentDashboardProvider>
          <StudentLayout></StudentLayout>
        </StudentDashboardProvider>
      ) : (
        <div>You do not have access to this page</div> // Handle unexpected roles or missing user data
      )}
    </div>
  );
};

export default DashboardPage;
