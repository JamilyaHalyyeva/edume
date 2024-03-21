import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";
import PROFILE from "../assets/images/animal1.png"; // Replace with actual profile image

const Navbar = () => {
  return (
    <nav className="bg-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-800 font-bold text-lg">
          <img className="w-[4rem] h-[4rem]" src={LOGO} alt="" />
        </Link>
        <div className="space-x-10 text-xl text-gray-800 ">
          <Link to="/about">About</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/price">Price</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="flex  space-x-4 justify-center items-center ">
          <Link to="/profile">
            <div>
              <img
                src={PROFILE}
                alt="Profile"
                className="w-[4rem] h-][4rem] rounded-full"
              />
            </div>
          </Link>
          <div className="flex flex-col text-gray-800 text-md">
            <div>John Doe</div> {/* Profile Name */}
            <div>Grade: 10</div> {/* Profile Grade */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
