import axios from "axios";
import { createContext, useContext, useState } from "react";
import config from "../config/env.config.js";

const LessonManagementContext = createContext();

const LessonManagementProvider = ({ children }) => {
  const [lesson, setLesson] = useState({});
  const [isNewSectionOrSectionSelected, setIsNewSectionOrSectionSelected] =
    useState(false);
  const [isNewSection, setIsNewSection] = useState(false);
  const [
    isNewSubSectionOrSubSectionSelected,
    setIsNewSubSectionOrSubSectionSelected,
  ] = useState(false);
  const [isNewSubSection, setIsNewSubSection] = useState(false);

  const [currentSection, setCurrentSection] = useState({ name: "" });
  const handleAddSectionClick = () => {
    console.log("Add Section Clicked");
    setIsNewSectionOrSectionSelected(true);
    setIsNewSection(true);
  };
  const handleAddSubSectionClick = (sectionId) => {
    console.log("Add SubSection Clicked");
    console.log("Section Id: ", sectionId);
    setIsNewSubSectionOrSubSectionSelected(true);
    setIsNewSubSection(true);
  };

  const cancelNewSection = () => {
    setIsNewSectionOrSectionSelected(false);
    setIsNewSection(false);
    setCurrentSection({ name: "" });
  };
  const saveNewSection = () => {
    console.log("saveNewSection: ", currentSection);

    currentSection.lesson = lesson._id;
    currentSection.order = lesson.lessonSections
      ? lesson.lessonSections.length
      : 0;

    const saveNewSectionAsync = async () => {
      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/api/lessonSection`,
          currentSection,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          console.log("Section saved successfully");
          setIsNewSectionOrSectionSelected(false);
          setIsNewSection(false);
          setCurrentSection({ name: "" });
          fetchLesson(lesson._id);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    saveNewSectionAsync();
  };

  const saveNewSubSection = () => {
    console.log("saveNewSubSection: ", currentSection);
  };
  const fetchLesson = async (lessonId) => {
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/api/lesson/${lessonId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("response: ", response);
      setLesson(response.data.lesson);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <LessonManagementContext.Provider
      value={{
        lesson,
        isNewSectionOrSectionSelected,
        isNewSubSectionOrSubSectionSelected,
        isNewSection,
        currentSection,
        setCurrentSection,
        handleAddSectionClick,
        handleAddSubSectionClick,
        setLesson,
        saveNewSection,
        cancelNewSection,
        saveNewSubSection,
      }}
    >
      {children}
    </LessonManagementContext.Provider>
  );
};
const useLessonManagement = () => {
  const context = useContext(LessonManagementContext);
  if (!context) {
    throw new Error(
      "useLessonManagement must be used within a LessonManagementProvider"
    );
  }
  return context;
};

export { LessonManagementProvider, useLessonManagement };
