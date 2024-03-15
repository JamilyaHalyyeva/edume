import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import StudentPreProfilePage from "./pages/StudentPreProfilePage";
import TeacherPreProfilePage from "./pages/TeacherPreProfilePage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/student-pre-register" element={<StudentPreProfilePage />} />
      <Route path="/teacher-pre-register" element={<TeacherPreProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
