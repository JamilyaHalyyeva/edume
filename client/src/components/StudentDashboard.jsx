import StudentNavbar from "./StudentNavbar";
import Lessons from "./Lessons";
import FINISHLESSON from "../assets/exer.png";
import ONLINELESSON from "../assets/online.png";
import TEST from "../assets/test.png";
import StudentNavbarSlider from "./StudentNavbarSlider";
import { useStudentDashboardContext } from "../context/StudentDashboardProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { checkIfStudentRegisteredAllTeachers } = useStudentDashboardContext();
  const myItems = [
    <StudentNavbar
      key="finishLesson"
      img={FINISHLESSON}
      description={"Exercises section"}
      color={"bg-blue-300"}
    />,
    <StudentNavbar
      key="onlineLesson"
      img={ONLINELESSON}
      description={"Group lessons"}
      color={"bg-green-300"}
    />,
    <StudentNavbar
      key="test"
      img={TEST}
      description={"Test section"}
      color={"bg-purple-300"}
    />,
  ];

  useEffect(() => {
    checkIfStudentRegisteredAllTeachers().then((response) => {
      if (response === false) {
        navigate("/dashboard/teacher-selection");
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full md:w-full lg:w-full xl:w-full 2xl:w-full mt-20 ">
      <div className="headerDescription justify-center  items-start font-serif flex bg-orange-400  h-[8rem] w-full flex-col  gap-6">
        <div className=" ml-[3rem] lg:ml-[13rem] xl:ml-[13rem] 2xl:ml-[13rem]  md:ml-[3rem]justify-center  items-center  ">
          <h1 className="lg:text-3xl  md:text-xl mb-4">Welcome John Doe!! </h1>
          <h3 className="  text-xl">What do you want to learn today? </h3>
        </div>
      </div>

      {/* Swiper for small screens */}
      <StudentNavbarSlider items={myItems}></StudentNavbarSlider>

      <div className="Section lg:flex flex-row justify-center items-center gap-10 hidden">
        <StudentNavbar
          img={FINISHLESSON}
          description={"Exercises section"}
          color={"bg-blue-300"}
        />
        <StudentNavbar
          img={ONLINELESSON}
          description={"Group lessons"}
          color={"bg-green-300"}
        />
        <StudentNavbar
          img={TEST}
          description={"Test section"}
          color={"bg-purple-300"}
        />
      </div>

      <Lessons></Lessons>
    </div>
  );
};

export default StudentDashboard;
