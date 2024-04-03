import { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config/env.config";
import classTypeImageObjects from "../../assets/classTypes/classTypeImageObjects.js";
import TeacherGradeCards from "./TeacherGradeCards.jsx";
import { useRegister } from "../../context/RegisterProvider.jsx";
import CustomDropdown from "../Shared/Dropdown/CustomDropdown.jsx";
const TeacherClassTypeCards = () => {
  const { removeAllGradesWithClassType } = useRegister();
  const [classTypeList, setClassTypeList] = useState([]);
  const [gradeClassTypes, setGradeClassTypes] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState("");
  const [filteredGrades, setFilteredGrades] = useState([]);
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

        console.log("filteredClassTypes:", filteredClassTypes);
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

    //when a classType is selected
  }, []);

  const handleSelect = (selectedOption) => {
    console.log("selectedOption:", selectedOption);
    if (selectedOption === "") {
      removeAllGradesWithClassType(selectedClassType);
    } else if (
      //check if the selected option is changed from the previous one
      selectedClassType &&
      selectedOption._id !== selectedClassType._id
    ) {
      removeAllGradesWithClassType(selectedClassType);
    }

    //store the selected option in the state
    const mySelectedClassType = classTypeList.find(
      (ct) => ct._id === selectedOption._id
    );
    setSelectedClassType(mySelectedClassType);

    //filter the grades based on the selected classType
    const myFilteredGrades = filterGrades(selectedOption._id);
    setFilteredGrades(myFilteredGrades);
  };

  const filterGrades = (classTypeId) => {
    console.log("filterGrades->classTypeId:", classTypeId);
    console.log("gradeClassTypes:", gradeClassTypes);
    const myFilteredGradeClassTypes = gradeClassTypes.filter(
      (gct) => gct.classType._id === classTypeId
    );
    console.log("myFilteredGradeClassTypes:", myFilteredGradeClassTypes);
    return myFilteredGradeClassTypes
      .map((gct) => gct.grade)
      .sort((a, b) => {
        return parseInt(a.name, 10) - parseInt(b.name, 10);
      });
  };
  return (
    <div className="w-full ">
      <form className="w-full">
        <div className="flex justify-start ml-20 mb-5 items-center">
          <CustomDropdown options={classTypeList} onSelect={handleSelect} />

          <div className="flex justify-center  items-center">
            <TeacherGradeCards
              grades={filteredGrades}
              classType={selectedClassType}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherClassTypeCards;
