


export const OurTutors = () => {
    const homeAbout = [
        {
          id: 1,
          cover: "https://static.vecteezy.com/system/resources/previews/028/241/879/original/old-man-teacher-face-3d-profession-avatars-free-png.png",
          title: "Tony Biggs",
          description: "Mathematics Teacher ",
        },
        {
          id: 2,
          cover: "https://static.vecteezy.com/system/resources/previews/028/213/034/non_2x/female-accountant-face-3d-profession-avatars-free-png.png",
          title: "jessica hills",
          description: "English Teacher.",
        },
        {
          id: 3,
          cover: "https://static.vecteezy.com/system/resources/previews/028/244/464/non_2x/female-accountant-face-3d-profession-avatars-free-png.png",
          title: "Linda Mayer",
          description: "German Teacher.",
        },
        {
            id: 4,
            cover: "https://static.vecteezy.com/system/resources/previews/028/238/588/original/old-man-teacher-face-3d-profession-avatars-free-png.png",
            title: "Steven Harris",
            description: "Biology Teacher.",
        },
        {
            id: 5,
            cover: "https://cdn3d.iconscout.com/3d/premium/thumb/teacher-avatar-5966945-4936175.png",
            title: "Taylor Biggens",
            description: "French  Teacher ",
        },
        {
            id: 6,
            cover: "https://cdn3d.iconscout.com/3d/premium/thumb/teacher-4722982-3930448.png",
            title: "jessica hills",
            description: "Physics Teacher.",
        }
      ];
  return (
    <>
    <section className="pt-10 pb-10 bg-green-200" id="tutors">
    <div className="text-orange-500 text-center"  >
   <h1 className="text-5xl font-light mb-4">Our Tutors</h1>
   <h1 className="text-3xl text-gray-800 font-extralight mb-6">Meet Our Qualified Tutors</h1>
   

    </div>
        <div className="flex justify-around w-70 max-w-screen-md mx-auto ">
        <div className="w-full ml-10 px-2 py-4 items-center md:w-full"> {/* Adjusted width of the grid container */}
            <div className="justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mr-6 space-x-3 ">
                {homeAbout.map((item, index) => (
                    <div key={index} className="shadow rounded-md bg-white ">
                        <div className="flex flex-col items-center w-70 ">
                            <img src={item.cover} alt="" className="w-full object-contain h-40 mb-2 md:w-full" />
                            <h2 className="font-semibold text-lg text-gray-700">{item.title}</h2>
                            <h3 className="text-sm hidden font-light text-gray-600 md:block">{item.description}</h3>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    <div className="text-orange-500 text-center mt-12"  >
   <h1 className="text-xl text-gray-800 font-light mb-4 p-1">Are you interested in working on an innovative e-learning product and shaping the future of digital learning and teaching together with us?</h1>
   <h1 className="text-2xl text-gray-800 font-bold mb-6">Then apply now!</h1>

    </div>
    </section>

    </>
  )
}
