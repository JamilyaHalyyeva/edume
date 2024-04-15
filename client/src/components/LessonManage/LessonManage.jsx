import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/env.config.js";
import axios from "axios";
import TreeLesson from "../LessonTree/TreeLesson.jsx";
import LessonSection from "./LessonSection.jsx";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";
import LessonSubSection from "./LessonSubSection.jsx";

const LessonManage = () => {
  const { lessonId } = useParams();
  const {
    isNewSubSectionOrSubSectionSelected,
    isNewSectionOrSectionSelected,
    lesson,
    setLesson,
  } = useLessonManagement();

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
        console.log("LessonManage-> fetchData ", response.data.lesson);
        setLesson(response.data.lesson);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [lessonId]);

  return (
    <div className="flex flex-col">
      <h1 className="w-full">Lesson Manage</h1>
      <div className="flex  flex-row justify-center items-start shadow p-4 mt-2">
        {/* this is the lesson info and lesson structure  */}
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-col p-2 shadow">
            <div>Lesson Info:</div>
            <div className=" flex flex-col p-2 ">
              {lesson &&
              lesson.grade &&
              lesson.classType &&
              lesson.grade.name &&
              lesson.classType.name ? (
                <>
                  {" "}
                  <p>Lesson Name: {lesson.name}</p>
                  <p>Lesson Grade: {lesson.grade.name}</p>
                  <p>Lesson Class Type: {lesson.classType.name}</p>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          <div className="flex flex-col shadow w-full p-2">
            <h1>Lesson Structure:</h1>

            <div className="flex flex-col p-2">
              <div className="lesson-tree">
                <TreeLesson lesson={lesson} />
              </div>
            </div>
          </div>
        </div>
        {/* here is the action panel for adding sections and contents */}
        <div className="flex flex-col w-full shadow mx-2 p-2">
          {isNewSectionOrSectionSelected ? (
            <div className="flex flex-col">
              <LessonSection />
            </div>
          ) : isNewSubSectionOrSubSectionSelected ? (
            // Add your code for isNewSubSectionOrSubSectionSelected condition here
            <div className="flex flex-col">
              <LessonSubSection />
            </div>
          ) : (
            <div className="flex flex-row text-black">
              <p>there is no section selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonManage;
