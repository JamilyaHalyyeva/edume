import { useState } from "react";
import { Link } from "react-router-dom";

const SideBarLink = ({
  title,
  icon,
  notification,
  isCompact,
  to,
  item,
  hoverColor,
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  console.log("item", item);
  return (
    <li
      className={`flex flex-col items-start justify-start text-gray-900 rounded-lg  group ${
        isCompact === false ? "border-2 border-solid" : "border-none"
      }`}
    >
      <div
        className={`${
          hoverColor ? hoverColor : "hover:bg-gray-300 "
        } w-full rounded-lg`}
      >
        <Link
          className={`hover:bg-orange-300`}
          onClick={() => {
            item && item.children !== undefined && toggleSubMenu();
          }}
          to={to}
          className="flex items-center justify-start py-2"
        >
          <div
            className={`w-12 h-12 flex justify-center items-center text-2xl text-gray-500  ${
              isCompact ? "border-2" : ""
            }`}
          >
            {icon}
          </div>

          {isCompact === false && (
            <>
              <span className="ml-3">{title}</span>
              <span
                className={`ml-2 sidebar-text ${
                  isCompact ? "opacity-0" : "opacity-100"
                }`}
              >
                {notification}
              </span>
            </>
          )}
        </Link>
      </div>

      {item.children !== undefined && isSubMenuOpen && !isCompact && (
        <ul className="pl-4 space-y-1 w-11/12 mb-5">
          {item.children.map((child) => (
            <SideBarLink
              hoverColor="hover:bg-orange-300"
              key={child.id}
              title={child.name}
              isCompact={isCompact}
              to={child.link}
              item={child}
              icon={child.icon}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideBarLink;
