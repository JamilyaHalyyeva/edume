import { useParams } from "react-router-dom";

const LessonEdit = () => {
  const { lessonId } = useParams();
  return <div>LessonEdit</div>;
};

export default LessonEdit;
