import React from "react";
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
// Import images for other lessons as needed

const Lessons = () => {
  const [showAll, setShowAll] = useState(false);
  // Array containing lesson data
  const lessons = [
    {
      id: 1,
      description: "Biologie",
      imageSrc: lesson1Image,
      bgColor: "bg-green-300",
    },
    {
      id: 2,
      description: "Mathematik",
      imageSrc: lesson2Image,
      bgColor: "bg-red-400",
    },
    {
      id: 3,
      description: "History",
      imageSrc: lesson3Image,
      bgColor: "bg-blue-400",
    },
    {
      id: 4,
      description: "Music",
      imageSrc: lesson4Image,
      bgColor: "bg-pink-400",
    },
  ];

  const allLessons = [
    ...lessons,

    {
      id: 5,
      description: "Geography",
      imageSrc: lesson5Image,
      bgColor: "bg-yellow-400",
    },
    {
      id: 6,
      description: "Physics",
      imageSrc: lesson6Image,
      bgColor: "bg-green-400",
    },
    {
      id: 7,
      description: "Biology",
      imageSrc: lesson7Image,
      bgColor: "bg-purple-400",
    },
    {
      id: 2,
      description: "Mathematik",
      imageSrc: lesson2Image,
      bgColor: "bg-red-400",
    },

    {
      id: 9,
      description: "English",
      imageSrc: lesson9Image,
      bgColor: "bg-cyan-400",
    },
    {
      id: 10,
      description: "German",
      imageSrc: lesson10Image,
      bgColor: "bg-indigo-400",
    },
    {
      id: 3,
      description: "History",
      imageSrc: lesson3Image,
      bgColor: "bg-blue-400",
    },
    {
      id: 8,
      description: "French",
      imageSrc: lesson8Image,
      bgColor: "bg-orange-400",
    },
  ];

  // Add more lesson data as needed

  const lessonsToShow = showAll ? allLessons : lessons;
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
            description={lesson.description}
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
