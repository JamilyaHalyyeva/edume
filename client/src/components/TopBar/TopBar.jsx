import { useUser } from "../../context/UserProvider.jsx";
import avatars from "../../assets/avatars/avatars.js";

import { useState } from "react";
import { useTeacherDashboard } from "../../context/TeacherDashboardProvider.jsx";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBar = () => {
  const { user } = useUser();
  const { toggleSidebar, isSidebarOpen } = useTeacherDashboard(); // Added to toggle the sidebar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Changed to false to start with the dropdown closed

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white border-gray-200  dark:bg-gray-900">
      <div className=" w-full mx-auto bg-gray-50 p-2 flex items-center justify-between">
        <div className="max-w-screen-3xl w-full flex flex-wrap items-center justify-between mx-auto p-2">
          <div></div>
          <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-xl bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-14 h-14 rounded-full"
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
            <div>
              {" "}
              <button
                onClick={toggleSidebar}
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                {isSidebarOpen ? (
                  <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
