import { useNavigate } from "react-router-dom";
import EXAMPLE from "../assets/example.jpg";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider";

const LessonOverviewCard = (props) => {
  const navigate = useNavigate();
  const { setCurrentSection } = useStudentDashboardContext();
  const handleClick = () => {
    setCurrentSection(props.section);
    navigate("/dashboard/lesson-overview/lesson-section-overview");
  };
  return (
    <div className="flex justify-center" onClick={handleClick}>
      <div className="w-[22rem] md:w-65 lg:w-96 h-auto bg-slate-100 flex flex-col justify-center items-center p-5 shadow-2xl rounded-2xl transition-all duration-300 ease-in-out hover:scale-105">
        <div className="w-full h-64 rounded-2xl overflow-hidden">
          <img
            src={EXAMPLE}
            alt="Lesson Section"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3 text-center text-lg font-semibold">
          {props.section ? props.section.name : "Section Name"}
        </div>
      </div>
    </div>
  );
};

export default LessonOverviewCard;
