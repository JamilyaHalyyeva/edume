import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/env.config.js";
import lessons from "../../assets/classTypes/classTypeImageObjects.js";
import SelectTeacherLessonCard from "./SelectTeacherLessonCard.jsx";

const SelectTeacherLesson = () => {
  const [lessonList, setLessonList] = useState([]);

  // Add more lesson data as needed
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/students/listUnregistedClassTypes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log("response", response.data);
        const filteredLessons = [];
        response.data.map((data) => {
          console.log(data.classType.name);
          let match = lessons.find((lesson) => {
            return lesson.name === data.classType.name;
          });
          if (match) {
            filteredLessons.push({ ...match, _id: data.classType._id });
          }
        });

        setLessonList(filteredLessons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLessons();
  }, []);

  return (
    <div>
      <div className="justify-center items-center gap-6 2xl:gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-7 2xl:grid-cols-10 xl:gap-1 mb-[3rem]">
        {lessonList.map((lesson) => (
          <SelectTeacherLessonCard
            key={lesson.id}
            _id={lesson._id}
            name={lesson.name}
            imageSrc={lesson.imageSrc}
            bgColor={lesson.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectTeacherLesson;
