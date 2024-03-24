import axios from "axios";
import { useRegister } from "../context/RegisterProvider";
import Card from "./Card";
import { useEffect, useState } from "react";
import config from "../config/env.config";

const ClassCards = () => {
  const { updateUserToBeRegistered } = useRegister();
  const [selectedGrade, setSelectedGrade] = useState();
  const [gradeData, setGradeData] = useState([]);
  const handleCardClick = (grade) => {
    setSelectedGrade(grade);
    updateUserToBeRegistered({ grade: grade._id });
  };

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/api/grade`).then((res) => {
      console.log(res.data);
      setGradeData(res.data);
      updateUserToBeRegistered({ grade: res.data[0]._id });
      setSelectedGrade(res.data[0]);
    });
  }, []);
  return (
    <div className="container mx-auto mt-10 pl-20 pr-20 bg-gray-100 flex flex-wrap justify-center flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4">Select Your Grade </h2>
      <div className="grid grid-cols-8 gap-1 w-11/12 mt-10 ">
        {gradeData.length > 0 &&
          gradeData.map((grade) => (
            <Card
              key={grade._id}
              title={`${grade.name}.`}
              isSelected={selectedGrade && selectedGrade.name === grade.name}
              content={"Grade"}
              onCardClick={() => handleCardClick(grade)}
            />
          ))}
      </div>
    </div>
  );
};
export default ClassCards;
