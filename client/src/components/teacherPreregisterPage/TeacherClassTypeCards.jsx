import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/env.config";
import lessons from "../../assets/lessons/lessons.js";
const TeacherClassTypeCards = () => {
  const [lessonList, setLessonList] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/gradeClassType`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        const filteredLessons = [];
        response.data.map((data) => {
          console.log(data.classType.name);
          let match = lessons.find((lesson) => {
            return lesson.name === data.classType.name;
          });
          if (match) {
            filteredLessons.push(match);
          }
        });

        setLessonList(filteredLessons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLessons();
    console.log("lessons:", lessonList);
  }, []);

  const handleChange = (event) => {
    setSelectedLesson(event.target.value);
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="lessons"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a lesson
        </label>
        <select
          id="lessons"
          value={selectedLesson}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Choose a lesson</option>
          {lessonList.map((lesson) => (
            <option key={lesson._id} value={lesson._id}>
              {lesson.name}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default TeacherClassTypeCards;
