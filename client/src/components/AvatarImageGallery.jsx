import avatars from "../assets/avatars/avatars.js";
import { useRegister } from "../context/RegisterProvider";
import { useEffect, useState } from "react";

const AvatarImageGallery = () => {
  const { updateUserToBeRegistered } = useRegister();
  const [selectedAvatar, setSelectedAvatar] = useState("animal5.png");
  useEffect(() => {
    updateUserToBeRegistered({ avatar: "animal5.png" });
  }, []);

  const handleAvatarClick = (event) => {
    console.log(event.target.alt);
    if (event.target.alt !== undefined) {
      setSelectedAvatar(event.target.alt);
      updateUserToBeRegistered({ avatar: event.target.alt });
    }
  };

  return (
    <div className="container mx-auto mt-2  bg-gray-100  flex justify-center items-center flex-col ">
      <h2 className="text-2xl font-bold mb-5">Select Your Avatar </h2>
      <div className="w-4/5">
        <div className="grid grid-cols-8 gap-1">
          {avatars.map((image) => (
            <div
              key={image.id}
              onClick={handleAvatarClick}
              className={`flex flex-col items-center avatar ${
                image.alt === selectedAvatar ? "selected-avatar" : ""
              } rounded-full h-20 w-20 object-cover  m-3 `}
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
