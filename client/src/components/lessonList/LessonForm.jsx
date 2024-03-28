import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/env.config.js";

const LessonForm = ({ lesson, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    grade: "",
    classType: "",
  });
  const [grades, setGrades] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [gradeClassTypes, setGradeClassTypes] = useState([]);

  useEffect(() => {
    fetchGrades();
    fetchClassTypes();
    fetchGradeClassTypes();
    if (lesson) {
      setFormData({ ...lesson });
    }
  }, [lesson]);

  const fetchGrades = async () => {
    const response = await axios.get(`${config.apiBaseUrl}/api/grade`);
    setGrades(response.data);
  };

  const fetchClassTypes = async () => {
    const response = await axios.get(`${config.apiBaseUrl}/api/classType`);
    setClassTypes(response.data);
  };

  const fetchGradeClassTypes = async () => {
    const response = await axios.get(
      `${config.apiBaseUrl}/api/gradeClassType`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setGradeClassTypes(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = lesson
      ? `${config.apiBaseUrl}/api/lesson/${lesson._id}`
      : `${config.apiBaseUrl}/api/lesson`;
    const method = lesson ? axios.put : axios.post;
    await method(apiEndpoint, formData);
    onSave();
  };

  const filteredClassTypes = formData.grade
    ? classTypes.filter((ct) =>
        gradeClassTypes.some((gct) => {
          //   console.log(
          //     `${gct.grade._id} === ${formData.grade} && ${gct.classType._id} === ${ct._id}`
          //   );
          return (
            gct.grade._id === formData.grade._id && gct.classType._id === ct._id
          );
        })
      )
    : classTypes;

  console.log("formData: ", formData);
  console.log("grades: ", grades);
  console.log("classTypes: ", classTypes);
  console.log("filteredClassTypes:", filteredClassTypes);
  console.log("gradeClassTypes: ", gradeClassTypes);
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow rounded-lg p-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700"
          >
            Lesson Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-semibold text-gray-700"
          >
            Order
          </label>
          <input
            type="number"
            name="order"
            id="order"
            value={formData.order}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-semibold text-gray-700"
          >
            Grade
          </label>
          <select
            name="grade"
            id="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a Grade</option>
            {grades &&
              grades.map((grade) => (
                <option key={grade._id} value={grade._id}>
                  {grade.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="classType"
            className="block text-sm font-semibold text-gray-700"
          >
            Class Type
          </label>
          <select
            name="classType"
            id="classType"
            value={formData.classType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a Class Type</option>
            {filteredClassTypes.map((classType) => (
              <option key={classType._id} value={classType._id}>
                {classType.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Lesson
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
