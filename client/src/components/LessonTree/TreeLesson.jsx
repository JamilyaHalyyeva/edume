import { useState } from "react";
import TreeLessonSection from "./TreeLessonSection.jsx";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const TreeLesson = ({ lesson }) => {
  const { handleAddSectionClick } = useLessonManagement();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="lesson">
      <div className="flex items-center">
        <button
          className="flex items-center text-gray-800"
          onClick={toggleExpand}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            className="h-5 w-5"
          />
        </button>
        <h3 className="ml-2">{lesson.name}</h3>
      </div>
      {isExpanded && (
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
      )}
    </div>
  );
};

export default TreeLesson;
