import { Title } from "../Title";
import heroImage from "../../../public/pensive-brunette-woman-shirt-sitting-floor-with-laptop-computer-looking-up-gray.jpg"; // Import the image

const Hero = () => {
  return (
    <>
      <section
        className="hero bg-cover bg-fixed bg-center h-screen w-full pt-20"
        style={{ backgroundImage: `url(${heroImage})`, color: "#fff" }}
      >
        <div className="container pt-10">
          <div className=" w-7/12 mt-8">
            <Title subtitle="WELCOME TO EDUME" title="Best Online Education" />
          </div>
        </div>
      </section>
      <div className="mt-64"></div>
    </>
  );
};

export default Hero;
