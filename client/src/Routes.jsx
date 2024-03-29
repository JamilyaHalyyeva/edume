import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import StudentPreProfilePage from "./pages/StudentPreProfilePage";
import TeacherPreProfilePage from "./pages/TeacherPreProfilePage";
import { RegisterProvider } from "./context/RegisterProvider";
import LessonList from "./components/LessonList/LessonList";
import StudentList from "./components/studentList/StudentList";

import TeacherDashboard from "./components/TeacherDashboard.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import { useUser } from "./context/UserProvider.jsx";
import LessonForm from "./components/LessonList/LessonForm.jsx";
import LessonEdit from "./components/LessonList/LessonEdit.jsx";
import LessonManage from "./components/LessonList/LessonManage.jsx";

const AppRoutes = () => {
  const { user } = useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<DashboardPage />}>
        {user && user.role === "teacher" ? (
          <>
            <Route index element={<TeacherDashboard />} />
            <Route path="lessons" element={<LessonList />} />
            <Route path="lessons/new" element={<LessonForm />} />
            <Route path="lessons/edit:lessonId" element={<LessonEdit />} />
            <Route path="lessons/manage/:lessonId" element={<LessonManage />} />
            <Route path="students" element={<StudentList />} />
          </>
        ) : (
          <Route index element={<StudentDashboard />} />
          // Define additional student-specific routes here if necessary
        )}
      </Route>
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
