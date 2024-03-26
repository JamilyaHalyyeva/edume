const SideBarLink = ({ title, icon, notification, isCompact }) => {
  return (
    <li>
      <a
        href="#"
        className="flex items-center justify-start py-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
      >
        <div
          className={`w-12 h-12 flex justify-center items-center text-2xl text-gray-500  ${
            isCompact ? "border-2" : ""
          }`}
        >
          {icon}
        </div>

        <span className="ml-3">{title}</span>
        {notification && (
          <span
            className={`ml-2 sidebar-text ${
              isCompact ? "opacity-0" : "opacity-100"
            }`}
          >
            {notification}
          </span>
        )}
      </a>
    </li>
  );
};

export default SideBarLink;
