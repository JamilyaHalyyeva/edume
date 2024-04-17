import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider.jsx";
import Player from "./Player/Player.jsx"; // Your existing Player component
// import PDFViewer from "./PDFViewer/PDFViewer.jsx"; // Assuming you have a PDF viewer component
import EXAMPLE from "../assets/content.jpg";

const LessonSectionOverview = () => {
  const navigate = useNavigate();
  const { currentSection } = useStudentDashboardContext();

  // Find content of type 'video' or 'pdf'
  const content = useMemo(
    () =>
      currentSection?.sectionContents?.find(
        (content) => content.type === "video" || content.type === "pdf"
      ),
    [currentSection]
  );

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
            onClick={() => navigate("/dashboard/lesson-overview")}
          >
            Back
          </button>
          <div className="text-2xl font-medium">
            <h1>{currentSection.name}</h1>
          </div>
          <button
            className="bg-orange-400 p-2 px-4 text-white font-bold rounded-3xl shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
            onClick={() => console.log("Next Clicked")}
          >
            Next
          </button>
        </div>
        {content && (
          <div className="w-full flex flex-row justify-center items-center p-5 gap-8">
            <div className="flex flex-col justify-center items-center p-5">
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
            <div key={index}>
              <div className="flex justify-center items-center">
                <div className="w-[25rem] md:w-65  h-[20rem] lg:w-96  bg-gray-100 flex flex-col justify-center items-center p-5 shadow-2xl rounded-2xl transition-all duration-300 ease-in-out hover:scale-105">
                  <img
                    src={section.imageSrc ?? EXAMPLE}
                    alt="Lesson Section"
                    className="w-full h-[13rem] border-2 object-cover rounded-2xl"
                  />
                  <div className="mt-4 text-lg font-semibold">
                    {section.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonSectionOverview;

////////////////////////////////////////////////
// import { useNavigate } from "react-router-dom";
// import { useStudentDashboardContext } from "../context/StudentDashboardProvider";
// import Player from "./Player/Player";
// import EXAMPLE from "../assets/example.jpg";
// const LessonSectionOverview = () => {
//   const navigate = useNavigate();
//   const { currentSection } = useStudentDashboardContext();

//   const videoContent = currentSection.sectionContents?.find(
//     (content) => content.type === "video"
//   );

//   const handleOnBackClick = () => {
//     navigate("/dashboard/lesson-overview");
//   };
//   const handleOnNextClick = () => {
//     console.log("Next Clicked");
//   };

//   console.log("currentSection", currentSection);
//   return (
//     <div className="mt-[6rem]">
//       <div className="flex flex-col justify-center items-center p-5">
//         {/* top back and next and title section  */}
//         <div className="flex flex-row justify-between w-full">
//           <button
//             className="round bg-orange-400 p-2 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
//             onClick={handleOnBackClick}
//           >
//             back{" "}
//           </button>
//           <div className="round bg-slate-100 w-full px-2 mx-3 flex flex-row justify-center items-center text-lg font-medium  ">
//             <h1>{currentSection.name}</h1>
//           </div>
//           <button
//             className="round bg-orange-400 p-2 px-4 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
//             onClick={handleOnNextClick}
//           >
//             next
//           </button>
//         </div>
//         {/* content section */}
//         <div className="w-full flex  flex-row justify-start">
//           <div className="flex flex-col justify-center items-center p-5">
//             <div className="w-full h-96 rounded-2xl overflow-hidden">
//               {/* we should have a player component here to show the content video  */}

//               <Player url={videoContent.url} />
//             </div>
//           </div>
//         </div>

//         {/* bottom child sections  */}
//         <div className="flex flex-col justify-center items-center p-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentSection.childSections.map((section, index) => (
//               <div key={index}>
//                 <div className="flex justify-center">
//                   <div className="w-[22rem] md:w-65 lg:w-96 h-auto bg-slate-100 flex flex-col justify-center items-center p-5 shadow-2xl rounded-2xl transition-all duration-300 ease-in-out hover:scale-105">
//                     <div className="w-full h-40 rounded-2xl overflow-hidden">
//                       <img
//                         src={section.imageSrc ?? EXAMPLE}
//                         alt="Lesson Section"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="mt-3 text-center text-lg font-semibold">
//                       {section.name}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LessonSectionOverview;
