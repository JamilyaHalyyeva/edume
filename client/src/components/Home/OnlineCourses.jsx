import onlineLessons from "../../json/online";
import { Title } from "../Title";

export const OnlineCourses = () => {
  return (
    <>
      <section className="online bg-green-200 pb-10 py-10" id="lessons">
        <div className=" max-w-screen-lg mx-auto">
          <Title subtitle="CLASSES" title="Browse Our Online classes" />
          <div className="grid grid-cols-3 px-2 gap-6 md:grid-cols-4 sm:grid-cols-2">
            {onlineLessons.map((item) => (
              <div
                key={item.id}
                className="p-8 w-70 rounded-2xl  shadow-lg bg-white transition duration-500 flex flex-col items-center justify-center cursor-pointer"
              >
                {" "}
                {/* Added flex classes to center the content */}
                <div className=" w-20 h-20 flex items-center justify-center">
                  {" "}
                  {/* Added flex classes to center the image */}
                  <img
                    src={item.cover}
                    alt=""
                    className="w-full h-full object-cover md:block "
                  />
                </div>
                <h1 className="text-lg font-medium text-gray-900 mt-4  md:block">
                  {item.courseName}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
