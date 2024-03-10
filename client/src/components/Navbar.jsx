import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-lg">
          Your Logo
        </Link>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white">
            Profile
          </Link>
          <Link to="/settings" className="text-white">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
