import { useEffect } from "react";
import Card from "../Card";
import { useRegister } from "../../context/RegisterProvider";

const TeacherGradeCards = (props) => {
  const { userToBeRegistered, removeGrade, addGrade } = useRegister();

  const toggleSelected = (grade) => {
    console.log("toggleSelected-_grade:", grade);
    if (
      userToBeRegistered.teacherClassTypeGrades &&
      userToBeRegistered.teacherClassTypeGrades.find(
        (g) =>
          g.grade._id === grade._id && g.classType._id === props.classType._id
      )
    ) {
      removeGrade({ grade: grade, classType: props.classType });
    } else {
      addGrade({ grade: grade, classType: props.classType });
    }
  };

  const isSelected = (grade) => {
    return (
      userToBeRegistered.teacherClassTypeGrades &&
      userToBeRegistered.teacherClassTypeGrades.find(
        (g) =>
          g.grade._id === grade._id && g.classType._id === props.classType._id
      )
    );
  };
  const handleCardClick = (grade) => {
    toggleSelected(grade);
  };
  useEffect(() => {}, [
    props.grades,
    userToBeRegistered.teacherClassTypeGrades,
  ]);
  return (
    <div className="w-full flex flex-row h-auto gap-2 mb-4">
      {props.grades.map((grade) => (
        <Card
          key={grade._id}
          title={`${grade.name}.`}
          isSelected={isSelected(grade)}
          content={"Grade"}
          onCardClick={() => handleCardClick(grade)}
        />
      ))}
    </div>
  );
};

export default TeacherGradeCards;
