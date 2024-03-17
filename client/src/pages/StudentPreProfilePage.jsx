import { useNavigate } from "react-router-dom";
import AvatarImageGallery from "../components/AvatarImageGallery";
import ClassCards from "../components/ClassCards";
import { useRegister } from "../context/RegisterProvider";

const StudentPreProfilePage = () => {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  return (
    <div className="bg-gray-100">
      <div className="flex justify-start   pt-0 pb-2 pl-20 pr-20 mr-40 ">
        <button
          onClick={() => navigate("/register")}
          className="group relative w-[10rem] flex justify-center py-2 px-4  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Back
        </button>
      </div>
      <AvatarImageGallery />
      <ClassCards />
      <div className="flex justify-end  pt-0 pb-2 pl-20 pr-20 mr-40 ">
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
export default StudentPreProfilePage;
