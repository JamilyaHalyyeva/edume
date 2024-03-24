import React from "react";
import {
  pages,
  useStudentDashboardContext,
} from "../context/StudentDashboardProvider";

const LessonOverview = (param) => {
  const { currentLesson, changePage } = useStudentDashboardContext();
  const handleClick = () => {
    changePage(pages.DASHBOARD);
  };
  const handleSectionClick = () => {
    changePage(pages.LESSON_SECTION_OVERVIEW);
  };
  return (
    <div>
      LessonOverview
      <div>{currentLesson.name}</div>
      <div>
        <button onClick={handleClick}>back </button>
      </div>
      <div>
        <div onClick={handleSectionClick}>Section1</div>

        <div>Section2</div>

        <div>Section3</div>
      </div>
    </div>
  );
};

export default LessonOverview;
