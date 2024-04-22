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

  const navigateToNextSection = () => {
    //find the lesson from allRegisteredLessons
    const lesson = allRegisteredLessons.find(
      (lesson) => lesson.classType === currentLesson._id
    );

    //now get all the sections of the lesson in flat array and consider childSections as well
    const getAllSections = (sections) => {
      let allSections = [];
      sections.forEach((section) => {
        allSections.push(section);
        if (section.childSections) {
          allSections.push(...getAllSections(section.childSections));
        }
      });
      return allSections;
    };

    const allSections = getAllSections(lesson.lessonSections);

    //find the index of the current section
    const currentSectionIndex = allSections.findIndex(
      (section) => section._id === currentSection._id
    );

    //if the current section is the last section, then return
    if (currentSectionIndex === allSections.length - 1) {
      return;
    }

    console.log("allSections", allSections);
    //get the next section
    const nextSection = allSections[currentSectionIndex + 1];

    console.log("nextSection", nextSection);
    //set the current section
    setCurrentSection({
      ...nextSection,
    });
  };

  const navigateToPreviousSection = () => {
    //find the lesson from allRegisteredLessons
    const lesson = allRegisteredLessons.find(
      (lesson) => lesson.classType === currentLesson._id
    );

    //now get all the sections of the lesson in flat array and consider childSections as well
    const getAllSections = (sections) => {
      let allSections = [];
      sections.forEach((section) => {
        allSections.push(section);
        if (section.childSections) {
          allSections.push(...getAllSections(section.childSections));
        }
      });
      return allSections;
    };

    const allSections = getAllSections(lesson.lessonSections);

    //find the index of the current section
    const currentSectionIndex = allSections.findIndex(
      (section) => section._id === currentSection._id
    );

    //if the current section is the first section, then return
    if (currentSectionIndex === 0) {
      return;
    }

    console.log("allSections", allSections);
    //get the previous section
    const previousSection = allSections[currentSectionIndex - 1];

    console.log("previousSection", previousSection);
    //set the current section
    setCurrentSection({
      ...previousSection,
    });
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
        navigateToNextSection,
        navigateToPreviousSection,
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
