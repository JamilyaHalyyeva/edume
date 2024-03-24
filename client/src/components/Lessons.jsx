import React, { useEffect } from "react";
import LessonsCard from "./LessonsCard";
import { useState } from "react";

// Import lesson images
import lesson1Image from "../assets/lessons/lesson1.png";
import lesson2Image from "../assets/lessons/lesson2.png";
import lesson3Image from "../assets/lessons/lesson3.png";
import lesson4Image from "../assets/lessons/lesson4.png";
import lesson5Image from "../assets/lessons/lesson5.png";
import lesson6Image from "../assets/lessons/lesson6.png";
import lesson7Image from "../assets/lessons/lesson7.png";
import lesson8Image from "../assets/lessons/lesson8.png";
import lesson9Image from "../assets/lessons/lesson9.png";
import lesson10Image from "../assets/lessons/lesson10.png";
import axios from "axios";
import config from "../config/env.config";
// Import images for other lessons as needed

const Lessons = () => {
  const [showAll, setShowAll] = useState(false);
  const [lessonList, setLessonList] = useState([]);
  // Array containing lesson data

  const allLessons = [
    {
      id: 1,
      name: "Biologie",
      imageSrc: lesson1Image,
      bgColor: "bg-green-300",
    },
    {
      id: 2,
      name: "Math",
      imageSrc: lesson2Image,
      bgColor: "bg-red-400",
    },
    {
      id: 3,
      name: "History",
      imageSrc: lesson3Image,
      bgColor: "bg-blue-400",
    },
    {
      id: 4,
      name: "Music",
      imageSrc: lesson4Image,
      bgColor: "bg-pink-400",
    },

    {
      id: 5,
      name: "Geography",
      imageSrc: lesson5Image,
      bgColor: "bg-yellow-400",
    },
    {
      id: 6,
      name: "Physics",
      imageSrc: lesson6Image,
      bgColor: "bg-green-400",
    },
    {
      id: 7,
      name: "Biology",
      imageSrc: lesson7Image,
      bgColor: "bg-purple-400",
    },

    {
      id: 9,
      name: "English",
      imageSrc: lesson9Image,
      bgColor: "bg-cyan-400",
    },
    {
      id: 10,
      name: "German",
      imageSrc: lesson10Image,
      bgColor: "bg-indigo-400",
    },

    {
      id: 8,
      name: "French",
      imageSrc: lesson8Image,
      bgColor: "bg-orange-400",
    },
  ];

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
          let match = allLessons.find((lesson) => {
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
      <div
        className="  mt-5 justify-center items-center flex-wrap gap-4
    grid grid-cols-4 mb-[1rem] "
      >
        {/* Loop through lessons array and generate LessonCard components */}
        {lessonsToShow.map((lesson) => (
          <LessonsCard
            key={lesson.id}
            name={lesson.name}
            imageSrc={lesson.imageSrc}
            bgColor={lesson.bgColor}
          />
        ))}
        {!showAll && (
          <div
            className="col-span-4  mt-6 cursor-pointer  font-serif text-center text-gray-800 "
            onClick={() => setShowAll(true)}
          >
            <button className="rounded-3xl bg-orange-400 w-[8rem] h-[3rem]  shadow-2xl  hover:shadow-orange-600">
              All Lessons
            </button>
          </div>
        )}
        {showAll && (
          <div
            className="col-span-4 cursor-pointer mt-6 font-serif text-center text-gray-800  "
            onClick={() => setShowAll(false)}
          >
            <button className="  rounded-3xl bg-orange-400 w-[8rem] h-[3rem] shadow-2xl  hover:shadow-orange-600">
              Less Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lessons;
