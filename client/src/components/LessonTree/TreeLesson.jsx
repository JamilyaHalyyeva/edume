import { useState } from "react";
import TreeLessonSection from "./TreeLessonSection.jsx";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";

const TreeLesson = ({ lesson }) => {
  const { handleAddSectionClick } = useLessonManagement();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="lesson ">
      {isExpanded && (
        <div className="ml-2 ">
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
