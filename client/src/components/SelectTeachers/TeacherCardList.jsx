import { useEffect, useState } from "react";
import { useTeacherSelection } from "../../context/TeacherSelectionProvider";
import axios from "axios";
import config from "../../config/env.config";
import TeacherCard from "./TeacherCard";

const TeacherCardList = () => {
  const { selectedLesson } = useTeacherSelection();
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      if (selectedLesson) {
        try {
          const response = await axios.get(
            `${config.apiBaseUrl}/api/students/listTeachersOfClasTypeGrade/${selectedLesson._id}`,
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
  }, [selectedLesson]);
  return (
    <div className="flex flex-row ">
      {teachers &&
        teachers.length > 0 &&
        teachers.map((teacher) => (
          <TeacherCard key={teacher._id} {...teacher} />
        ))}
    </div>
  );
};

export default TeacherCardList;
