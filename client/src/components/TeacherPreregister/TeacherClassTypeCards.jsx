import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/env.config";
import classTypeImageObjects from "../../assets/classTypes/classTypeImageObjects.js";
import TeacherGradeCards from "./TeacherGradeCards.jsx";
import { useRegister } from "../../context/RegisterProvider.jsx";
const TeacherClassTypeCards = () => {
  const { updateUserToBeRegistered, userToBeRegistered } = useRegister();
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
        //filterin from previously selected classType from userToBeRegistered
        if (userToBeRegistered.teacherClassTypeGrades) {
          const myUnselectedClassTypes = classTypeList.filter(
            (ctl) =>
              !userToBeRegistered.teacherClassTypeGrades
                .map((tctg) => tctg.classType._id)
                .includes(ctl._id)
          );

          setClassTypeList(myUnselectedClassTypes);
        }
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

  const handleChange = (event) => {
    if (event.target.value === "") {
      console.log(
        "userToBeRegistered.teacherClassTypesGrades:",
        userToBeRegistered.teacherClassTypesGrades
      );
      updateUserToBeRegistered({
        teacherClassTypeGrades: [
          ...userToBeRegistered.teacherClassTypeGrades.filter(
            (g) => g.classType._id !== selectedClassType._id
          ),
        ],
      });
    }
    const mySelectedClassType = classTypeList.find(
      (ct) => ct._id === event.target.value
    );
    setSelectedClassType(mySelectedClassType);

    const myFilteredGrades = filterGrades(event.target.value);
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
        <div className="flex justify-start ml-60 items-center">
          <select
            id="classTypes"
            value={
              selectedClassType && selectedClassType._id
                ? selectedClassType._id
                : ""
            }
            onChange={handleChange}
            className="bg-gray-50 w-[10rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-orange-500 block  p-2.5"
          >
            <option value="">Choose a lesson</option>
            {classTypeList.map((classtype) => (
              <option key={classtype._id} value={classtype._id}>
                {classtype.name}
              </option>
            ))}
          </select>
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
