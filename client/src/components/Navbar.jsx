import React, { useState } from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.png";
import EDUME from "../assets/edume.png";
import { useUser } from "../context/UserProvider.jsx";
import avatars from "../assets/avatars/avatars.js";

const Navbar = () => {
  const { user, logoutUser } = useUser();
  // State to manage the toggle of the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-gray-200  p-2 fixed top-0  w-full z-50  ">
      <div className=" mx-auto flex justify-between items-center w-full">
        {/* Logo and Edume images */}
        <div className="flex space-x-4 justify-center  items-center ">
          <Link to="/" className="text-gray-800 font-bold text-lg">
            <img className="w-[5rem] h-[5rem]" src={LOGO} alt="Logo" />
          </Link>
          <Link to="/" className="   font-bold text-lg  ">
            <img
              className="w-[7rem] h-[3rem] hidden  lg:block xl:block 2xl:block"
              src={EDUME}
              alt="Edume"
            />
          </Link>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden lg:flex xl:flex 2xl:flex space-x-10 text-2xl text-gray-800">
          <Link to="/about">About</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/price">Price</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Profile Info */}
        <div className="hidden lg:flex space-x-4 justify-center  items-center">
          <Link to="/profile">
            <img
              src={avatars.find((img) => img.alt === user.avatar).src}
              alt="Profile"
              className="w-[4rem] h-[4rem] rounded-full"
            />
          </Link>
          <div className="flex flex-col text-gray-800 text-md">
            <div>
              {user.userName} {user.surname}
            </div>
            <div>Grade: {user.grade.name}</div>
          </div>
          <button
            onClick={handleLogout}
            className=" text-sm rounded-2xl  hover:bg-gray-100 bg-orange-400 w-auto justify-center items-center flex h-8 p-3  text-white text-right"
          >
            Sign out
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden px-2 py-1 rounded-lg lg:hidden"
        >
          <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            {isOpen ? (
              // Icon for X (close)
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              // Icon for Menu (bars)
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Items */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:hidden  justify-start items-start flex-col mt-2 space-y-2`}
      >
        <Link to="/about" className="block px-2 py-1 text-lg text-gray-800">
          About
        </Link>
        <Link to="/teacher" className="block px-2 py-1 text-lg text-gray-800">
          Teacher
        </Link>
        <Link to="/price" className="block px-2 py-1 text-lg text-gray-800">
          Price
        </Link>
        <Link to="/contact" className="block px-2 py-1 text-lg text-gray-800">
          Contact
        </Link>
        {/* Profile Info */}
        <div className="flex flex-col items-start">
          <Link to="/profile">
            <img
              src={avatars.find((img) => img.alt === user.avatar).src}
              alt="Profile"
              className="w-[4rem] h-[4rem] rounded-full"
            />
          </Link>
          <div className="text-gray-800 text-md">
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

// import { Link } from "react-router-dom";
// import LOGO from "../assets/logo.png";
// import { useUser } from "../context/UserProvider.jsx";
// import EDUME from "../assets/edume.png";
// import avatars from "../assets/avatars/avatars.js";

// const Navbar = () => {
//   const { user } = useUser();
//   return (
//     <nav className="bg-gray-200 p-2 ">
//       <div className="container mx-auto flex justify-between items-center w-full">
//         <div className="flex space-x-4 justify-center items-center">
//           <Link to="/" className="text-gray-800 font-bold text-lg">
//             <img className="w-[5rem] h-[5rem]" src={LOGO} alt="" />
//           </Link>
//           <Link to="/" className="text-gray-800 font-bold text-lg">
//             <img className="w-[7rem] h-[3rem]" src={EDUME} alt="" />
//           </Link>
//         </div>
//         <div className="space-x-10 text-2xl text-gray-800 ">
//           <Link to="/about">About</Link>
//           <Link to="/teacher">Teacher</Link>
//           <Link to="/price">Price</Link>
//           <Link to="/contact">Contact</Link>
//         </div>

//         <div className="flex  space-x-4 justify-center items-center ">
//           <Link to="/profile">
//             <div>
//               <img
//                 src={avatars.find((img) => img.alt === user.avatar).src}
//                 alt="Profile"
//                 className="w-[4rem] h-][4rem] rounded-full"
//               />
//             </div>
//           </Link>
//           <div className="flex flex-col text-gray-800 text-md">
//             <div>
//               {user.userName} {user.surname}
//             </div>
//             <div>Grade: {user.grade.name}</div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
