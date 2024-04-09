import { createContext, useContext, useState } from "react";

const StudentDashboardContext = createContext();
export const pages = {
  DASHBOARD: {
    title: "Dashboard",
    name: "dashboard",
  },
  LESSON_OVERVIEW: {
    title: "Lesson Overview ",

    name: "LessonOverview",
  },
  LESSON_SECTION_OVERVIEW: {
    title: "Section Overview",

    name: "LessonSectionOverview",
  },
  SECTION_CONTENT_PLAYER: {
    title: "Content Player",

    icon: "SectionContentPlayer",
  },
};

const StudentDashboardProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);

  return (
    <StudentDashboardContext.Provider
      value={{
        currentLesson,
        setCurrentLesson,
      }}
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
