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
    <div className="flex flex-col w-full">
      <div className="flex  flex-col w-full justify-center items-start ">
        {/* this is the lesson info and lesson structure  */}
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col p-2  bg-orange-400 w-full">
            <div className=" grid grid-cols-3 p-2  ">
              {lesson &&
              lesson.grade &&
              lesson.classType &&
              lesson.grade.name &&
              lesson.classType.name ? (
                <>
                  <div className=" gap-10">
                    <p> {lesson.name}</p>
                  </div>
                  <div>
                    <p> Grade: {lesson.grade.name}</p>
                  </div>
                  <div>
                    <p>Lesson Class Type: {lesson.classType.name}</p>
                  </div>
                </>
              ) : (
                "Loading..."
              )}
            </div>
          </div>
          <div className="flex flex-col  w-full ">
            <div className="flex flex-col p-2">
              <div className="lesson-tree">
                <TreeLesson lesson={lesson} />
              </div>
            </div>
          </div>
        </div>
        {/* here is the action panel for adding sections and contents */}
        {/* <div className="flex flex-col w-full shadow mx-2 p-2">
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
        </div> */}
      </div>
    </div>
  );
};

export default LessonManage;
