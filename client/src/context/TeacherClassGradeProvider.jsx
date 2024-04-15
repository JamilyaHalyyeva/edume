import axios from "axios";
import config from "../config/env.config.js";
import classTypeImageObjects from "../assets/classTypes/classTypeImageObjects.js";
import { createContext, useContext, useEffect, useState } from "react";

const TeacherClassGradeContext = createContext();

const TeacherClassGradeProvider = ({ children }) => {
  const [selectedClassTypes, setSelectedClassTypes] = useState([]);
  const [classTypeList, setClassTypeList] = useState([]);
  const [gradeClassTypes, setGradeClassTypes] = useState([]);

  useEffect(() => {
    const fetchClassTypes = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/classType`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const filteredClassTypes = [];

        response.data.map((ct) => {
          let match = classTypeImageObjects.find((lesson) => {
            return lesson.name === ct.name;
          });
          if (match) {
            filteredClassTypes.push({ ...match, _id: ct._id });
          }
        });

        setClassTypeList(filteredClassTypes);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGradeClassTypes = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/gradeClassType`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setGradeClassTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassTypes();
    fetchGradeClassTypes();
  }, []);

  const getFilteredOptions = () => {
    if (selectedClassTypes && selectedClassTypes.length > 0) {
      return classTypeList.filter(
        (ct) => !selectedClassTypes.find((sct) => sct._id === ct._id)
      );
    } else {
      return classTypeList;
    }
  };

  const handleClassTypeComboSelect = (option) => {
    console.log("handleClassTypeComboSelect->option:", option);
    setSelectedClassTypes((prev) => {
      let result = [];
      if (option.previousSelection) {
        result = prev.filter((sct) => sct._id !== option.previousSelection._id);
      } else {
        result = [...prev];
      }
      if (option.currentSelection) {
        result.push(option.currentSelection);
      }
      return result;
    });
  };

  return (
    <TeacherClassGradeContext.Provider
      value={{
        selectedClassTypes,
        classTypeList,
        gradeClassTypes,
        handleClassTypeComboSelect,
        getFilteredOptions,
      }}
    >
      {children}
    </TeacherClassGradeContext.Provider>
  );
};

const useTeacherClassGrade = () => {
  const context = useContext(TeacherClassGradeContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherClassGrade must be used within a TeacherClassGradeProvider"
    );
  }
  return context;
};

export { TeacherClassGradeProvider, useTeacherClassGrade };
