import { useState } from "react";

import TeacherGradeCards from "./TeacherGradeCards.jsx";
import { useRegister } from "../../context/RegisterProvider.jsx";
import CustomDropdown from "../Shared/Dropdown/CustomDropdown.jsx";
const TeacherClassTypeCards = ({
  options,
  selectedClassType,
  onSelect,
  gradeClassTypes,
}) => {
  console.log("TeacherClassTypeCards->gradeClassTypes:", gradeClassTypes);
  const { removeAllGradesWithClassType } = useRegister();
  const [filteredGrades, setFilteredGrades] = useState([]);

  const handleSelect = (selectedOption) => {
    console.log("selectedOption:", selectedOption);
    onSelect(selectedOption);
    if (selectedOption === "") {
      removeAllGradesWithClassType(selectedClassType);
    } else if (
      //check if the selected option is changed from the previous one
      selectedClassType &&
      selectedOption._id !== selectedClassType._id
    ) {
      removeAllGradesWithClassType(selectedClassType);
    }

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
  const selectedOption = () => {
    console.log("selectedClassType:", selectedClassType);
    console.log("options:", options);
    return options.find((option) => option._id === selectedClassType);
  };

  return (
    <div className="w-full ">
      <form className="w-full">
        <div className="flex justify-start ml-20 mb-5 items-center">
          <CustomDropdown
            options={options}
            onSelect={handleSelect}
            selectedOption={selectedOption()}
          />

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
