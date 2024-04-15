export const Qualification = () => {
  return (
    <>
      <section className="mt-10">
        <div className="text-orange-500 text-center">
          <h1 className="text-4xl font-light mb-4">Qualifications</h1>
          <h1 className="text-3xl text-gray-800 font-extralight">
            Created by Experts and based on the Federal State Curricula
          </h1>
        </div>

        <div className="flex justify-center mt-20 px-4 pt-10 gap-8 max-w-screen-lg  flex-col md:flex-row  mx-auto">
          <div className="img">
            <img
              src="https://assets.production.cdn.sofatutor.net/assets/application/characters/teacher_in_class-3ff1702a837e7b053a73fef020507b08013e93f85131a5d72f534d95c0f3234d.svg"
              alt=""
              className="w-full object-contain"
            />
          </div>

          <div className="items mt-10 mb-10  ">
            <ul className="bg-white  py-2 px-2 rounded-md transition duration-500 sm:mt-5 md:mt-10 lg:mt-15">
              {[
                {
                  text: "Introduction of new topics in class",
                  icon: "fas fa-chalkboard-teacher",
                  iconColor: "text-green-500",
                },
                {
                  text: "For students to practice or prepare before and after lessons",
                  icon: "fas fa-graduation-cap",
                  iconColor: "text-purple-500",
                },
                {
                  text: "For your own lesson preparation",
                  icon: "fas fa-laptop",
                  iconColor: "text-blue-500",
                },
                {
                  text: "For preparing for exams",
                  icon: "fas fa-file-alt",
                  iconColor: "text-pink-500",
                },
                {
                  text: "As homework - quickly & easily checkable!",
                  icon: "fas fa-check-double",
                  iconColor: "text-lime-500",
                },
                {
                  text: "For substitute lessons",
                  icon: "fas fa-user-friends",
                  iconColor: "text-red-500",
                },
                {
                  text: "For internal differentiation",
                  icon: "fas fa-layer-group",
                  iconColor: "text-yellow-500",
                },
                {
                  text: "For the teaching method Flipped Classroom",
                  icon: "fas fa-exchange-alt",
                  iconColor: "text-purple-500",
                },
                {
                  text: "... and much more",
                  icon: "fas fa-ellipsis-h",
                  iconColor: "text-orange-500",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 flex items-center mt-2 gap-2"
                >
                  <i
                    className={`${item.icon} ${item.iconColor} text-3xl  mr-2`}
                  ></i>{" "}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
