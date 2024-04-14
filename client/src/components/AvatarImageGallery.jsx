import avatars from "../assets/avatars/avatars.js";
import { useRegister } from "../context/RegisterProvider";
import { useEffect, useState } from "react";

const AvatarImageGallery = () => {
  const { updateUserToBeRegistered, userToBeRegistered } = useRegister();
  const [selectedAvatar, setSelectedAvatar] = useState(
    userToBeRegistered.role === "teacher" ? "teacher4.png" : "panda.png"
  );
  const [avatarList, setAvatarList] = useState([]);
  useEffect(() => {
    if (userToBeRegistered.role === "teacher") {
      const teacherAvatars = avatars.filter(
        (avatar) => avatar.type === "teacher"
      );
      setAvatarList(teacherAvatars);
    } else {
      const studentAvatars = avatars.filter(
        (avatar) => avatar.type === "student"
      );
      setAvatarList(studentAvatars);
    }
  }, []);

  const handleAvatarClick = (event) => {

    if (event.target.alt !== undefined) {
      setSelectedAvatar(event.target.alt);
      updateUserToBeRegistered({ avatar: event.target.alt });
    }
  };

  return (
    <div className=" mx-auto mt-2  bg-gray-100  flex justify-center items-center flex-col ">
      <h2 className="text-2xl font-bold mb-5">Select Your Avatar </h2>
      <div className="w-full sm:w-4/5 lg:w-3/4 xl:w-2/3">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 lg:gap-5 lg:p-4  2xl:grid-cols-10 2xl:gap-5 2xl:p-4 gap-2 p-4">
          {avatarList.map((image) => (
            <div
              key={image.id}
              onClick={handleAvatarClick}
              className={`flex flex-col items-center avatar ${
                image.alt === selectedAvatar ? "selected-avatar" : ""
              } rounded-full h-[5rem] w-[5rem] lg:w-20 lg:h-20 object-cover lg:m-3  m-3 `}
            >
              <img
                src={image.src} // Adjust the path accordingly
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarImageGallery;
