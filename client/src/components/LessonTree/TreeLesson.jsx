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
      <div className="flex items-center "></div>
      {isExpanded && (
        <div className="ml-2">
          {lesson.lessonSections && lesson.lessonSections.length > 0 && (
            <div className="lesson-sections">
              {lesson.lessonSections.map((section, index) => (
                <TreeLessonSection
                  key={index}
                  section={section}
                  isSubSectionEnabled={true}
                  isChildSection={false}
                />
              ))}
            </div>
          )}

          <button
            className="btn bg-orange-400 p-2 rounded-2xl text-black "
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
