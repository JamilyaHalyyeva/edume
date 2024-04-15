import { createContext, useContext, useState } from "react";
import classTypeImageObjects from "../assets/classTypes/classTypeImageObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faListSquares,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "./UserProvider";

// Create a context for the teacher's dashboard
const TeacherDashboardContext = createContext();

// Create a provider for the teacher's dashboard
const TeacherDashboardProvider = ({ children }) => {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCompact, setIsCompact] = useState(true);
  const toggleCompactMode = () => setIsCompact(!isCompact);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const prepareClassTypeList = (classTypeGrades) => {
    return classTypeGrades
      .map((item) => item.classType)
      .reduce(
        (unique, item) =>
          unique.some((unItem) => unItem.name === item.name)
            ? unique
            : [...unique, item],
        []
      )
      .map((classType) => {
        console.log("classType", classType);
        const image = classTypeImageObjects.find((classTypeImageObject) => {
          return classTypeImageObject.name === classType.name;
        });
        console.log("image", image);
        return {
          id: classType._id,
          name: classType.name,
          icon: (
            <img
              className={`${image.bgColor} " ml-5  w-[3rem] sm:w-[3rem ] md:w-[3rem] lg:w-[4rem]  rounded-md "`}
              src={image.imageSrc}
              alt={image.name}
            />
          ),
          link: `/dashboard/lessons/${classType.name}`,
        };
      });
  };

  //get Grads  list for teacher
  const prepareGradeList = (teacherClassTypeGrades) => {
    return teacherClassTypeGrades
      .map((item) => item.grade) // Assuming there is a grade attribute in each class type grade object
      .reduce(
        (unique, item) =>
          unique.some((unItem) => unItem.name === item.name)
            ? unique
            : [...unique, item],
        []
      )
      .map((grade) => ({
        id: grade._id, // Assuming the grade itself can be a unique identifier, adjust as needed
        name: ` ${grade.name} Grade `, // Adjust the display name as needed
        link: `/dashboard/students/grade/${grade.name}`,
      }));
  };

  const sideBarElements = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FontAwesomeIcon icon={faGauge} />,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Lessons",
      icon: <FontAwesomeIcon icon={faListSquares} />,
      link: "/dashboard/lessons",
      children: [...prepareClassTypeList(user.teacherClassTypeGrades)],
    },
    {
      id: 3,
      name: "Students",
      icon: <FontAwesomeIcon icon={faUsers} />,
      link: "/dashboard/students",
      children: [...prepareGradeList(user.teacherClassTypeGrades)],
    },
  ];

  return (
    <TeacherDashboardContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isCompact,
        toggleCompactMode,
        sideBarElements,
      }}
    >
      {children}
    </TeacherDashboardContext.Provider>
  );
};

// Create a custom hook for using the teacher's dashboard context
const useTeacherDashboard = () => {
  const context = useContext(TeacherDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherDashboard must be used within a TeacherDashboardProvider"
    );
  }
  return context;
};

export { TeacherDashboardProvider, useTeacherDashboard };
