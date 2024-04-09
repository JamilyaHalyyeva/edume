import { useNavigate } from "react-router-dom";

const LessonSectionOverview = () => {
  const navigate = useNavigate();
  const handleOnBackClick = () => {
    navigate("/dashboard/lesson-overview");
  };
  return (
    <div className="mt-[10rem]">
      LessonSectionOverview
      <div>
        <button onClick={handleOnBackClick}>back </button>
      </div>
    </div>
  );
};

export default LessonSectionOverview;
