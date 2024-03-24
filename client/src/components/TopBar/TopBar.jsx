import { useUser } from "../../context/UserProvider.jsx";
import avatars from "../../assets/avatars/avatars.js";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import { useState } from "react";

const TopBar = () => {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-200 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-gray-800 font-bold text-lg">
          <img className="w-[4rem] h-[4rem]" src={LOGO} alt="" />
        </Link>
        <div className="space-x-10 text-xl text-gray-800 "></div>

        <div className="flex  space-x-4 justify-center items-center ">
          <div onClick={toggleDropdown}>
            <img
              src={avatars.find((img) => img.alt === user.avatar).src}
              alt="Profile"
              className="w-[4rem] h-][4rem] rounded-full"
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu flex flex-col bg-white py-2 rounded shadow-lg absolute mt-2">
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          <div className="flex flex-col text-gray-800 text-md">
            <div>{user.userName}</div> {/* Profile Name */}
            <div>{user.grade}</div> {/* Profile Grade */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
