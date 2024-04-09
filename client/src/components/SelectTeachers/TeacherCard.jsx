import React from "react";
import avatars from "../../assets/avatars/avatars";

const TeacherCard = (props) => {
  // Destructure the teacher object for easier access to properties

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {props.username} {props.surname}
      </h2>
      <p className="mb-2">
        <strong>Email:</strong> {props.email}
      </p>
      <div>
        <img
          className="w-14 h-14 rounded-full"
          src={avatars.find((avatar) => avatar.alt === props.avatar).src}
          alt="User"
        />
      </div>

      {props.teacherClassTypeGrades &&
        props.teacherClassTypeGrades.length > 0 && (
          <div>
            <strong>Classes & Grades:</strong>
            <ul className="list-disc list-inside">
              {props.teacherClassTypeGrades.map((item, index) => (
                <li key={index}>
                  Class: {item.classType.name}, Grade: {item.grade.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      {/* Additional teacher details here */}
    </div>
  );
};

export default TeacherCard;
