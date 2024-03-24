import {
  pages,
  useStudentDashboardContext,
} from "../context/StudentDashboardProvider";
import LessonOverviewCard from "./LessonOverviewCard";

const LessonOverview = () => {
  const { currentLesson, changePage } = useStudentDashboardContext();
  const handleClick = () => {
    changePage(pages.DASHBOARD);
  };
  const handleSectionClick = () => {
    changePage(pages.LESSON_SECTION_OVERVIEW);
  };
  const sections = currentLesson?.sections || Array(3).fill();
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-full flex justify-center items-center   flex-col ">
        <div className="flex justify-start  items-center  w-full  bg-orange-400 h-[8rem] gap-3">
          <div
            className={`${currentLesson.bgColor} h-[6rem] w-[8rem] ml-40 overflow-hidden justify-center rounded-xl   items-center  shadow-xl bg-gray-100  flex flex-col `}
          >
            <img src={currentLesson.imageSrc} className="w-[6rem]" />
          </div>
          <div className="text-3xl font-serif">{currentLesson.name} Class</div>
        </div>
        <div className="justify-start  items-start  mt-5 font-serif flex w-full ">
          <div className=" justify-start items-center  ml-[10rem]">
            <h1 className="text-2xl font-serif mt-4">
              Click on a Lesson Section & Lets Learn Lesson Content !{" "}
            </h1>
          </div>
        </div>

        <div className="mb-10 justify-center items-center flex flex-col p-10 gap-10">
          <div className="grid grid-cols-3  gap-10">
            {sections.map((section, index) => (
              <div key={index} onClick={handleSectionClick}>
                <LessonOverviewCard />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-8/12  mb-10 justify-between flex-row items-center">
        <div>
          <button
            className=" rounded-3xl bg-orange-400 w-[9rem] h-[3rem]  shadow-2xl  hover:shadow-orange-600"
            onClick={handleClick}
          >
            back{" "}
          </button>
        </div>
        <div>
          <button
            className=" rounded-3xl bg-orange-400 w-[9rem] h-[3rem]  mr-9 shadow-2xl  hover:shadow-orange-600"
            onClick={handleSectionClick}
          >
            Next{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonOverview;
