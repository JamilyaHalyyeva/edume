import { useNavigate } from "react-router-dom";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider";

const LessonCard = (param) => {
  const navigate = useNavigate();
  const { setCurrentLesson } = useStudentDashboardContext();

  const handleClick = () => {
    navigate("/dashboard/lesson-overview");
    setCurrentLesson(param);
  };
  return (
    <div
      onClick={handleClick}
      className=" h-[9rem] w-[11rem]  md:h-[12rem] md:w-[14rem] lg:h-[13rem] lg:w-[14rem] xl:w-[15rem] lx:h[14rem] overflow-hidden justify-center items-center  shadow-xl hover:shadow-orange-500 hover:bg-orange-300  bg-gray-50  flex flex-col  rounded-2xl  "
    >
      <img
        className={`${param.bgColor} "  w-[3rem] sm:w-[3rem ] md:w-[3rem] lg:w-[4rem]  rounded-md "`}
        src={param.imageSrc}
      />
      <div className="px-6 py-4 flex-row flex ">
        <p className="text-gray-800  font-serif text-xl ">{param.name}</p>
      </div>
    </div>
  );
};

export default LessonCard;
