import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRolesDialog = (params) => {
  const navigate = useNavigate();
  console.log("isDialogOpen", params.isDialogOpen);
  const [isOpen, setIsOpen] = useState(params.isDialogOpen);
  const handleStudentClick = () => {
    setIsOpen(false);
    localStorage.setItem("role", "student");
    navigate("/register");
  };

  const handleTeacherClick = () => {
    setIsOpen(false);
    localStorage.setItem("role", "teacher");
    navigate("/register");
  };

  useEffect(() => {
    setIsOpen(params.isDialogOpen);
  }, [params.isDialogOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <p className="text-lg font-bold mb-4">
                Lorem ipsum Dolor sit amet
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleStudentClick}
                  className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Student
                </button>
                <button
                  onClick={handleTeacherClick}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserRolesDialog;
