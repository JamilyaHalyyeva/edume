import { useNavigate } from "react-router-dom";
import AvatarImageGallery from "../components/AvatarImageGallery";
import TeacherClassTypeCards from "../components/TeacherPreregister/TeacherClassTypeCards";
import { useRegister } from "../context/RegisterProvider";

const TeacherPreProfilePage = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();

  const teacherClassTypeCardsComponents = [];
  for (let i = 0; i < 3; i++) {
    teacherClassTypeCardsComponents.push(<TeacherClassTypeCards key={i} />);
  }

  return (
    <div className=" bg-slate-100  w-full h-full flex flex-col item-center justify-center 2xl:p-10  ">
      <div className="flex justify-start   pt-10 pb-2 pl-20 pr-20 mr-40 ">
        <button
          onClick={() => navigate("/register")}
          className="group relative w-[10rem] flex justify-center py-2 px-4  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Back
        </button>
      </div>
      <AvatarImageGallery />
      {/* Render the array of TeacherClassTypeCards components */}
      <div className=" w-full flex justify-center items-center">
        <h2 className="text-2xl font-bold m-[2rem]">
          Select Classes and Grades or Create Your Own.{" "}
        </h2>
      </div>
      {teacherClassTypeCardsComponents}
      <div className="flex justify-end  pt-10 pb-2 pl-20 pr-20 mr-10 ">
        <button
          onClick={() => registerUser()}
          className="group relative w-[10rem] flex justify-center py-2 px-4 mb-20  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default TeacherPreProfilePage;
