import EXAMPLE from "../assets/example.jpg";

const LessonOverviewCard = () => {
  return (
    <div>
      <div className=" w-[25rem] h-[20rem] bg-slate-200 flex-col justify-center items-center p-5 shadow-xl rounded-2xl ">
        <div className=" w-ful h-[15rem] rounded-2xl overflow-hidden">
          <img src={EXAMPLE} className="w-full h-full object-cover" />
        </div>
        <div className="mt-3"> Lesson Section Content </div>
      </div>
    </div>
  );
};

export default LessonOverviewCard;
