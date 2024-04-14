import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/env.config";
import classTypeImageObjects from "../assets/classTypes/classTypeImageObjects";
const TeacherSelectionContext = createContext();

const TeacherSelectionProvider = ({ children }) => {
  const [selectedClassType, setSelectedClassType] = useState(null);
  const [selectedTeacherList, setSelectedTeacherList] = useState([]);
  const [classTypeList, setClassTypeList] = useState([]);
  const [isAllTeachersSelected, setIsAllTeachersSelected] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Whenever selectedTeacherList changes, check if all teachers are registered
    checkIfStudentRegisteredAllTeachers();
    if (classTypeList.length === 0) {
      fetchClassTypes();
    }
  }, [selectedTeacherList, classTypeList]);
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
  const checkIfStudentRegisteredAllTeachers = () => {
    if (isAllTheClassTypesHaveTeachers()) {
      console.log("All teachers are selected");
      setIsAllTeachersSelected(true);
    } else {
      console.log("All teachers are not selected");
      setIsAllTeachersSelected(false);
    }
  };
  const registerSelectedTeachers = async () => {
    if (isAllTeachersSelected === true) {
      try {
        const response = await axios.post(
          `${config.apiBaseUrl}/api/students/registerSelectedTeachers`,
          {
            selectedTeachers: selectedTeacherList.map((teacherObject) => ({
              teacherId: teacherObject.teacher._id,
              classTypeId: teacherObject.classType._id,
            })),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          console.log("Teachers registered successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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

  return (
    <TeacherSelectionContext.Provider
      value={{
        selectedClassType,
        setSelectedClassType,
        selectTeacher,
        isTheTeacherSelectedForTheClassType,
        isThereATeacherForTheClassType,
        classTypeList,
        isAllTeachersSelected,
        registerSelectedTeachers,
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
