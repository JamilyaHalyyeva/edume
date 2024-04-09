import { useTeacherSelection } from "../../context/TeacherSelectionProvider";

const SelectTeacherLessonCard = (param) => {
  const { setSelectedLesson } = useTeacherSelection();
  const handleClick = () => {
    setSelectedLesson(param);
  };
  return (
    <div
      onClick={handleClick}
      className=" h-[3rem] w-[5rem]  md:h-[6rem] md:w-[7rem] lg:h-[7rem] lg:w-[8rem] xl:w-[9rem] lx:h[7rem] overflow-hidden justify-center items-center  shadow-xl hover:shadow-orange-500 hover:bg-orange-300  bg-gray-50  flex flex-col  rounded-2xl  "
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
