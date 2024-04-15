import { useParams } from "react-router-dom";

const LessonEdit = () => {
  const { lessonId } = useParams();
  console.log("lessonId", lessonId);
  return <div>LessonEdit</div>;
};

export default LessonEdit;
