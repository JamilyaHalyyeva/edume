import { useUser } from "../../context/UserProvider.jsx";
import avatars from "../../assets/avatars/avatars.js";
import LOGO from "../../assets/logo.png";
import { useState } from "react";
import { useTeacherDashboard } from "../../context/TeacherDashboardProvider.jsx";

const TopBar = () => {
  const { user } = useUser();
  const { toggleSidebar } = useTeacherDashboard();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Changed to false to start with the dropdown closed

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white border-gray-200  dark:bg-gray-900">
      <div className=" w-full mx-auto bg-gray-50 p-4 flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-2">
          <div>
            <a
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={LOGO} className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EduMe
              </span>
            </a>
          </div>

          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={avatars.find((avatar) => avatar.alt === user.avatar).src}
                alt="User"
              />
            </button>

            <div
              className={`absolute top-full right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg dark:bg-gray-700 z-50 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.userName + " " + user.surname}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
