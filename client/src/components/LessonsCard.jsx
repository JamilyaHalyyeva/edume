import React from "react";

const LessonCard = (param) => {
  return (
    <div className="h-[13rem] w-[15rem]  overflow-hidden justify-center items-center  shadow-xl hover:shadow-orange-500 hover:bg-orange-300  bg-gray-50  flex flex-col  rounded-2xl  ">
      <img
        className={`${param.bgColor} " w-[4rem]  rounded-md "`}
        src={param.imageSrc}
      />
      <div className="px-6 py-4 flex-row flex ">
        <p className="text-gray-800  font-serif text-xl ">
          {param.description}
        </p>
      </div>
    </div>
  );
};

export default LessonCard;
