import { useState } from "react";

import TeacherGradeCards from "./TeacherGradeCards.jsx";
import CustomDropdown from "../Shared/Dropdown/CustomDropdown.jsx";
import { useTeacherClassGrade } from "../../context/TeacherClassGradeProvider.jsx";
const TeacherClassTypeCards = (props) => {
  const { gradeClassTypes } = useTeacherClassGrade();
  const [filteredGradeClassTypes, setFilteredGradeClassTypes] = useState([]);

  const handleSelect = (selectedOption) => {
    if (!selectedOption) {
      setFilteredGradeClassTypes([]);
      return;
    }
    const myFilteredGradeClassTypes = filterGradeClassTypes(selectedOption._id);
    setFilteredGradeClassTypes(myFilteredGradeClassTypes);
  };

  const filterGradeClassTypes = (classTypeId) => {
    console.log("filterGrades->classTypeId:", classTypeId);
    console.log("gradeClassTypes:", gradeClassTypes);
    const myFilteredGradeClassTypes = gradeClassTypes.filter(
      (gct) => gct.classType._id === classTypeId
    );
    console.log("myFilteredGradeClassTypes:", myFilteredGradeClassTypes);
    return myFilteredGradeClassTypes.sort((a, b) => {
      return parseInt(a.grade.name, 10) - parseInt(b.grade.name, 10);
    });
  };

  return (
    <div className="w-11/12 flex items-center justify-start border-2 rounded-xl gap-5 shadow-inner ">
      <form className="w-full flex justify-start items-center">
        <div className="flex justify-start ml-5 gap-5  items-center">
          <CustomDropdown onSelect={handleSelect} />
          <div className="flex justify-start  items-center">
            <TeacherGradeCards gradeClassTypes={filteredGradeClassTypes} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherClassTypeCards;
