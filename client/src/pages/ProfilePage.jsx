// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useUser } from "../context/UserProvider";

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveChanges = () => {
    updateUser(editedUser);
    setIsEditing(false);
  };

  if (!user) {
    // Redirect or handle case when the user is not logged in
    return <div>User not logged in</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>

      <div className="mb-4">
        <strong>Username:</strong>
        {user.username}
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        ) : (
          user.username
        )}
      </div>

      <div className="mb-4">
        <strong>Surname:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="surname"
            value={editedUser.surname}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        ) : (
          user.surname
        )}
      </div>

      <div className="mb-4">
        <strong>Email:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        ) : (
          user.email
        )}
      </div>

      <div className="flex">
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}

        {isEditing && (
          <div className="flex">
            <button
              onClick={handleSaveChanges}
              className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
