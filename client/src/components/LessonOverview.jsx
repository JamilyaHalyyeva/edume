import { useNavigate } from "react-router-dom";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider";
import LessonOverviewCard from "./LessonOverviewCard";

const LessonOverview = () => {
  const navigate = useNavigate();
  const { currentLesson } = useStudentDashboardContext();
  const handleClick = () => {
    navigate("/dashboard");
  };
  const handleSectionClick = () => {
    navigate("/dashboard/lesson-overview/lesson-section-overview");
  };
  const sections = currentLesson?.sections || Array(3).fill();
  return (
    <div className="flex justify-center items-center flex-col  ">
      <div className="w-full flex justify-center items-center   flex-col ">
        <div className="flex flex-row  justify-start  items-center  w-full mt-[5rem]   bg-orange-400 h-[8rem] py-4 px-8 gap-4">
          <div
            className={`${currentLesson.bgColor} h-[5rem] w-[6rem] lg:h-[6rem] lg:w-[8rem] ml-8 lg:ml-20 mt-4   overflow-hidden justify-center  rounded-xl   items-center  shadow-xl bg-gray-100  flex flex-col `}
          >
            <img
              src={currentLesson.imageSrc}
              className="w-[4rem]   lg:w-[5rem] xl:w-[5rem] 2xl:w-[5rem]"
            />
          </div>
          <div className="text-2xl sm:text-3xl font-serif text-center sm:text-left">
            {currentLesson.name} Class
          </div>
        </div>
        <div className="justify-start  items-start  mt-5 font-serif flex w-full ">
          <div className=" justify-start items-center  ml-[10rem]">
            <h1 className="text-2xl font-serif mt-4 px-4">
              Click on a Lesson Section & Lets Learn Lesson Content !{" "}
            </h1>
          </div>
        </div>

        <div className="mb-10 justify-center items-center flex flex-col p-6 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <div key={index} onClick={handleSectionClick}>
                <LessonOverviewCard />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full sm:w-10/12 lg:w-8/12 mb-10 justify-around items-center flex-wrap">
        <div>
          <button
            className="rounded-3xl bg-orange-400 px-6 py-2 shadow-xl hover:shadow-orange-500 transition-all duration-300 ease-in-out"
            onClick={handleClick}
          >
            back{" "}
          </button>
        </div>
        {/* <div>
          <button
            className="rounded-3xl bg-orange-400 px-6 py-2 shadow-xl hover:shadow-orange-500 transition-all duration-300 ease-in-out"
            onClick={handleSectionClick}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default LessonOverview;
