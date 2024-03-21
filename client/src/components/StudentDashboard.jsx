import Navbar from "./Navbar";
import StudentNavbar from "./StudentNavbar";
import Lessons from "./Lessons";
import FINISHLESSON from "../assets/exer.png";
import ONLINELESSON from "../assets/online.png";
import TEST from "../assets/test.png";
import BGIMAGE from "../assets/bgimage.png";
import StudentPageFooter from "./StudentPageFooter";

const StudentDashboard = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <div className="headerDescription justify-center  items-start font-serif flex bg-orange-400 w-full h-[8rem] flex-col  gap-6">
        <div className="ml-[15rem] justify-center items-center  ">
          <h1 className="text-3xl mb-4">Welcome John Doe!! </h1>
          <h3 className="  text-xl">What do you want to learn today? </h3>
        </div>
      </div>
      <div className=" flex justify-center items-center flex-row gap-10 ">
        <StudentNavbar
          img={FINISHLESSON}
          description={"Exercises  section "}
          color={"bg-blue-300"}
        />
        <StudentNavbar
          img={ONLINELESSON}
          description={"Group lessons "}
          color={"bg-green-300"}
        />
        <StudentNavbar
          img={TEST}
          description={"Test section "}
          color={"bg-purple-300"}
        />
      </div>
      <div className="justify-start  items-start  font-serif flex w-full ">
        <div className="ml-[15rem] justify-start items-center  ">
          <h1 className="text-2xl mt-4">All Lessons in EduMe!! </h1>
        </div>
      </div>

      <Lessons></Lessons>

      <div
        className=" bg-cover  -m-8  w-10/12 h-[12rem] "
        style={{ backgroundImage: `url(${BGIMAGE})` }}
      >
        {/* Content of your footer */}
      </div>
      <StudentPageFooter></StudentPageFooter>
    </div>
  );
};

export default StudentDashboard;
