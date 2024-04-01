import AvatarImageGallery from "../components/AvatarImageGallery";

import TeacherClassTypeCards from "../components/teacherPreregisterPage/TeacherClassTypeCards";

const TeacherPreProfilePage = () => {
  return (
    <div className="w-full h-auto bg-slate-100">
      <AvatarImageGallery />
      <TeacherClassTypeCards />
    </div>
  );
};

export default TeacherPreProfilePage;
