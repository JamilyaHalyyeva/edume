import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarImageGallery from "../components/AvatarImageGallery";
import TeacherClassTypeCards from "../components/TeacherPreregister/TeacherClassTypeCards";
import { useRegister } from "../context/RegisterProvider";
import axios from "axios";

import classTypeImageObjects from "../assets/classTypes/classTypeImageObjects";
import config from "../config/env.config";

const TeacherPreProfilePage = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  const [selectedClassTypes, setSelectedClassTypes] = useState({});
  const [classTypeList, setClassTypeList] = useState([]);
  const [gradeClassTypes, setGradeClassTypes] = useState([]);

  const handleSelect = (selectedOption, index) => {
    setSelectedClassTypes((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (selectedOption) {
        newSelected[index] = selectedOption._id;
      } else {
        delete newSelected[index];
      }
      return newSelected;
    });
  };

  const getFilteredOptions = (index) => {
    const selectedIds = Object.values(selectedClassTypes).filter(
      (_, i) => i !== index
    );

    return classTypeList.filter((ct) => !selectedIds.includes(ct._id));
  };

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

  return (
    <div className="bg-slate-100 w-full h-full flex flex-col items-center justify-center 2xl:p-10">
      <div className="flex justify-start pt-10 pb-2 pl-20 pr-20 mr-40">
        <button onClick={() => navigate("/register")} className="...">
          Back
        </button>
      </div>
      <AvatarImageGallery />
      <div className="w-full flex justify-center items-center">
        <h2 className="text-2xl font-bold m-[2rem]">
          Select Classes and Grades or Create Your Own.
        </h2>
      </div>
      {[...Array(3).keys()].map((i) => (
        <TeacherClassTypeCards
          key={i}
          options={getFilteredOptions(i)}
          onSelect={(selected) => handleSelect(selected, i)}
          selectedClassType={selectedClassTypes[i]}
          gradeClassTypes={gradeClassTypes}
        />
      ))}
      <div className="flex justify-end pt-10 pb-2 pl-20 pr-20 mr-10">
        <button onClick={registerUser} className="...">
          Register
        </button>
      </div>
    </div>
  );
};

export default TeacherPreProfilePage;
