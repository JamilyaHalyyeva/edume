import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import config from "../../config/env.config.js";
import Table from "../Shared/Table/Table.jsx";

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const { lessonName } = useParams();
  const deleteLesson = async (id) => {
    await axios.delete(`${config.apiBaseUrl}/api/lesson/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setLessons(lessons.filter((lesson) => lesson._id !== id));
  };
  const fetchLessons = async () => {
    // Adjust the URL based on your API endpoint
    const response = await axios.get(`${config.apiBaseUrl}/api/lesson`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    console.log("LessonList-> fetchLessons ", response.data.lessons);
    setLessons(response.data.lessons);
  };

  useEffect(() => {
    if (lessons.length === 0) {
      fetchLessons();
    }
    if (lessons.length > 0) {
      if (lessonName) {
        setFilteredLessons(
          lessons.filter((lesson) => lesson.classType.name === lessonName)
        );
      } else {
        setFilteredLessons(lessons);
      }
    }
  }, [lessonName, lessons]);
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Grade", accessor: "grade" },
    { header: "Class Type", accessor: "classType" },
    { header: "Actions", accessor: "actions" },
  ];
  return (
    <div className="p-4 h-screen overflow-y-auto pb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lessons</h2>
        <Link
          to="/dashboard/lessons/new"
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-3xl"
        >
          Create New Lesson
        </Link>
      </div>
      <ul className="bg-white shadow rounded-lg">
        <Table
          columns={columns}
          data={filteredLessons.map((lesson) => ({
            name: lesson.name,
            grade: lesson.grade.name,
            classType: lesson.classType.name,
            actions: (
              <div>
                <Link
                  to={`/dashboard/lessons/manage/${lesson._id}`}
                  className="text-green-700 mr-2"
                >
                  Manage
                </Link>
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
            ),
          }))}
        ></Table>

        {/* {lessons &&
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
          ))} */}
      </ul>
    </div>
  );
};

export default LessonList;
