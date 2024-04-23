import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider.jsx";
import Player from "./Player/Player.jsx"; // Your existing Player component
// import PDFViewer from "./PDFViewer/PDFViewer.jsx"; // Assuming you have a PDF viewer component
import EXAMPLE from "../assets/content.jpg";
import LessonOverviewCard from "./LessonOverviewCard.jsx";

const LessonSectionOverview = () => {
  const navigate = useNavigate();
  const { currentSection, navigateToNextSection, navigateToPreviousSection } =
    useStudentDashboardContext();

  // Find content of type 'video' or 'pdf'
  const content = useMemo(
    () =>
      currentSection?.sectionContents?.find(
        (content) => content.type === "video" || content.type === "pdf"
      ),
    [currentSection]
  );

  const handleOnNextClick = () => {
    console.log("Next Clicked");
    navigateToNextSection();
  };
  const handleClick = () => {
    navigate("/dashboard/lesson-overview");
  };

  const handleOnBackClick = () => {
    navigateToPreviousSection();
  };
  // Determine the component to use based on the content type
  const ContentComponent = content?.type === "video" ? Player : null;

  // Early return if currentSection is not yet loaded
  if (!currentSection) {
    return <div>Loading or no current section available...</div>;
  }

  return (
    <div className="mt-[6rem]">
      <div className="flex flex-col justify-center items-center p-5">
        <div className="flex flex-row justify-between w-full bg-gray-200 rounded-3xl  p-2">
          <button
            className="bg-orange-400 p-2 px-4 text-white font-bold rounded-3xl shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
            onClick={handleOnBackClick}
          >
            Back
          </button>
          <div className="text-2xl font-medium">
            <h1>{currentSection.name}</h1>
          </div>
          <button
            className="bg-orange-400 p-2 px-4 text-white font-bold rounded-3xl shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
            onClick={handleOnNextClick}
          >
            Next
          </button>
        </div>
        {content && (
          <div className="w-full flex flex-col xl:flex-row lg:flex-row   justify-center items-center p-5 gap-8">
            <div className="flex flex-row justify-center items-center p-5">
              <div className="w-full shadow-xl border-2 h-96 rounded-2xl overflow-hidden">
                {/* we should have a player component here to show the content video  */}

                <ContentComponent url={content.url} />
              </div>
            </div>
            <div className=" p-4 border  w-[30rem] rounded-xl shadow-lg h-[rem]">
              <table className="min-w-full table-fixed ">
                <tbody className=" flex flex-col  gap-10">
                  <tr className="flex  justify-between items-center">
                    <td className="text-left   text-green-500 text-sm font-bold">
                      Title:
                    </td>
                    <td className="text-right text-xl font-bold">
                      {content.title}
                    </td>
                  </tr>
                  <tr className="flex  justify-between items-center">
                    <td className="text-left text-green-500  text-sm font-bold">
                      Description:
                    </td>
                    <td className="text-right text-md">
                      {content.description}
                    </td>
                  </tr>
                  <tr className="flex  justify-between items-center">
                    <td className="text-left text-green-500 text-sm font-bold">
                      Order Number:
                    </td>
                    <td className="text-right text-md">{content.order}</td>
                  </tr>
                  <button
                    className="bg-orange-400 mb-3 p-2 px-4 text-white font-bold rounded-2xl shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
                    onClick={() => console.log("Download Clicked")}
                  >
                    Download
                  </button>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSection.childSections.map((section, index) => (
            <LessonOverviewCard key={index} section={section} />
          ))}
        </div>
        <div className="flex w-full sm:w-10/12  mt-10 lg:w-8/12 mb-10 justify-around items-center flex-wrap">
          <div>
            <button
              className="rounded-3xl bg-orange-400 px-6 py-2 shadow-xl hover:shadow-orange-500 transition-all duration-300 ease-in-out"
              onClick={handleClick}
            >
              Back to Lesson Content List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonSectionOverview;
