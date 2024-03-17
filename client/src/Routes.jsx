import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import StudentPreProfilePage from "./pages/StudentPreProfilePage";
import TeacherPreProfilePage from "./pages/TeacherPreProfilePage";
import { RegisterProvider } from "./context/RegisterProvider";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/register/*" element={<RegisterRoutes />} />
    </Routes>
  );
};

const RegisterRoutes = () => {
  return (
    <RegisterProvider>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="student" element={<StudentPreProfilePage />} />
        <Route path="teacher" element={<TeacherPreProfilePage />} />
      </Routes>
    </RegisterProvider>
  );
};
export default AppRoutes;
