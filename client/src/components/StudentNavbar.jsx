import React from "react";

import { Link } from "react-router-dom";

const StudentNavbar = (param) => {
  return (
    <div
      className={`${param.color} bg-opacity-50 justify-center items-center grid  w-[22rem] h-[14rem] lg:w-[18rem] xl:w-[18rem] 2xl:w-[22rem] md:w-[30rem] rounded-2xl shadow-xl`}
    >
      <Link to="/lessons">
        <div className="flex justify-center items-center">
          <img
            className=" rounded-full w-[10rem] h-[10rem] bg-slate-100/50"
            src={param.img}
            alt="Sunset in the mountains"
          />
        </div>
      </Link>

      <div className="px-6 py-4">
        <div className=" font-serif text-xl mb-2">{param.description}</div>
      </div>
    </div>
  );
};

export default StudentNavbar;
