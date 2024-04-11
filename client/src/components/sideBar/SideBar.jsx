import SideBarLink from "./SideBarLink.jsx";
import "./SideBar.css";
import LOGO from "../../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListSquares,
  faUsers,
  faGauge,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useTeacherDashboard } from "../../context/TeacherDashboardProvider.jsx";

const SideBar = () => {
  const { isSidebarOpen, isCompact, toggleCompactMode } = useTeacherDashboard();

  const sideBarElements = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FontAwesomeIcon icon={faGauge} />,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Lessons",
      icon: <FontAwesomeIcon icon={faListSquares} />,
      link: "/dashboard/lessons",
    },
    {
      id: 3,
      name: "Students",
      icon: <FontAwesomeIcon icon={faUsers} />,
      link: "/dashboard/students",
    },
  ];

  return (
    <div>
      {/* <div className=" w-full mx-auto bg-gray-50 flex items-center justify-between"> */}

      {/* </div> */}
      <aside
        className={`fixed top-0 left-0 z-40 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          isCompact ? "w-18" : "w-64"
        } h-screen bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full  overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="px-1 py-4">
            <a href="#" className="flex items-center space-x-3">
              <img src={LOGO} className="h-14 w-14" alt="Logo" />
              {!isCompact && (
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  EduMe
                </span>
              )}
            </a>
          </div>
          <ul className="space-y-2 px-2">
            {sideBarElements.map((element) => (
              <SideBarLink
                key={element.id}
                title={!isCompact ? element.name : ""}
                icon={element.icon}
                isCompact={isCompact}
                to={element.link}
              />
            ))}
          </ul>

          <button
            onClick={toggleCompactMode}
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="absolute bottom-0 -right-4 w-8 h-8 flex items-center justify-center text-sm text-gray-800 mb-4 rounded-full bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:right-0 md:-mr-4"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`transition-transform duration-500   ${
                isCompact ? "" : "rotate-180"
              }`}
              style={{
                animation: `${
                  isCompact ? "rotateChevronClose" : "rotateChevronOpen"
                } 0.5s forwards`,
              }}
            ></FontAwesomeIcon>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
