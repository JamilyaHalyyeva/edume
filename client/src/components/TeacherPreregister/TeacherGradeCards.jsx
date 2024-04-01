import { useEffect, useState } from "react";
import Card from "../Card";
import { useRegister } from "../../context/RegisterProvider";

const TeacherGradeCards = (props) => {
  const { updateUserToBeRegistered, userToBeRegistered } = useRegister();
  const [selectedGrades, setSelectedGrades] = useState([]);

  const handleCardClick = (grade) => {
    if (selectedGrades.includes(grade)) {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
      updateUserToBeRegistered({
        teacherClassTypeGrades: [
          ...userToBeRegistered.teacherClassTypeGrades.filter(
            (g) => g.grade !== grade
          ),
        ],
      });
      return;
    }
    setSelectedGrades([...selectedGrades, grade]);
    if (
      userToBeRegistered.teacherClassTypeGrades &&
      userToBeRegistered.teacherClassTypeGrades.length > 0
    ) {
      updateUserToBeRegistered({
        teacherClassTypeGrades: [
          ...userToBeRegistered.teacherClassTypeGrades,
          {
            classType: { _id: props.classType._id, name: props.classType.name },
            grade: grade,
          },
        ],
      });
    } else {
      updateUserToBeRegistered({
        teacherClassTypeGrades: [
          {
            classType: { _id: props.classType._id, name: props.classType.name },
            grade: grade,
          },
        ],
      });
    }

    console.log(grade);
  };
  useEffect(() => {}, [props.grades]);
  return (
    <div className="w-full flex flex-row h-auto">
      {props.grades.map((grade) => (
        <Card
          key={grade._id}
          title={`${grade.name}.`}
          isSelected={selectedGrades.includes(grade)}
          content={"Grade"}
          onCardClick={() => handleCardClick(grade)}
        />
      ))}
    </div>
  );
};

export default TeacherGradeCards;
