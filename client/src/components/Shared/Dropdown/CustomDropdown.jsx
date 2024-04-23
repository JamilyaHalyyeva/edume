import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useTeacherClassGrade } from "../../../context/TeacherClassGradeProvider.jsx";
import { useRegister } from "../../../context/RegisterProvider.jsx";

const CustomDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { getFilteredOptions, handleClassTypeComboSelect } =
    useTeacherClassGrade();
  const dropdownRef = useRef(null);
  const { removeAllGradesWithClassType } = useRegister();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (option) => {
    let myOption = {};
    if (option === "") {
      myOption = { currentSelection: null };
      myOption.previousSelection = selectedOption;
      setSelectedOption(null);
    } else {
      myOption.currentSelection = { ...option };
      myOption.previousSelection = selectedOption;
      setSelectedOption(myOption.currentSelection);
    }
    if (myOption.previousSelection) {
      removeAllGradesWithClassType(myOption.previousSelection);
    }
    handleClassTypeComboSelect(myOption);
    onSelect(myOption.currentSelection);
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-[200px]" ref={dropdownRef}>
      {" "}
      {/* Set a minimum width here */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-50 w-full  text-lg border border-gray-300 text-gray-900  rounded-lg p-3 flex justify-between items-center"
      >
        {selectedOption ? (
          <>
            {/* Ensure you're using the correct image property */}
            <img
              src={selectedOption.imageSrc}
              alt={selectedOption.name}
              className={`w-6 h-6 ${selectedOption.bgColor}`}
            />
            {selectedOption.name}
          </>
        ) : (
          "Select an option"
        )}
        <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-auto rounded-lg">
          <li
            className="flex items-center p-2  hover:bg-gray-100 cursor-pointer"
            onClick={() => handleItemClick("")}
          >
            Remove Selection
          </li>
          {getFilteredOptions().map((option) => (
            <li
              key={option._id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(option)}
            >
              <img
                src={option.imageSrc} // Ensure this matches the selected option's image property
                alt={option.name}
                className={`w-6 h-6 mr-2 ${option.bgColor}`}
              />
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
