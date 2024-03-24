const SideBarLink = ({ title, icon, notification }) => {
  return (
    <li>
      <a
        href="#"
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ml-3">{title}</span>
        {notification && (
          <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {notification}
          </span>
        )}
      </a>
    </li>
  );
};

export default SideBarLink;
