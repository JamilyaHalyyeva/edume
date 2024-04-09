import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import StudentPreProfilePage from "./pages/StudentPreProfilePage";
import TeacherPreProfilePage from "./pages/TeacherPreProfilePage";
import { RegisterProvider } from "./context/RegisterProvider";
import LessonList from "./components/LessonList/LessonList.jsx";
import StudentList from "./components/studentList/StudentList";

import TeacherDashboard from "./components/TeacherDashboard.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import { useUser } from "./context/UserProvider.jsx";
import LessonForm from "./components/LessonList/LessonForm.jsx";
import LessonEdit from "./components/LessonList/LessonEdit.jsx";
import LessonManage from "./components/LessonManage/LessonManage.jsx";
import { LessonManagementProvider } from "./context/LessonManagementProvider.jsx";
import { TeacherClassGradeProvider } from "./context/TeacherClassGradeProvider.jsx";
import LessonOverview from "./components/LessonOverview.jsx";
import LessonSectionOverview from "./components/LessonSectionOverview.jsx";
import SelectTeacherLayout from "./components/SelectTeachers/SelectTeacherLayout.jsx";
import { TeacherSelectionProvider } from "./context/TeacherSelectionProvider.jsx";

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
            <Route
              path="lessons/manage/:lessonId"
              element={
                <LessonManagementProvider>
                  <LessonManage />
                </LessonManagementProvider>
              }
            />
            <Route path="students" element={<StudentList />} />
          </>
        ) : (
          <>
            <Route index element={<StudentDashboard />} />
            <Route path="lesson-overview" element={<LessonOverview />} />
            <Route
              path="lesson-overview/lesson-section-overview"
              element={<LessonSectionOverview />}
            />
            <Route
              path="teacher-selection"
              element={
                <TeacherSelectionProvider>
                  <SelectTeacherLayout />
                </TeacherSelectionProvider>
              }
            />
          </>

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
        <Route
          path="teacher"
          element={
            <TeacherClassGradeProvider>
              <TeacherPreProfilePage />
            </TeacherClassGradeProvider>
          }
        />
      </Routes>
    </RegisterProvider>
  );
};

export default AppRoutes;
