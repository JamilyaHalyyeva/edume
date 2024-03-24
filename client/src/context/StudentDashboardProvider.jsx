import { createContext, useContext, useState } from "react";
import StudentDashboard from "../components/StudentDashboard";
import LessonOverview from "../components/LessonOverview";
import LessonSectionOverview from "../components/LessonSectionOverview";
import SectionContentPlayer from "../components/SectionContentPlayer";
const StudentDashboardContext = createContext();
export const pages = {
  DASHBOARD: {
    title: "Dashboard",
    component: <StudentDashboard />,
    name: "dashboard",
  },
  LESSON_OVERVIEW: {
    title: "Lesson Overview ",
    component: <LessonOverview />,
    name: "LessonOverview",
  },
  LESSON_SECTION_OVERVIEW: {
    title: "Section Overview",
    component: <LessonSectionOverview />,
    name: "LessonSectionOverview",
  },
  SECTION_CONTENT_PLAYER: {
    title: "Content Player",
    component: <SectionContentPlayer />,
    icon: "SectionContentPlayer",
  },
};

const StudentDashboardProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(pages.DASHBOARD);
  const [currentLesson, setCurrentLesson] = useState(null);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <StudentDashboardContext.Provider
      value={{ currentPage, changePage, currentLesson, setCurrentLesson }}
    >
      {children}
    </StudentDashboardContext.Provider>
  );
};
const useStudentDashboardContext = () => {
  const context = useContext(StudentDashboardContext);
  if (!context) {
    throw new Error(
      "useStudentDashboardContext must be used within a StudentDashboardProvider"
    );
  }
  return context;
};

export { StudentDashboardProvider, useStudentDashboardContext };
