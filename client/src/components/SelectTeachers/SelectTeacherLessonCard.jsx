import { useEffect } from "react";
import { useTeacherSelection } from "../../context/TeacherSelectionProvider";

const SelectTeacherLessonCard = (param) => {
  const {
    selectedClassType,
    setSelectedClassType,
    isThereATeacherForTheClassType,
  } = useTeacherSelection();
  const handleClick = () => {
    setSelectedClassType(param);
  };
  useEffect(() => {}, [selectedClassType]);

  return (
    <div
      onClick={handleClick}
      className={` ${
        selectedClassType && selectedClassType.name === param.name
          ? "border-orange-500  shadow-orange-300 bg-orange-300 "
          : isThereATeacherForTheClassType(param._id)
          ? "bg-green-300 shadow-green-500 border-green-500"
          : selectedClassType && selectedClassType.name === param.name
          ? "border-orange-500  shadow-orange-300 bg-orange-300 "
          : "bg-gray-50"
      } h-[3rem] w-[5rem]  md:h-[6rem] md:w-[7rem] lg:h-[7rem] lg:w-[8rem] xl:w-[9rem] lx:h[7rem] overflow-hidden justify-center items-center  shadow-xl hover:shadow-orange-500 hover:bg-orange-300    flex flex-col  rounded-2xl  `}
    >
      <img
        className={`${param.bgColor} "w-[2rem] sm:w-[2rem ] md:w-[2rem] lg:w-[3rem]  rounded-md "`}
        src={param.imageSrc}
      />
      <div className=" flex-row flex ">
        <p className="text-gray-800  font-serif text-lg ">{param.name}</p>
      </div>
    </div>
  );
};

export default SelectTeacherLessonCard;
