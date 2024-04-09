import { useEffect, useState } from "react";
import { useTeacherSelection } from "../../context/TeacherSelectionProvider";
import axios from "axios";
import config from "../../config/env.config";
import TeacherCard from "./TeacherCard";

const TeacherCardList = () => {
  const { selectedClassType } = useTeacherSelection();
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      if (selectedClassType) {
        try {
          const response = await axios.get(
            `${config.apiBaseUrl}/api/students/listTeachersOfClasTypeGrade/${selectedClassType._id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          console.log("response", response.data);
          setTeachers(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchTeachers();
  }, [selectedClassType]);
  return (
    <div className=" grid grid-cols-4 gap-3  mt-8 mb-8">
      {teachers &&
        teachers.length > 0 &&
        teachers.map((teacher) => (
          <TeacherCard
            key={teacher._id}
            {...teacher}
            classType={selectedClassType}
          />
        ))}
    </div>
  );
};

export default TeacherCardList;
