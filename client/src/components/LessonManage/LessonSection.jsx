import { useEffect, useState } from "react";
import { useLessonManagement } from "../../context/LessonManagementProvider.jsx";

const LessonSection = (props) => {
  const {
    isNewSection,
    currentSection,
    setCurrentSection,
    saveNewSection,
    cancelNewSection,
  } = useLessonManagement();

  const nameOnChangeHandler = (e) => {
    setCurrentSection({ ...currentSection, name: e.target.value });
  };

  const onSectionInfoSaveClickHandler = () => {
    saveNewSection();
    // save the section info
  };
  const onSectionInfoCancelClickHandler = () => {
    cancelNewSection();
    // cancel the section info
  };
  return (
    <div className="flex flex-col justify-start">
      <h1 className="w-full">
        {isNewSection === true ? "New " : ""}Section info:
      </h1>
      <div>
        {currentSection ? (
          <div className="flex flex-col">
            <div className="flex">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                value={currentSection.name}
                onChange={nameOnChangeHandler}
                className="ml-2"
              />
            </div>
            <div className="flex flex-row justify-end">
              <button
                onClick={onSectionInfoCancelClickHandler}
                className="btn bg-red-300 p-2 mr-2 rounded-md text-black"
              >
                Cancel
              </button>
              <button
                onClick={onSectionInfoSaveClickHandler}
                className="btn bg-purple-300 p-2 rounded-md text-black"
              >
                Save
              </button>
            </div>
            <ul>
              {currentSection.sectionContents &&
                currentSection.sectionContents.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
            </ul>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default LessonSection;
