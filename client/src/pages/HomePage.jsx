import UserRolesDialog from "../components/UserRolesDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleButtonClick = () => {
    setOpenDialog(true);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to My Homepage
        </h1>
        <p className="text-lg text-gray-600">
          This is a simple homepage using React and Tailwind CSS.
        </p>
        <button
          onClick={handleButtonClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Dialog
        </button>
        <button
          onClick={handleLoginClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
      <UserRolesDialog isDialogOpen={openDialog} />
    </div>
  );
}

export default HomePage;
