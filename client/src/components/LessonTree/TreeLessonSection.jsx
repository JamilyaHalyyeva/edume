import { useState } from "react";
import TreeLesonSectionContent from "./TreeLessonSectionContent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";

const TreeLessonSection = ({ section }) => {
  const { handleAddSubSectionClick } = useLessonManagement();
  const [isExpanded, setIsExpanded] = useState(true);
  console.log(section);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="lesson-section">
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
        <h4 className="ml-2">{section.name}</h4>
      </div>
      {isExpanded && (
        <>
          {" "}
          <ul className="section-content">
            {section.sectionContents.map((content, index) => (
              <TreeLesonSectionContent key={index} content={content} />
            ))}
          </ul>
          <div className="pipe ml-3">|</div>
          <button
            onClick={() => handleAddSubSectionClick(section._id)}
            className="ml-3 btn bg-green-300 p-2 rounded-md text-black"
          >
            Add SubSection
          </button>
        </>
      )}
    </div>
  );
};

export default TreeLessonSection;
