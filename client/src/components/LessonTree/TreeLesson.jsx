import React from "react";
import TreeLessonSection from "./TreeLessonSection.jsx";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";

const TreeLesson = ({ lesson }) => {
  const { handleAddSectionClick } = useLessonManagement();
  return (
    <div className="lesson">
      <h3>{lesson.name}</h3>
      <div className="ml-2">
        {lesson.lessonSections && lesson.lessonSections.length > 0 && (
          <div className="lesson-sections">
            {lesson.lessonSections.map((section, index) => (
              <TreeLessonSection key={index} section={section} />
            ))}
          </div>
        )}
        <div className="pipe">|</div>
        <button
          className="btn bg-purple-300 p-2 rounded-md text-black "
          onClick={handleAddSectionClick}
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default TreeLesson;
