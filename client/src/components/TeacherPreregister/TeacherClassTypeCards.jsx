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
    const myFilteredGradeClassTypes = gradeClassTypes.filter(
      (gct) => gct.classType._id === classTypeId
    );
    return myFilteredGradeClassTypes.sort((a, b) => {
      return parseInt(a.grade.name, 10) - parseInt(b.grade.name, 10);
    });
  };

  return (
    <div className="w-11/12 flex items-center justify-start border-2 rounded-xl gap-5 shadow-inner ">
      <form className="w-full flex justify-center p-3 md:justify-start lg:justify-start xl:justify-start items-center">
        <div className="flex justify-center  md:ml-2 lg:ml-2 xl:ml-2 gap-3 flex-col md:flex-row  items-center">
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
