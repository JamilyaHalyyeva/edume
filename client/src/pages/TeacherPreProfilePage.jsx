import { useNavigate } from "react-router-dom";
import AvatarImageGallery from "../components/AvatarImageGallery";
import TeacherClassTypeCards from "../components/TeacherPreregister/TeacherClassTypeCards";
import { useRegister } from "../context/RegisterProvider";

const TeacherPreProfilePage = () => {
  const navigate = useNavigate();

  const { registerUser } = useRegister();

  return (
    <div className="bg-slate-100  flex flex-col items-center justify-center 2xl:p-10">
      <div className="flex w-4/5  justify-center md:justify-start  items-start mb-5 mt-10 ">
        <button
          onClick={() => navigate("/register")}
          className="group relative w-[10rem] flex justify-center py-2 px-4  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Back
        </button>
      </div>
      <AvatarImageGallery />
      <div className="w-full flex justify-center items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold m-[2rem]">
          Select Classes and Grades to Create Content.
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5 ">
        {[...Array(3).keys()].map((i) => (
          <TeacherClassTypeCards key={i} name={`teacherClassTypeCard_${i}`} />
        ))}
      </div>

      <div className="flex w-full md:justify-end  lg:justify-end md:mt-10 lg:mt-10 justify-center  lg:mr-20 mt-5 mb-20 ">
        <button
          onClick={() => registerUser()}
          className="group relative w-[10rem] flex justify-center py-2 px-4  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default TeacherPreProfilePage;
