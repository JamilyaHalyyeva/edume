import Card from "./Card";
import { useState } from "react";
const gradedata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const ClassCards = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const handleCardClick = (grade) => {
    // If the clicked card is already selected, deselect it
    if (selectedGrade === grade) {
      setSelectedGrade(null);
    } else {
      // Reset other cards and set the selected grade for the clicked card
      gradedata.forEach((g) => {
        if (g !== grade) {
          setSelectedGrade(null);
        }
      });
      setSelectedGrade(grade);
    }
  };
  return (
    <div className="container mx-auto mt-10 p-20 bg-gray-100 flex flex-wrap justify-center flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4">Select Your Grade </h2>
      <div className="grid grid-cols-8 gap-1 w-11/12 mt-10 ">
        {gradedata.map((grade) => (
          <Card
            key={grade}
            title={`${grade}.`}
            isSelected={selectedGrade === grade}
            content={"Grade"}
            onCardClick={() => handleCardClick(grade)}
          />
        ))}
      </div>
    </div>
  );
};
export default ClassCards;
