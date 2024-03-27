import React from "react";
import {
  pages,
  useStudentDashboardContext,
} from "../context/StudentDashboardProvider";

const LessonSectionOverview = () => {
  const { changePage } = useStudentDashboardContext();
  const handleOnBackClick = () => {
    changePage(pages.LESSON_OVERVIEW);
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
