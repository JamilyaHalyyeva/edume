import SelectTeacherLessonCard from "./SelectTeacherLessonCard.jsx";
import { useTeacherSelection } from "../../context/TeacherSelectionProvider.jsx";

const SelectTeacherLesson = () => {
  const { classTypeList } = useTeacherSelection();
  return (
    <div>
      <div className="justify-center items-center gap-6 2xl:gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-7 2xl:grid-cols-10 xl:gap-1 mb-3]">
        {classTypeList.map((lesson) => (
          <SelectTeacherLessonCard
            key={lesson.id}
            _id={lesson._id}
            name={lesson.name}
            imageSrc={lesson.imageSrc}
            bgColor={lesson.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectTeacherLesson;
