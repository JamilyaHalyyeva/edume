import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../config/env.config";
import classTypeImageObjects from "../assets/classTypes/classTypeImageObjects";
const TeacherSelectionContext = createContext();

const TeacherSelectionProvider = ({ children }) => {
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedTeacherList, setSelectedTeacherList] = useState([]);
  const [classTypeList, setClassTypeList] = useState([]);

  const selectTeacher = (teacherObjectWithClassType) => {
    const isClassTypeAlreadySelected = selectedTeacherList.some(
      (teacherObject) =>
        teacherObject.classType._id === teacherObjectWithClassType.classType._id
    );
    const isTeacherSelectedForTheClassType = selectedTeacherList.some(
      (teacherObject) =>
        teacherObject.teacher._id === teacherObjectWithClassType.teacher._id &&
        teacherObject.classType._id === teacherObjectWithClassType.classType._id
    );

    if (!isClassTypeAlreadySelected) {
      setSelectedTeacherList([
        ...selectedTeacherList,
        teacherObjectWithClassType,
      ]);
    } else {
      if (isTeacherSelectedForTheClassType) {
        setSelectedTeacherList([
          ...selectedTeacherList.filter(
            (teacherObject) =>
              teacherObject.classType._id !==
              teacherObjectWithClassType.classType._id
          ),
        ]);
      } else {
        setSelectedTeacherList([
          ...selectedTeacherList.filter(
            (teacherObject) =>
              teacherObject.classType._id !==
              teacherObjectWithClassType.classType._id
          ),
          teacherObjectWithClassType,
        ]);
      }
    }
  };
  const isTheTeacherSelectedForTheClassType = (teacherId, classTypeId) => {
    const result = selectedTeacherList.some(
      (teacherObject) =>
        teacherObject.teacher._id === teacherId &&
        teacherObject.classType._id === classTypeId
    );
    console.log("result", result);
    return result;
  };
  const isThereATeacherForTheClassType = (classTypeId) => {
    return selectedTeacherList.some(
      (teacherObject) => teacherObject.classType._id === classTypeId
    );
  };

  const isAllTheClassTypesHaveTeachers = () => {
    const classTypeIds = classTypeList.map((classType) => classType._id);
    const selectedClassTypeIds = selectedTeacherList.map(
      (teacherObject) => teacherObject.classType._id
    );
    return classTypeIds.every((classTypeId) =>
      selectedClassTypeIds.includes(classTypeId)
    );
  };
  useEffect(() => {
    const fetchClassTypes = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/students/listUnregistedClassTypes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const filteredClassTypes = [];
        response.data.map((data) => {
          console.log(data.classType.name);
          let match = classTypeImageObjects.find((classTypeImageObject) => {
            return classTypeImageObject.name === data.classType.name;
          });
          if (match) {
            filteredClassTypes.push({ ...match, _id: data.classType._id });
          }
        });

        setClassTypeList(filteredClassTypes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassTypes();
  }, []);

  return (
    <TeacherSelectionContext.Provider
      value={{
        selectedClassType,
        setSelectedClassType,
        selectTeacher,
        isTheTeacherSelectedForTheClassType,
        isThereATeacherForTheClassType,
        classTypeList,
        isAllTheClassTypesHaveTeachers,
      }}
    >
      {children}
    </TeacherSelectionContext.Provider>
  );
};

const useTeacherSelection = () => {
  const context = useContext(TeacherSelectionContext);
  if (!context) {
    throw new Error(
      "useTeacherSelection must be used within a TeacherSelectionProvider"
    );
  }
  return context;
};
export { TeacherSelectionProvider, useTeacherSelection };
