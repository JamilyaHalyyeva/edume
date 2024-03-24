import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";
import { useUser } from "../context/UserProvider.jsx";
import EDUME from "../assets/edume.png";
import avatars from "../assets/avatars/avatars.js";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="bg-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 justify-center items-center">
          <Link to="/" className="text-gray-800 font-bold text-lg">
            <img className="w-[5rem] h-[5rem]" src={LOGO} alt="" />
          </Link>
          <Link to="/" className="text-gray-800 font-bold text-lg">
            <img className="w-[7rem] h-[3rem]" src={EDUME} alt="" />
          </Link>
        </div>
        <div className="space-x-10 text-2xl text-gray-800 ">
          <Link to="/about">About</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/price">Price</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="flex  space-x-4 justify-center items-center ">
          <Link to="/profile">
            <div>
              <img
                src={avatars.find((img) => img.alt === user.avatar).src}
                alt="Profile"
                className="w-[4rem] h-][4rem] rounded-full"
              />
            </div>
          </Link>
          <div className="flex flex-col text-gray-800 text-md">
            <div>
              {user.userName} {user.surname}
            </div>
            <div>Grade: {user.grade.name}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
