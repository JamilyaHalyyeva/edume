import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../../config/env.config.js";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const deleteLesson = async (id) => {
    await axios.delete(`${config.apiBaseUrl}/api/lesson/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setLessons(lessons.filter((lesson) => lesson._id !== id));
  };
  useEffect(() => {
    const fetchLessons = async () => {
      // Adjust the URL based on your API endpoint
      const response = await axios.get(`${config.apiBaseUrl}/api/lesson`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setLessons(response.data.lessons);
    };

    fetchLessons();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lessons</h2>
        <Link
          to="/dashboard/lessons/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Lesson
        </Link>
      </div>
      <ul className="bg-white shadow rounded-lg">
        {lessons &&
          lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="flex justify-between items-center p-4 border-b last:border-b-0"
            >
              <span>{lesson.name}</span>
              <div>
                <Link
                  to={`/dashboard/lessons/edit/${lesson._id}`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteLesson(lesson._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LessonList;
