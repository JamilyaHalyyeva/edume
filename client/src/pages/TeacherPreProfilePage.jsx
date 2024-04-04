import { useNavigate } from "react-router-dom";
import AvatarImageGallery from "../components/AvatarImageGallery";
import TeacherClassTypeCards from "../components/TeacherPreregister/TeacherClassTypeCards";
import { useRegister } from "../context/RegisterProvider";

const TeacherPreProfilePage = () => {
  const navigate = useNavigate();

  const { registerUser } = useRegister();

  return (
    <div className="h-full">
      <div className="bg-slate-100  flex flex-col items-center justify-center 2xl:p-10">
        <div className="flex justify-start pt-10 pb-2 pl-20 pr-20 mr-40">
          <button onClick={() => navigate("/register")} className="...">
            Back
          </button>
        </div>
        <AvatarImageGallery />
        <div className="w-full flex justify-center items-center">
          <h2 className="text-2xl font-bold m-[2rem]">
            Select Classes and Grades or Create Your Own.
          </h2>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-5 ">
          {[...Array(3).keys()].map((i) => (
            <TeacherClassTypeCards key={i} name={`teacherClassTypeCard_${i}`} />
          ))}
        </div>

        <div className="flex justify-end pt-10 pb-2 pl-20 pr-20 mr-10">
          <button onClick={registerUser} className="...">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherPreProfilePage;
