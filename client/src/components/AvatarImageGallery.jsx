import animal1 from "../assets/images/animal1.png";
import animal2 from "../assets/images/animal2.png";
import animal3 from "../assets/images/animal3.png";
import animal4 from "../assets/images/animal4.png";
import animal5 from "../assets/images/animal5.png";
import animal6 from "../assets/images/animal6.png";
import animal7 from "../assets/images/animal7.png";
import animal8 from "../assets/images/animal8.png";
import animal9 from "../assets/images/animal9.png";
import animal10 from "../assets/images/animal10.png";
import animal11 from "../assets/images/animal11.png";
import animal12 from "../assets/images/animal12.png";
import animal13 from "../assets/images/animal13.png";

import animal15 from "../assets/images/animal15.png";
import animal16 from "../assets/images/animal16.png";
import animal17 from "../assets/images/animal17.png";
import animal18 from "../assets/images/animal18.png";
import animal19 from "../assets/images/animal19.png";
import children1 from "../assets/images/children1.png";
import children2 from "../assets/images/children2.png";

import children4 from "../assets/images/children4.png";
import children5 from "../assets/images/children5.png";

import children7 from "../assets/images/children7.png";
import children8 from "../assets/images/children8.png";
import children9 from "../assets/images/children9.png";
import children10 from "../assets/images/children10.png";
import teacher1 from "../assets/images/teacher1.png";
import teacher2 from "../assets/images/teacher2.png";
import teacher3 from "../assets/images/teacher3.png";
import teacher4 from "../assets/images/teacher4.png";
import teacher5 from "../assets/images/teacher5.png";
import teacher6 from "../assets/images/teacher6.png";
import teacher7 from "../assets/images/teacher7.png";
import teacher8 from "../assets/images/teacher8.png";
import teacher9 from "../assets/images/teacher9.png";
import teacher10 from "../assets/images/teacher10.png";
import { useRegister } from "../context/RegisterProvider";
import { useEffect, useState } from "react";

const pngFileNames = [
  {
    id: 1,
    src: animal1,
    alt: "animal1.png",
  },
  {
    id: 2,
    src: animal2,
    alt: "animal2.png",
  },
  {
    id: 3,
    src: animal3,
    alt: "animal3.png",
  },
  {
    id: 4,
    src: animal4,
    alt: "animal4.png",
  },
  {
    id: 5,
    src: animal5,
    alt: "animal5.png",
  },
  {
    id: 6,
    src: animal6,
    alt: "animal6.png",
  },
  {
    id: 7,
    src: animal7,
    alt: "animal7.png",
  },
  {
    id: 8,
    src: animal8,
    alt: "animal8.png",
  },
  {
    id: 9,
    src: animal9,
    alt: "animal9.png",
  },
  {
    id: 10,
    src: animal10,
    alt: "animal10.png",
  },
  {
    id: 11,
    src: animal11,
    alt: "animal11.png",
  },
  {
    id: 12,
    src: animal12,
    alt: "animal12.png",
  },
  {
    id: 13,
    src: animal13,
    alt: "animal13.png",
  },

  {
    id: 15,
    src: animal15,
    alt: "animal15.png",
  },
  {
    id: 16,
    src: animal16,
    alt: "animal16.png",
  },
  {
    id: 17,
    src: animal17,
    alt: "animal17.png",
  },
  {
    id: 18,
    src: animal18,
    alt: "animal18.png",
  },
  { id: 19, src: animal19, alt: "animal19.png" },
  { id: 20, src: children1, alt: "children1.png" },
  { id: 21, src: children2, alt: "children2.png" },
  { id: 23, src: children4, alt: "children4.png" },
  { id: 24, src: children5, alt: "children5.png" },
  { id: 26, src: children7, alt: "children7.png" },
  { id: 27, src: children8, alt: "children8.png" },
  { id: 28, src: children9, alt: "children9.png" },
  { id: 29, src: children10, alt: "children10.png" },
  { id: 30, src: teacher1, alt: "teacher1.png" },

  { id: 32, src: teacher3, alt: "teacher3.png" },
  { id: 33, src: teacher4, alt: "teacher4.png" },
  { id: 39, src: teacher10, alt: "teacher10.png" },

  { id: 35, src: teacher6, alt: "teacher6.png" },
  { id: 36, src: teacher7, alt: "teacher7.png" },
  { id: 37, src: teacher8, alt: "teacher8.png" },
  { id: 31, src: teacher2, alt: "teacher2.png" },
  { id: 38, src: teacher9, alt: "teacher9.png" },
  { id: 34, src: teacher5, alt: "teacher5.png" },
];

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
          {pngFileNames.map((image) => (
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
