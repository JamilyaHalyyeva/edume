import React from "react";
import TreeLesonSectionContent from "./TreeLessonSectionContent.jsx";

const TreeLessonSection = ({ section }) => {
  return (
    <div className="lesson-section">
      <div className="pipe ">|</div>
      <h4>{section.name}</h4>
      <ul className="section-content">
        {section.sectionContents.map((content, index) => (
          <TreeLesonSectionContent key={index} content={content} />
        ))}
      </ul>
      <div className="pipe ml-3">|</div>
      <button className="ml-3 btn bg-green-300 p-2 rounded-md text-black">
        Add SubSection
      </button>
    </div>
  );
};
export default TreeLessonSection;
