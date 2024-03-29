import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/env.config.js";
import axios from "axios";

const LessonManage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState({});
  console.log("lessonId: ", lessonId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/api/lesson/${lessonId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log("response: ", response);
        setLesson(response.data.lesson);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

    console.log("lessonId: ", lessonId);
  }, [lessonId]);
  return (
    <div>
      <h1>Lesson Manage</h1>
      {lesson &&
      lesson.grade &&
      lesson.classType &&
      lesson.grade.name &&
      lesson.classType.name ? (
        <>
          {" "}
          <p>Lesson ID: {lessonId}</p>
          <p>Lesson Name: {lesson.name}</p>
          <p>Lesson Grade: {lesson.grade.name}</p>
          <p>Lesson Class Type: {lesson.classType.name}</p>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default LessonManage;
