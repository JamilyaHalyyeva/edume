import avatars from "../../assets/avatars/avatars";
import classTypeImageObjects from "../../assets/classTypes/classTypeImageObjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useTeacherSelection } from "../../context/TeacherSelectionProvider";
const TeacherCard = (props) => {
  // Destructure the teacher object for easier access to properties
  const { selectTeacher, isTheTeacherSelectedForTheClassType } =
    useTeacherSelection();
  const handleOnClick = () => {
    selectTeacher({
      teacher: props,
      classType: props.classType,
    });
  };

  return (
    <div
      onClick={handleOnClick}
      className={`${
        isTheTeacherSelectedForTheClassType(props._id, props.classType._id)
          ? "bg-green-300 shadow-green-500 border-green-500"
          : "bg-gray-50"
      }
       max-w-md mx-auto  p-6 flex flex-col justify-center items-center rounded-2xl shadow-2xl hover:bg-orange-300`}
    >
      <div className="flex justify-end  flex-row items-end w-full">
        <span>4.5</span>
        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mb-1" />
      </div>
      <div className=" flex justify-center items-center w-[8rem] h-[6rem]">
        <img
          className="w-20 h-20 -mt-8 rounded-full"
          src={avatars.find((avatar) => avatar.alt === props.avatar).src}
          alt="User"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">
        {props.username} {props.surname}
      </h2>
      <p className="mb-2">{props.email}</p>

      {props.teacherClassTypeGrades &&
        props.teacherClassTypeGrades.length > 0 && (
          <div>
            <ul className="list-disc list-inside">
              {props.teacherClassTypeGrades
                .map((item) => item.classType.name)
                .reduce(
                  (unique, item) =>
                    unique.includes(item) ? unique : [...unique, item],
                  []
                )
                .map((classtype, index) => {
                  const classTypeImageObject = classTypeImageObjects.find(
                    (obj) => obj.name === classtype
                  );

                  return (
                    <div
                      key={index}
                      className="  inline-flex justify-center items-center  w-[3rem] h-[3rem] m-2 bg-gray-100 rounded-md"
                    >
                      <div className="flex justify-center items-center flex-col ">
                        <img
                          className={`${classTypeImageObject.bgColor} "  w-[1rem] sm:w-[1rem ] md:w-[1rem] lg:w-[1.5rem]  rounded-md "`}
                          src={classTypeImageObject.imageSrc}
                        />
                        <div className="  text-xs">{classtype}</div>
                      </div>
                    </div>
                  );
                })}
            </ul>
            <div className=" flex justify-center  mt-3">
              <button className="rounded-3xl bg-orange-400 w-[6rem] h-[2rem] shadow-2xl hover:shadow-orange-600">
                Info
              </button>
            </div>
          </div>
        )}
      {/* Additional teacher details here */}
    </div>
  );
};

export default TeacherCard;
