import {
  pages,
  useStudentDashboardContext,
} from "../context/StudentDashboardProvider";

const LessonCard = (param) => {
  const { changePage, setCurrentLesson } = useStudentDashboardContext();
  const handleClick = () => {
    changePage(pages.LESSON_OVERVIEW);
    setCurrentLesson(param);
  };
  return (
    <div
      onClick={handleClick}
      className="h-[13rem] w-[15rem]  overflow-hidden justify-center items-center  shadow-xl hover:shadow-orange-500 hover:bg-orange-300  bg-gray-50  flex flex-col  rounded-2xl  "
    >
      <img
        className={`${param.bgColor} " w-[4rem]  rounded-md "`}
        src={param.imageSrc}
      />
      <div className="px-6 py-4 flex-row flex ">
        <p className="text-gray-800  font-serif text-xl ">{param.name}</p>
      </div>
    </div>
  );
};

export default LessonCard;
