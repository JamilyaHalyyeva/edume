import { useTeacherSelection } from "../../context/TeacherSelectionProvider";
import SelectTeacherLesson from "./SelectTeacherLesson";

import TeacherCardList from "./TeacherCardList";

const SelectTeacherLayout = () => {
  const { selectedClassType } = useTeacherSelection();

  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full md:w-full lg:w-full xl:w-full 2xl:w-full mt-20 ">
      <div className="headerDescription justify-center  items-start font-serif flex bg-orange-400  h-[8rem] w-full flex-col  gap-6">
        <div className=" ml-[3rem] lg:ml-[13rem] xl:ml-[13rem] 2xl:ml-[13rem]  md:ml-[3rem]justify-center  items-center  ">
          <h1 className="lg:text-3xl  md:text-xl mb-4">Welcome John Doe!! </h1>
          <h3 className="  text-xl">What do you want to learn today? </h3>
        </div>
      </div>
      <SelectTeacherLesson></SelectTeacherLesson>
      <div
        className={`w-11/12  shadow-2xl rounded-2xl ${
          selectedClassType ? selectedClassType.bgColor : "bg-gray-100"
        } `}
      >
        <TeacherCardList></TeacherCardList>
      </div>
    </div>
  );
};

export default SelectTeacherLayout;
