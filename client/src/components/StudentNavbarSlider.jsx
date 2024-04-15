import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const StudentNavbarSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className=" w-[22rem] md:w-[30rem]  rounded-2xl md:rounded-2xl lg:hidden overflow-hidden">
        <div
          className="flex  "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="  w-full lg:w-1/3">
              {item}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <div className="flex justify-between absolute top-[29%] w-[22rem] md:w-[30rem] -translate-y-1/2">
          <button onClick={goToPrevious} className=" p-2">
            <FontAwesomeIcon
              className="text-gray-800 xl:hidden 2xl:hidden lg:hidden"
              icon={faChevronLeft}
            />
          </button>
          <button onClick={goToNext} className=" p-2">
            <FontAwesomeIcon
              className="text-gray-800 xl:hidden 2xl:hidden lg:hidden"
              icon={faChevronRight}
            />
          </button>
        </div>
      )}
    </>
  );
};

export default StudentNavbarSlider;
