import { useNavigate } from "react-router-dom";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider";
import Player from "./Player/Player";

const LessonSectionOverview = () => {
  const navigate = useNavigate();
  const { currentSection } = useStudentDashboardContext();
  const handleOnBackClick = () => {
    navigate("/dashboard/lesson-overview");
  };
  const handleOnNextClick = () => {
    console.log("Next Clicked");
  };

  return (
    <div className="mt-[10rem]">
      <div className="flex flex-col justify-center items-center p-5">
        {/* top back and next and title section  */}
        <div className="flex flex-row justify-between w-full">
          <button
            className="round bg-orange-400 p-2 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
            onClick={handleOnBackClick}
          >
            back{" "}
          </button>
          <div className="round bg-slate-100 w-full px-2 mx-3 flex flex-row justify-center items-center text-lg font-medium  ">
            <h1>{currentSection.name}</h1>
          </div>
          <button
            className="round bg-orange-400 p-2 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
            onClick={handleOnNextClick}
          >
            next
          </button>
        </div>
        {/* content section */}
        <div>
          <div className="flex flex-col justify-center items-center p-5">
            <div className="w-full h-96 rounded-2xl overflow-hidden">
              {/* we should have a player component here to show the content video  */}
              <Player url={currentSection.videoSrc} />
            </div>
          </div>
        </div>

        {/* bottom child sections  */}
        <div className="flex flex-col justify-center items-center p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSection.childSections.map((section, index) => (
              <div key={index}>
                <div className="flex justify-center">
                  <div className="w-[22rem] md:w-65 lg:w-96 h-auto bg-slate-100 flex flex-col justify-center items-center p-5 shadow-2xl rounded-2xl transition-all duration-300 ease-in-out hover:scale-105">
                    <div className="w-full h-64 rounded-2xl overflow-hidden">
                      <img
                        src={section.imageSrc}
                        alt="Lesson Section"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center text-lg font-semibold">
                      {section.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSectionOverview;
