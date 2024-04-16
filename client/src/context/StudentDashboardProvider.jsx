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
  const [allRegisteredLessons, setAllRegisteredLessons] = useState([]); // [Lesson, Lesson, Lesson
  const [currentSection, setCurrentSection] = useState(null); // {section, lessonId, sectionId}

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

  const fetchAllRegisteredLessons = async () => {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/api/students/getAllRegisteredLessons`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching registered lessons", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const isAllTeachersRegistered =
        await checkIfStudentRegisteredAllTeachers();
      if (isAllTeachersRegistered) {
        const lessons = await fetchAllRegisteredLessons();
        if (lessons) {
          setAllRegisteredLessons(lessons.data);
        }
      }
    };

    fetchData();
  }, []);
  return (
    <StudentDashboardContext.Provider
      value={{
        checkIfStudentRegisteredAllTeachers,
        currentLesson,
        setCurrentLesson,
        allRegisteredLessons,
        currentSection,
        setCurrentSection,
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
