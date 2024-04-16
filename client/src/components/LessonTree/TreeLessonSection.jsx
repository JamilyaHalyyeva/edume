import { useState } from "react";
import TreeLesonSectionContent from "./TreeLessonSectionContent.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFolderClosed,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";
import AddSectionContent from "../LessonManage/AddSectionContent.jsx";

const TreeLessonSection = ({
  section,
  isSubSectionEnabled,
  isChildSection,
}) => {
  const { handleAddSubSectionClick } = useLessonManagement();
  const [isExpanded, setIsExpanded] = useState(true);
  const [addContentMode, setAddContentMode] = useState(false);
  console.log(section);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleAddSectionContent = (sectionId) => {
    setAddContentMode(true);
    console.log("sectionId", sectionId);
  };

  const handleAddSectionCancelClick = () => {
    setAddContentMode(false);
  };

  return (
    <div className="lesson-section mb-2">
      <div className="flex items-center h-20">
        <button
          className="flex items-center text-purple-400"
          onClick={toggleExpand}
        >
          {isChildSection ? (
            <FontAwesomeIcon
              icon={isExpanded ? faChevronDown : faChevronRight}
              className="h-5 w-5"
            />
          ) : (
            <FontAwesomeIcon
              icon={isExpanded ? faFolderOpen : faFolderClosed}
              className="h-5 w-5"
            />
          )}
        </button>
        <div className="flex flex-row w-full justify-between">
          <h4 className="ml-2">{section.name}</h4>
          <div>
            <button
              onClick={() => handleAddSectionContent(section._id)}
              className="ml-3 btn bg-purple-300 p-2 rounded-md text-black"
            >
              Add Content
            </button>
            {isSubSectionEnabled && (
              <button
                onClick={() => handleAddSubSectionClick(section._id)}
                className="ml-3 btn bg-green-300 p-2 rounded-md text-black"
              >
                Add SubSection
              </button>
            )}
          </div>
        </div>
      </div>
      {isExpanded &&
        (addContentMode ? (
          <AddSectionContent
            onCancelClick={handleAddSectionCancelClick}
          ></AddSectionContent>
        ) : (
          section.sectionContent &&
          section.sectionContent.length > 0 &&
          section.sectionContent.map((content, index) => (
            <TreeLesonSectionContent key={index} content={content} />
          ))
        ))}
      {isExpanded &&
        section.childSections &&
        section.childSections.length > 0 &&
        section.childSections.map((childSection, index) => (
          <div className="ml-2 mt-2" key={index}>
            <TreeLessonSection
              section={childSection}
              isSubSectionEnabled={false}
              isChildSection={true}
            />
          </div>
        ))}
    </div>
  );
};

export default TreeLessonSection;
