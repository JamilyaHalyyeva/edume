import { useEffect } from "react";
import LessonsCard from "./LessonsCard";
import { useState } from "react";

import axios from "axios";
import config from "../config/env.config";
import lessons from "../assets/lessons/lessons.js";
// Import images for other lessons as needed

const Lessons = () => {
  const [showAll, setShowAll] = useState(false);
  const [lessonList, setLessonList] = useState([]);

  // Add more lesson data as needed
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
  }, []);

  const lessonsToShow = showAll ? lessonList : lessonList.slice(0, 4);
  return (
    <div>
      <div className="justify-start  items-start  font-serif flex w-full ">
        <div className=" justify-start items-center  ">
          <h1 className="text-2xl mt-4">All Lessons in EduMe!! </h1>
        </div>
      </div>
      <div className="mt-5 justify-center items-center  gap-4 2xl:gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 xl:gap-5 mb-[3rem] ">
        {/* Loop through lessons array and generate LessonCard components */}
        {lessonsToShow.map((lesson) => (
          <LessonsCard
            key={lesson.id}
            name={lesson.name}
            imageSrc={lesson.imageSrc}
            bgColor={lesson.bgColor}
          />
        ))}
        {lessonList.length > 4 && !showAll && (
          <div className="col-span-full mt-6 text-center">
            <button
              className="rounded-3xl bg-orange-400 w-[9rem] h-[3rem] shadow-2xl hover:shadow-orange-600"
              onClick={() => setShowAll(true)}
            >
              All Lessons
            </button>
          </div>
        )}
        {showAll && (
          <div className="col-span-full mt-6 text-center">
            <button
              className="rounded-3xl bg-orange-400 w-[9rem] h-[3rem] shadow-2xl hover:shadow-orange-600"
              onClick={() => setShowAll(false)}
            >
              Less Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
