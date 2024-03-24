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
  const sections = currentLesson?.sections || Array(6).fill();
  return (
    <div className="flex justify-center items-center">
      <div className="w-11/12  flex justify-center items-center   flex-col ">
        <div className="flex justify-start  items-center  w-full h-[10rem] gap-3">
          <div className="h-[8rem] w-[8rem] ml-20  overflow-hidden justify-center rounded-xl   items-center  shadow-xl bg-gray-100  flex flex-col ">
            <img src={currentLesson.img} alt="" />
          </div>
          <div>{currentLesson.name} Class</div>

          <div>
            <button onClick={handleClick}>back </button>
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
    </div>
  );
};

export default LessonOverview;
