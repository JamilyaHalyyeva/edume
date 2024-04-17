
import heroImage from "../../../public/main2.svg"; // Import the image

const Hero = () => {
  return (
    <>
      <section
        className="hero bg-contain bg-no-repeat bg-fixed bg-center bg-slate-100 h-screen w-full pt-20 "
        style={{
          backgroundImage: `url(${heroImage}) `,
          backgroundSize: "80%",
          color: "#fff",
        }}
      >
        <div className="container pt-10">
          <div className="  flex justify-center  mt-8 ml-10">
            <div className="text-orange-500 text-center ">
            {" "}
              <h1 className="text-lg ml-14 font-extrabold mb-4 md:text-2xl mr-10">
                Smile while learning <br /> Enjoy practicing, success in exams.
              </h1>
              <h3 className="text-xl text-gray-800 font-extralight mb-10 md:text-2xl">
                Joy in learning for all grades.
              </h3>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Hero;
