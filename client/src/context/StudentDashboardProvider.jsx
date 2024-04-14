import { createContext, useContext, useEffect, useState } from "react";
import config from "../config/env.config";
import axios from "axios";

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

  const checkIfStudentRegisteredAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/api/students/isStudentRegisteredAllTeachers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error checking if student is registered in all teachers",
        error
      );
      return false;
    }
  };

  return (
    <StudentDashboardContext.Provider
      value={{
        checkIfStudentRegisteredAllTeachers,
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
