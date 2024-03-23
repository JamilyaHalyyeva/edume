import StudentNavbar from "./StudentNavbar";
import Lessons from "./Lessons";
import FINISHLESSON from "../assets/exer.png";
import ONLINELESSON from "../assets/online.png";
import TEST from "../assets/test.png";

const StudentDashboard = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <div className="headerDescription justify-center  items-start font-serif flex bg-orange-400 w-full h-[8rem] flex-col  gap-6">
        <div className="ml-[15rem] justify-center items-center  ">
          <h1 className="text-3xl mb-4">Welcome John Doe!! </h1>
          <h3 className="  text-xl">What do you want to learn today? </h3>
        </div>
      </div>
      <div className="Section">
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

        <Lessons></Lessons>
      </div>
    </div>
  );
};

export default StudentDashboard;
