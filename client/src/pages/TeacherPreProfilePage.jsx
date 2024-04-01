import AvatarImageGallery from "../components/AvatarImageGallery";
import TeacherClassTypeCards from "../components/TeacherPreregister/TeacherClassTypeCards";

const TeacherPreProfilePage = () => {
  const teacherClassTypeCardsComponents = [];

  for (let i = 0; i < 3; i++) {
    teacherClassTypeCardsComponents.push(<TeacherClassTypeCards key={i} />);
  }
  return (
    <div className="w-full h-full bg-slate-100">
      <AvatarImageGallery />
      {/* Render the array of TeacherClassTypeCards components */}
      {teacherClassTypeCardsComponents}
    </div>
  );
};

export default TeacherPreProfilePage;
