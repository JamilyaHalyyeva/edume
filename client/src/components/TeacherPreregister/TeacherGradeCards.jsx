import { useEffect } from "react";
import Card from "../Card";
import { useRegister } from "../../context/RegisterProvider";

const TeacherGradeCards = (props) => {
  const { userToBeRegistered, removeGrade, addGrade } = useRegister();

  const toggleSelected = (gradeClassType) => {
    console.log("toggleSelected-_grade:", gradeClassType);
    if (
      userToBeRegistered.teacherClassTypeGrades &&
      userToBeRegistered.teacherClassTypeGrades.find(
        (g) =>
          g.grade._id === gradeClassType.grade._id &&
          g.classType._id === gradeClassType.classType._id
      )
    ) {
      removeGrade(gradeClassType);
    } else {
      addGrade(gradeClassType);
    }
  };

  const isSelected = (gradeClassType) => {
    return (
      userToBeRegistered.teacherClassTypeGrades &&
      userToBeRegistered.teacherClassTypeGrades.find(
        (g) =>
          g.grade._id === gradeClassType.grade._id &&
          g.classType._id === gradeClassType.classType._id
      )
    );
  };
  const handleCardClick = (gradeClassType) => {
    toggleSelected(gradeClassType);
  };
  useEffect(() => {}, [props.gradeClassTypes]);
  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 lg:gap-3 lg:p-2  2xl:grid-cols-8 2xl:gap-5 2xl:p-4 gap-2 p-2">
      {props.gradeClassTypes.map((gct) => (
        <Card
          key={gct.grade._id}
          title={`${gct.grade.name}.`}
          isSelected={isSelected(gct)}
          content={"Grade"}
          onCardClick={() => handleCardClick(gct)}
        />
      ))}
    </div>
  );
};

export default TeacherGradeCards;
