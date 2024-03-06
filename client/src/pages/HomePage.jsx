import { useNavigate } from "react-router-dom";
import UserRolesDialog from "../components/UserRolesDialog";
import { useDialog } from "../context/DialogProvider";

function HomePage() {
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    openDialog(
      "This is a sample dialog description.",
      () => {
        // Student Selected button clicked
        localStorage.setItem("role", "student");
        navigate("/register");
        console.log("Student Selected !");
      },
      () => {
        // Teacher Selected button clicked
        localStorage.setItem("role", "teacher");
        navigate("/register");
        console.log("Canceled!");
      }
    );
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
      </div>
      <UserRolesDialog />
    </div>
  );
}

export default HomePage;
