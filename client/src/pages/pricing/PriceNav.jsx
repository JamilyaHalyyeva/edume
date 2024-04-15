import { useState } from "react";
import { Link } from "react-router-dom";
import EDUME from "../../assets/edume.png";
import LOGO from "../../assets/logo.png";

const SmallScreenNavbar = () => {
  return (
    <nav className="bg-gray-300  h-[15vh] w-[100vw] fixed top-[45px] left-0">
      <ul className=" block gap-10 space-y-4 px-4 pt-4">
        <li>
          <a href="/home" className="text-gray-800 hover:text-orange-600">
            Home
          </a>
        </li>
        <li>
          <a href="#tutors" className="text-gray-800 hover:text-orange-600">
            Tutors
          </a>
        </li>

        <li>
          <button className="btn bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full text-white px-4 py-2 mb-1 transition duration-500 ease-in-out text-xs">
            <Link to="/login">Login</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

const MainNavbar = () => {
  return (
    <nav className="hidden lg:flex">
      <ul className=" flex justify-between space-x-8 pt-8">
        <li>
          <a href="/home" className="text-gray-800 hover:text-orange-600">
            Home
          </a>
        </li>
        <li>
          <a href="#tutors" className="text-gray-800 hover:text-orange-600">
            Our Tutors
          </a>
        </li>

        <li>
          <button className="btn uppercase bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full text-white px-4 py-2 mb-1 transition duration-500 ease-in-out text-xs">
            <Link to="/login">Login</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const PriceNav = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <section className="head sticky top-0 z-50  h-18 md:h-32 lg:h-20 bg-gray-200">
        <div className=" max-w-5xl mx-auto flex justify-between items-center py-2">
          <div className="">
            <img src={LOGO} alt="" className="w-16 block  " />
          </div>
          <div className="flex justify-start">
            <img
              src={EDUME}
              alt=""
              className="w-28 hidden md:block object-contain"
            />
          </div>

          <MainNavbar />
          <button
            className={`toggle md:block bg-transparent text-orange-600 text-xl absolute right-10 top-4${
              click ? "block" : "hidden"
            } lg:hidden `}
            onClick={() => setClick(!click)}
          >
            {click ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>

          {click && <SmallScreenNavbar />}
        </div>
      </section>
    </>
  );
};
